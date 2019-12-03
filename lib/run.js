/**
 * @name Run
 * @param actions function
 * @desc Dispatch puppeteer and runs the actions function
 */

const util = require('./util.js')
const pool = require('./pool.js')
const conf = require('./conf.js')
const logger = require('./logger.js')

const { bot } = conf.config

const run = async actions => {
  logger.info(`Bots: ${pool.size * pool.population}`)
  logger.info(`Life: ${bot.life / 1000} seconds`)
  const locale = await util.locale()
  for (let i = 0; i < pool.size; i++) {
    pool.browsers.acquire().then(async browser => {
      let promises = []
      for (let j = 0; j < pool.population; j++) {
        let username
        await util.delay(bot.wait)
        promises.push(browser.newPage().then(async page => {
          username = await util.join(page, locale)
          page.bigbluebot = { username, locale }
          await actions(page)
          await page.waitFor(bot.life)
          await util.screenshot(page)
          logger.info(`${username}: leaving`)
        }).catch(error => {
          logger.error(error)
          return error
        }))
      }
      await Promise.all(promises).then(async () => {
        await browser.close()
      }).catch(error => {
        logger.error(error)
        return error
      })
    }).catch(error => {
      logger.error(error)
      return error
    })
    await util.delay(bot.wait * pool.population)
  }
}

module.exports = run
