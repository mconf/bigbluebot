/**
 * @name Pool
 *
 * @desc Puppeteer pool
 */

const genericPool = require('generic-pool')
const puppeteer = require('puppeteer')
const conf = require('./conf.js')

const config = conf.config
const browser = config.browser
const bot = config.bot

const factory = {
  create: async () => {
    return await puppeteer.launch({
      headless: browser.headless,
      executablePath: browser.executablePath ? browser.executablePath : undefined,
      args: [
        '--disable-dev-shm-usage',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--use-file-for-fake-audio-capture=' + __dirname + config.data.audio,
        '--use-file-for-fake-video-capture=' + __dirname + config.data.video
      ]
    })
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
  size: Math.ceil(config.bot.population / browser.pool.population)
}
