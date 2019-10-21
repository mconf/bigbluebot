/**
 * @name Conf
 *
 * @desc Set of configurations
 */

const config = require('../config/config.json')
const label = require('../config/label.js')
const logger = require('./logger.js')

let custom = config

const {
  BIGBLUEBOT_HOST,
  BIGBLUEBOT_ROOM,
  BIGBLUEBOT_BOTS,
  BIGBLUEBOT_WAIT,
  BIGBLUEBOT_LIFESPAN,
  BIGBLUEBOT_BROWSER,
  BIGBLUEBOT_ENDPOINT,
  BIGBLUEBOT_TOKEN
} = process.env;

if (BIGBLUEBOT_HOST) custom.url.host = BIGBLUEBOT_HOST
else logger.error('BigBlueButton host is not defined')

if (BIGBLUEBOT_ROOM) custom.url.meeting = BIGBLUEBOT_ROOM
if (BIGBLUEBOT_BOTS) custom.bot.population = parseInt(BIGBLUEBOT_BOTS)
if (BIGBLUEBOT_WAIT) custom.bot.wait = parseInt(BIGBLUEBOT_WAIT)
if (BIGBLUEBOT_LIFESPAN) custom.bot.lifespan = parseInt(BIGBLUEBOT_LIFESPAN)
if (BIGBLUEBOT_BROWSER) custom.browser.executablePath = BIGBLUEBOT_BROWSER
if (BIGBLUEBOT_ENDPOINT) custom.browser.browserWSEndpoint = BIGBLUEBOT_ENDPOINT
if (BIGBLUEBOT_TOKEN) custom.browser.token = BIGBLUEBOT_TOKEN

module.exports = {
  config: custom,
  label: label
}
