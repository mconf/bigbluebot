const axios = require('axios');
const faker = require('faker');
const conf = require('./conf');
const logger = require('./logger');
const api = require('./api');
const convert = require('xml-js');

const { config } = conf;
const { timeout } = config;

const delay = async time => new Promise(resolve => setTimeout(resolve, time));
const timestamp = () => Math.floor(new Date() / 1000);
const random = collection => collection[Math.floor(Math.random() * collection.length)];

const getDemoJoinURL = (username, options) => {
  const user = `${config.url.user.param}=${encodeURI(username)}`;
  const moderator = `${config.url.moderator.param}=${options.moderator !== undefined ? options.moderator : config.url.moderator.value}`;
  const meeting = `${config.url.meeting.param}=${encodeURI(options.room || config.url.meeting.room)}`;

  return `${options.host || config.url.host}/${config.url.demo}&${user}&${moderator}&${meeting}`;
};

const getAPIJoinURL = (username, options) => {
  return api.getJoinURL(username, options);
};

const url = (username, options) => {
  if (config.api.secret || options.secret) return getAPIJoinURL(username, options);

  return getDemoJoinURL(username, options);
};

// https://github.com/nashwaan/xml-js/issues/53
function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) {
      return nValue;
    }
    var bValue = value.toLowerCase();
    if (bValue === 'true') {
      return true;
    } else if (bValue === 'false') {
      return false;
    }
    return value;
}

const removeJsonTextAttribute = function(value, parentElement) {
  try {
    const parentOfParent = parentElement._parent;
    const pOpKeys = Object.keys(parentElement._parent);
    const keyNo = pOpKeys.length;
    const keyName = pOpKeys[keyNo - 1];
    const arrOfKey = parentElement._parent[keyName];
    const arrOfKeyLen = arrOfKey.length;
    if (arrOfKeyLen > 0) {
      const arr = arrOfKey;
      const arrIndex = arrOfKey.length - 1;
      arr[arrIndex] = nativeType(value);
    } else {
      parentElement._parent[keyName] = nativeType(value);
    }
  } catch (e) {}
};

const meetings = async (options) => {
  if (options.secret || config.api.secret) {
    const url = api.getMeetingsURL(options);

    let meets;
    await axios.get(url).then(response => {
      meets = convert.xml2js(response.data, { compact: true, nativeType: false, textFn: removeJsonTextAttribute });
    }).catch(error => {
      logger.error(error);
    });
    logger.debug(meets.response.meetings.meeting);
    return [].concat(meets.response.meetings.meeting);
  } else {
    logger.info('Set BBB-secret to get the meetings')
  }

  return [];
};

const findMeetingByName = async (name, options) => {
    let ret;
    let all = await meetings(options);
    all.forEach(function (item) {
      if (item.meetingName && item.meetingName === name) {
        logger.info("Found meeting by name: " + name)
        ret = item;
      }
    });

    return ret;
};

const findMeetingByID = async (id, options) => {
    let ret;
    let all = await meetings(options);
    all.forEach(function (item) {
      if (item.meetingID && item.meetingID === id) {
        logger.info("Found meeting by ID: " + id)
        ret = item;
      }
    });

    return ret;
};

const once = async (page, event, callback) => {
  return new Promise((resolve, reject) => {
    let fired = false;
    setTimeout(() => {
      if (!fired) reject(`Event listener timeout: ${event}`);
    }, timeout.selector);
    const handler = () => {
      fired = true;
      callback();
    };
    page.once(event, handler);
  });
};

const generateUsername = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return `${firstName} ${lastName}`;
};

const generateText = lines => {
  const text = [];
  for (let i = 0; i < lines; i++) {
    text.push(faker.lorem.sentence());
  }

  return text;
};

// TODO: Better handle braces
const aria = label => {
  const opening = label.indexOf('{');
  if (opening === -1) {
    return `[aria-label^="${label}"]`;
  } else {
    if (opening !== 0) {
      return `[aria-label^="${label.slice(0, opening - 1)}"]`;
    }
    const closing = label.indexOf('}');

    return `[aria-label$="${label.slice(closing, label.length)}"]`;
  }
};

const compose = (label, params) => {
  let composition = label;
  params.forEach((param, index) => {
    composition = composition.replace(`{${index}}`, param);
  });

  return composition;
};

const getLabel = (element) => {
  if (element && element.label) return element.label;

  return element;
};

const getParams = (element) => {
  if (element && element.params) return element.params;

  return [];
};

const localize = (locale, element) => {
  const label = getLabel(element);
  const params = getParams(element);

  let localization;
  if (locale && locale[label]) {
    localization = compose(locale[label], params);
  } else {
    logger.error(`Missing label ${locale[label]}`);
  }

  return localization;
};

