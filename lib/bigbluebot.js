/**
 * @name Run
 * @param actions function
 * @desc Dispatch puppeteer and runs the actions function
 */

const util = require('./util.js')
const pool = require('./pool.js')
const conf = require('./conf.js')

const bot = conf.config.bot

const run = async actions => {
  for (let i = 0; i < pool.size; i++) {
    pool.browsers.acquire().then(async browser => {
      console.log('Spawning browser', i)
      let promises = []
      for (let j = 0; j < pool.population; j++) {
        let id = (i * pool.population) + j
        await util.delay(bot.wait)
        promises.push(browser.newPage().then(async page => {
          console.log('Spawning bot', id)
          await util.join(page, id)
          await actions(page, id)
          await page.waitFor(bot.lifespan)
          await util.screenshot(page)
        }).catch(error => {
          console.error('Execution error caught with bot', id, error)
          return error
        }))
      }
      await Promise.all(promises).then(async () => {
        await browser.close()
      })
    })
    await util.delay(bot.wait * pool.population)
  }
}

module.exports = run
