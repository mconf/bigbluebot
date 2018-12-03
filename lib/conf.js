/**
 * @name Conf
 *
 * @desc Set of configurations
 */

const config = require('../config/config.json')
const label = require('../config/label.js')
const logger = require('./logger.js')

let custom = config

if (process.env.BIGBLUEBOT_HOST) custom.url.host = process.env.BIGBLUEBOT_HOST
else logger.error('BigBlueButton host is not defined')

if (process.env.BIGBLUEBOT_ROOM) custom.url.meeting = process.env.BIGBLUEBOT_ROOM
if (process.env.BIGBLUEBOT_BOTS) custom.bot.population = process.env.BIGBLUEBOT_BOTS
if (process.env.BIGBLUEBOT_WAIT) custom.bot.wait = process.env.BIGBLUEBOT_WAIT
if (process.env.BIGBLUEBOT_LIFE) custom.bot.life = process.env.BIGBLUEBOT_LIFE
if (process.env.BIGBLUEBOT_BROWSER) custom.browser.executablePath = process.env.BIGBLUEBOT_BROWSER

module.exports = {
  config: custom,
  label: label
}
