const util = require('./util');
const pool = require('./pool');
const conf = require('./conf');
const logger = require('./logger');

var { api, bot, url, misc } = conf.config;

const dependencies = (options) => {
  if (!url.host && !options.host) {
    logger.error('BigBlueButton host is not defined');
    return false;
  }
  return true;
};

const run = async (actions, options = {}) => {
  // Check for dependencies
  if (!dependencies(options)) return null;

  // Print some basic settings
  logger.info(`Bots: ${pool.size * pool.population}`);
  logger.info(`Life: ${bot.life / 1000} seconds`);

  // Assume a private room if the server secret was configured
  const privileged = options.secret || api.secret;

  // Create the meeting if not created yet or use a preexisting one
  if (privileged) {
    let meet;
    // let's see if we can dig out missing information when we ask the server via 'getMeeting'
    // first we look for a named meeting
    if (url.meeting.name) {
      meet = await util.findMeetingByName(url.meeting.name, options);
      if (meet) {
        url.meeting.room = meet.meetingID;
        api.password.moderator = meet.moderatorPW;
        api.password.attendee = meet.attendeePW;
      }
    }

    // ok this might be inefficient if a name was provided, but who cares
    meet = await util.findMeetingByID(url.meeting.room, options);
    if (!meet) {
      const success = await util.create(options);
      if (!success) return null;
    }
  }

  // Fetch the UI labels from locale
  const locale = await util.locale(options);

  let browsers = [];
  for (let i = 0; i < pool.size; i++) {
    logger.debug(`Opening browser`);

    // Open a new browser process
    browsers.push(pool.browsers.acquire().then(async browser => {
      let promises = [];
      for (let j = 0; j < pool.population; j++) {
        let username;
        await util.delay(bot.wait);

        // Dispatch a new bot
        promises.push(browser.newPage().then(async page => {
          username = await util.join(page, locale, options);
          page.bigbluebot = { username, locale };
          await actions(page);
          await page.waitForTimeout(bot.life);
          logger.info(`${username}: leaving`);
        }).catch(error => {
          logger.error(error);
          return error;
        }));
      }

      // Make sure to close/disconnect the browser
      await Promise.all(promises).then(async () => {
        const { endpoint } = conf.config.browser;
        if (endpoint) {
          await browser.disconnect();
        } else {
          await browser.close();
        }
      }).catch(error => {
        logger.error(error);
        return error;
      });
    }).catch(error => {
      logger.error(error);
      return error;
    }));

    // Sync the bots entrance
    await util.delay(bot.wait * pool.population);
  }

  await Promise.all(browsers).finally(async () => {
    if (private && misc.meeting.end) await util.end(options);
  });
};

module.exports = run;
