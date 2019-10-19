/**
 * @name Pool
 *
 * @desc Puppeteer pool
 */

const genericPool = require('generic-pool')
const puppeteer = require('puppeteer')
const conf = require('./conf.js')

const { browser, bot, data }= conf.config

const args = [
  `--lang=${browser.lang}`,
  `--disable-dev-shm-usage`,
  `--use-fake-ui-for-media-stream`,
  `--use-fake-device-for-media-stream`,
  `--disable-gesture-requirement-for-media-playback`
]

const factory = {
  create: async () => {
    const { headless, executablePath, browserWSEndpoint } = browser
    if (browserWSEndpoint) {
      return await puppeteer.connect({
        browserWSEndpoint: `${browserWSEndpoint}?${args.join('&')}`
      });
    } else {
      return await puppeteer.launch({
        headless: headless,
        executablePath: executablePath ? executablePath : undefined,
        args: args
      })
    }
  },
  destroy: function(puppeteer) {
    puppeteer.close()
  }
}

const size = { max: browser.pool.size.max, min: browser.pool.size.min }
const browsers = genericPool.createPool(factory, size)

module.exports = {
  browsers: browsers,
  population: browser.pool.population,
  size: Math.ceil(bot.population / browser.pool.population)
}
