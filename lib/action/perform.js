/**
 * @name Perform
 *
 * @desc Execute a set of bot actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const logger = require('../logger.js')

const config = conf.config

const test = async (page, action) => {
  if (config.test.enabled) {
    await util.delay(config.delay.relief)
    const pass = await action.test(page)
    if (pass) {
      logger.pass(action.description)
    } else {
      logger.fail(action.description)
    }
  }
}

const perform = async (page, action, check = false) => {
  let skip = false
  if (check) skip = await action.test(page)

  if (skip) {
    logger.warn('skipping', action.description)
  } else {
    if (action.before) await action.before(page)
    logger.info(action.description)
    await action.execute(page)
    await test(page, action)
  }
}

module.exports = perform
