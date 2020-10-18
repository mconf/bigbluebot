const config = require('../config/config');
const label = require('../config/label');

let custom = config;

const {
  BIGBLUEBOT_HOST,
  BIGBLUEBOT_SECRET,
  BIGBLUEBOT_ROOM,
  BIGBLUEBOT_ATTENDEE_PW,
  BIGBLUEBOT_MODERATOR_PW,
  BIGBLUEBOT_BOTS,
  BIGBLUEBOT_WAIT,
  BIGBLUEBOT_LIFE,
  BIGBLUEBOT_BROWSER,
  BIGBLUEBOT_POOL,
  BIGBLUEBOT_ENDPOINT,
  BIGBLUEBOT_TOKEN,
  BIGBLUEBOT_LOG,
  LANGUAGE,
} = process.env;

if (BIGBLUEBOT_HOST) custom.url.host = BIGBLUEBOT_HOST;
if (BIGBLUEBOT_ROOM) custom.url.meeting.name = BIGBLUEBOT_ROOM;
if (BIGBLUEBOT_SECRET) custom.api.secret = BIGBLUEBOT_SECRET;
if (BIGBLUEBOT_BOTS) custom.bot.population = parseInt(BIGBLUEBOT_BOTS);
if (BIGBLUEBOT_WAIT) custom.bot.wait = parseInt(BIGBLUEBOT_WAIT);
if (BIGBLUEBOT_LIFE) custom.bot.life = parseInt(BIGBLUEBOT_LIFE);
if (BIGBLUEBOT_BROWSER) custom.browser.path = BIGBLUEBOT_BROWSER;
if (BIGBLUEBOT_POOL) custom.browser.pool.population = parseInt(BIGBLUEBOT_POOL);
if (BIGBLUEBOT_ENDPOINT) custom.browser.endpoint = BIGBLUEBOT_ENDPOINT;
if (BIGBLUEBOT_TOKEN) custom.browser.token = BIGBLUEBOT_TOKEN;
if (BIGBLUEBOT_LOG) custom.logger.level = BIGBLUEBOT_LOG;
if (BIGBLUEBOT_ATTENDEE_PW) custom.api.password.attendee = BIGBLUEBOT_ATTENDEE_PW;
if (BIGBLUEBOT_MODERATOR_PW) custom.api.password.moderator = BIGBLUEBOT_MODERATOR_PW;

// https://developer.chrome.com/extensions/i18n#testing-linux
if (LANGUAGE) custom.browser.lang = LANGUAGE;

module.exports = {
  config: custom,
  label: label,
};
