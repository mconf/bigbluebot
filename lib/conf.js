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
  BIGBLUEBOT_SECRET,
  BIGBLUEBOT_ROOM,
  BIGBLUEBOT_BOTS,
  BIGBLUEBOT_WAIT,
  BIGBLUEBOT_LIFE,
  BIGBLUEBOT_BROWSER,
  BIGBLUEBOT_POOL,
  BIGBLUEBOT_ENDPOINT,
  BIGBLUEBOT_TOKEN
} = process.env;

if (BIGBLUEBOT_HOST) custom.url.host = BIGBLUEBOT_HOST
else logger.error('BigBlueButton host is not defined')

if (BIGBLUEBOT_ROOM) custom.url.meeting.name = BIGBLUEBOT_ROOM
if (BIGBLUEBOT_SECRET) custom.api.secret = BIGBLUEBOT_SECRET
if (BIGBLUEBOT_BOTS) custom.bot.population = parseInt(BIGBLUEBOT_BOTS)
if (BIGBLUEBOT_WAIT) custom.bot.wait = parseInt(BIGBLUEBOT_WAIT)
if (BIGBLUEBOT_LIFE) custom.bot.life = parseInt(BIGBLUEBOT_LIFE)
if (BIGBLUEBOT_BROWSER) custom.browser.path = BIGBLUEBOT_BROWSER
if (BIGBLUEBOT_POOL) custom.browser.pool.population = parseInt(BIGBLUEBOT_POOL)
if (BIGBLUEBOT_ENDPOINT) custom.browser.endpoint = BIGBLUEBOT_ENDPOINT
if (BIGBLUEBOT_TOKEN) custom.browser.token = BIGBLUEBOT_TOKEN

module.exports = {
  config: custom,
  label: label
}
