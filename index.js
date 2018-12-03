/**
 * @name Index
 *
 * @desc BigBlueBot API
 */

const audio = require('./lib/action/audio.js')
const chat = require('./lib/action/chat.js')
const note = require('./lib/action/note.js')
const presentation = require('./lib/action/presentation.js')
const user = require('./lib/action/user.js')
const video = require('./lib/action/video.js')
const whiteboard = require('./lib/action/whiteboard.js')

const logger = require('./lib/logger.js')
const run = require('./lib/run.js')

module.exports = {
  audio: audio,
  chat: chat,
  note: note,
  presentation: presentation,
  user: user,
  video: video,
  whiteboard: whiteboard,
  logger: logger,
  run: run
}
