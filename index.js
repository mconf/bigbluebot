require('dotenv').config();

const action = require('./lib/action');

const {
  audio,
  chat,
  note,
  presentation,
  screenshare,
  user,
  video,
  whiteboard,
} = action;

const logger = require('./lib/logger');
const run = require('./lib/run');

module.exports = {
  audio,
  chat,
  note,
  presentation,
  screenshare,
  user,
  video,
  whiteboard,
  logger,
  run,
};
