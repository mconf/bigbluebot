const genericPool = require('generic-pool');
const puppeteer = require('puppeteer');
const conf = require('./conf');

const { browser, bot, data } = conf.config;

require('events').EventEmitter.defaultMaxListeners = 0

const args = [
  `--lang=${browser.lang}`,
  `--disable-dev-shm-usage`,
  `--no-user-gesture-required`,
  `--use-fake-ui-for-media-stream`,
  `--use-fake-device-for-media-stream`,
];

const factory = {
  create: async () => {
    const { headless, path, endpoint, token } = browser;
    if (endpoint) {
      if (token) args.push(`token=${token}`);
      return await puppeteer.connect({
        browserWSEndpoint: `${endpoint}?${args.join('&')}`
      });
    } else {
      return await puppeteer.launch({
        headless,
        ignoreHTTPSErrors: true,
        executablePath: path,
        args,
      });
    }
  },
  destroy: function(puppeteer) {
    puppeteer.close();
  }
}

const size = { max: browser.pool.size.max, min: browser.pool.size.min };
const browsers = genericPool.createPool(factory, size);

module.exports = {
  browsers: browsers,
  population: browser.pool.population,
  size: Math.ceil(bot.population / browser.pool.population),
};
