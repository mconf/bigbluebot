const axios = require('axios');
const faker = require('faker');
const conf = require('./conf');
const logger = require('./logger');
const api = require('./api');

const { config } = conf;
const { timeout } = config;

const delay = async time => new Promise(resolve => setTimeout(resolve, time));
const timestamp = () => Math.floor(new Date() / 1000);
const random = collection => collection[Math.floor(Math.random() * collection.length)];

const getDemoJoinURL = username => {
  const user = `${config.url.user.param}=${encodeURI(username)}`;
  const moderator = `${config.url.moderator.param}=${config.url.moderator.value}`;
  const meeting = `${config.url.meeting.param}=${encodeURI(config.url.meeting.name)}`;
  return `${config.url.host}/${config.url.demo}&${user}&${moderator}&${meeting}`;
};

const getAPIJoinURL = username => {
  return api.getJoinURL(username);
};

const url = username => {
  if (config.api.secret) return getAPIJoinURL(username);
  return getDemoJoinURL(username);
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
  })
  return composition;
};

const translate = (locale, element) => {
  const object = typeof element === 'object';
  const label = object ? element.label : element;
  const params = object ? element.params : [];
  let selector;
  if (locale && locale[label]) {
    const composition = compose(locale[label], params);
    selector = aria(composition);
  } else {
    logger.error(`Missing label ${locale[label]}`);
  }
  return selector;
};

module.exports = {
  delay: delay,
  random: random,
  generateText: generateText,
  join: async (page, locale) => {
    const username = generateUsername();
    logger.info(`${username}: join ${config.url.host} at ${config.url.meeting.name}`);
    const { width, height } = config.browser.window;
    await page.setViewport({ width, height });
    await page.goto(url(username));
    const selector = translate(locale, conf.label.main.options.button);
    await page.waitForSelector(selector, { timeout: timeout.selector });
    logger.debug(`${username}: notice ${selector}`);
    await delay(config.delay.animation);
    return username;
  },
  create: async () => {
    logger.info('Creating room');
    const url = api.getCreateURL();
    let success = true;
    await axios.get(url).then(response => {
      const resp = response.data.response;
      if (resp && resp.returncode === 'FAILED') {
        logger.error(`${messageKey}: ${message}`);
        success = false;
      }
    }).catch(error => {
      logger.error(error);
      success = false;
    });
    return success;
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
  screenshot: async page => {
    if (config.screenshot.enabled) {
      const { username } = page.bigbluebot;
      await page.screenshot({ path: `${config.screenshot.path}/${username}-${timestamp()}.png` });
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
    })
    return hidden;
  },
  locale: async () => {
    const { lang } = config.browser;
    logger.info(`Fetching ${lang} locale`);
    const url = `${config.url.host}/${config.url.locale}=${lang}`;
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
