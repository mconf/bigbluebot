const conf = require('../conf');
const util = require('../util');
const logger = require('../logger');

const { config } = conf;

const test = async (page, action) => {
  const { username } = page.bigbluebot;
  await util.delay(config.delay.relief);

  let prefix;
  const pass = await action.test(page);
  if (pass) {
    logger.test.pass(`${username}: ${action.description}`);
    prefix = `[PASS]${action.description}-`;
  } else {
    logger.test.fail(`${username}: ${action.description}`);
    prefix = `[FAIL]${action.description}-`;
  }

  await util.screenshot(page, prefix);
};

const perform = async (page, action, check = false) => {
  if (action.before) await action.before(page);

  let skip = false;
  if (check) skip = await action.test(page);

  const { username } = page.bigbluebot;

  if (skip) {
    logger.debug(`${username}: skip ${action.description}`);
  } else {
    logger.info(`${username}: perform ${action.description}`);
    await action.execute(page);
    await test(page, action);
  }
};

module.exports = perform;