const translate = (locale, element) => {
  const localization = localize(locale, element);
  const selector = aria(localization);

  return selector;
};

const call = async (url) => {
  let data = null;
  await axios.get(url).then(response => {
    if (response.data.response && response.data.response.returncode === 'FAILED') {
      const { messageKey, message } = response.data.response;
      logger.error(`${messageKey}: ${message}`);
    } else {
      data = response.data;
    }
  }).catch(error => {
    logger.error(error);
  });

  return data;
};

module.exports = {
  delay,
  random,
  generateText,
  localize,
  meetings,
  findMeetingByName,
  findMeetingByID,
  join: async (page, locale, options) => {
    const username = generateUsername();
    logger.info(`${username}: join ${options.host || config.url.host} at ${options.room || config.url.meeting.room}`);
    const { width, height } = config.browser.window;
    await page.setViewport({ width, height });
    await page.goto(url(username, options));
    const selector = translate(locale, conf.label.main.options.button);
    await page.waitForSelector(selector, { timeout: timeout.selector });
    logger.debug(`${username}: notice ${selector}`);
    await delay(config.delay.animation);

    return username;
  },
  create: async (options) => {
    logger.info('Creating meeting');
    const data = await call(api.getCreateURL(options));

    return data !== null;
  },
  end: async (options) => {
    logger.info('Ending meeting');
    const data = await call(api.getEndURL(options));

    return data !== null;
  },
  click: async (page, element, animation = false) => {
    const { username, locale } = page.bigbluebot;
    const selector = translate(locale, element);
    logger.debug(`${username}: click ${selector}`);
    await page.waitForSelector(selector, { timeout: timeout.selector });
    await page.click(selector);
    if (animation) await delay(config.delay.animation);
  },
  type: async (page, element, text, animation = false) => {
    const { username, locale } = page.bigbluebot;
    const selector = translate(locale, element);
    logger.debug(`${username}: type ${text} in ${selector}`);
    await page.waitForSelector(selector, { timeout: timeout.selector });
    await page.type(selector, text);
    if (animation) await delay(config.delay.animation);
  },
  write: async (page, element, text) => {
    const { username, locale } = page.bigbluebot;
    const selector = translate(locale, element);
    logger.debug(`${username}: write ${text} in ${selector}`);
    await page.waitForSelector(selector, { timeout: timeout.selector });
    await page.type(selector, text, { delay: config.delay.type });
  },
  screenshot: async (page, status, description) => {
    if (config.screenshot.enabled) {
      const { path } = config.screenshot;
      const { username } = page.bigbluebot;
      const filename = `[${status}] ${username} - ${description} - ${timestamp()}.png`;
      await page.screenshot({ path: `${path}/${filename}` });
    }
  },
  frame: async (page, name, relief = false) => {
    if (relief) await delay(config.delay.relief);

    return new Promise((resolve, reject) => {
      const check = () => {
        const frame = page.frames().find(f => f.name() === name);
        if (frame) resolve(frame);
        once(page, 'framenavigated', check).catch(error => reject(error));
      };
      check();
    });
  },
  visible: async (page, element, media = false) => {
    const { username, locale } = page.bigbluebot;
    const selector = translate(locale, element);
    const { connection, relief } = config.delay;
    const timeout = media ? connection : relief;
    let visible;
    await page.waitForSelector(selector, { timeout }).then(() => {
      logger.debug(`${username}: ${selector} is visible`);
      visible = true;
    }).catch(() => {
      logger.warn(`${username}: ${selector} is not visible`);
      visible = false;
    });

    return visible;
  },
  hidden: async (page, element) => {
    const { username, locale } = page.bigbluebot;
    const selector = translate(locale, element);
    const { relief } = config.delay;
    let hidden;
    await page.waitForSelector(selector, { timeout: relief }).then(() => {
      logger.warn(`${username}: ${selector} is not hidden`);
      hidden = false;
    }).catch(() => {
      logger.debug(`${username}: ${selector} is hidden`);
      hidden = true;
    });

    return hidden;
  },
  locale: async (options) => {
    const { lang } = config.browser;
    logger.info(`Fetching ${lang} locale`);
    const host = options.host || config.url.host;
    const url = `${host}/${config.url.locale}=${lang}`;
    let locale;
    await axios.get(url).then(response => {
      const { messages } = response.data;
      if (messages) {
        locale = messages;
      } else {
        logger.error(`Missing locale messages`);
      }
    }).catch(error => {
      logger.error(error);
    });

    return locale;
  },
};
