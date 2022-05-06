const { faker } = require('@faker-js/faker');
const conf = require('./conf');
const logger = require('./logger');
const api = require('./api');
const selector = require('./selector');

const { config } = conf;
const { timeout } = config;

const delay = async time => new Promise(resolve => setTimeout(resolve, time));
const timestamp = () => Math.floor(new Date() / 1000);
const random = collection => collection[Math.floor(Math.random() * collection.length)];

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

module.exports = {
  delay,
  random,
  generateText,
  join: async (page, locale, options) => {
    const username = generateUsername();
    logger.info(`${username}: join ${api.getHost(options)} at ${api.getMeetingID(options)}`);
    const { width, height } = config.browser.window;
    await page.setViewport({ width, height });
    const url = api.getJoinURL(username, options);
    await page.goto(url);
    const slctr = selector.get(locale, conf.label.main.options.button);
    logger.debug(`${username}: notice ${slctr}`);
    await page.waitForSelector(slctr, { timeout: timeout.selector });
    await delay(config.delay.animation);

    return username;
  },
  create: async (options) => {
    logger.info('Creating meeting');
    const data = await api.create(options);

    return data !== null;
  },
  end: async (options) => {
    logger.info('Ending meeting');
    const data = await api.end(options);

    return data !== null;
  },
  click: async (page, element, animation = false) => {
    const { username, locale } = page.bigbluebot;
    const slctr = selector.get(locale, element);
    logger.debug(`${username}: click ${slctr}`);
    await page.waitForSelector(slctr, { timeout: timeout.selector });
    await page.click(slctr);
    if (animation) await delay(config.delay.animation);
  },
  type: async (page, element, text, animation = false) => {
    const { username, locale } = page.bigbluebot;
    const slctr = selector.get(locale, element);
    logger.debug(`${username}: type ${text} in ${slctr}`);
    await page.waitForSelector(slctr, { timeout: timeout.selector });
    await page.type(slctr, text);
    if (animation) await delay(config.delay.animation);
  },
  write: async (page, element, text) => {
    const { username, locale } = page.bigbluebot;
    const slctr = selector.get(locale, element);
    logger.debug(`${username}: write ${text} in ${slctr}`);
    await page.waitForSelector(slctr, { timeout: timeout.selector });
    await page.type(slctr, text, { delay: config.delay.type });
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
    const slctr = selector.get(locale, element);
    const { connection, relief } = config.delay;
    const timeout = media ? connection : relief;
    let visible;
    await page.waitForSelector(slctr, { timeout }).then(() => {
      logger.debug(`${username}: ${slctr} is visible`);
      visible = true;
    }).catch(() => {
      logger.warn(`${username}: ${slctr} is not visible`);
      visible = false;
    });

    return visible;
  },
  hidden: async (page, element) => {
    const { username, locale } = page.bigbluebot;
    const slctr = selector.get(locale, element);
    const { relief } = config.delay;
    let hidden;
    await page.waitForSelector(slctr, { timeout: relief }).then(() => {
      logger.warn(`${username}: ${slctr} is not hidden`);
      hidden = false;
    }).catch(() => {
      logger.debug(`${username}: ${slctr} is hidden`);
      hidden = true;
    });

    return hidden;
  },
};
