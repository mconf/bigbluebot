const conf = require('../conf');
const util = require('../util');
const logger = require('../logger');

const { config } = conf;

const test = async (page, action) => {
  const { username } = page.bigbluebot;
  const { description } = action;
  await util.delay(config.delay.relief);

  let status;
  const pass = await action.test(page);
  if (pass) {
    logger.test.pass(`${username}: ${description}`);
    status = 'PASS';
  } else {
    logger.test.fail(`${username}: ${description}`);
    status = 'FAIL';
  }

  await util.screenshot(page, status, description);
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
