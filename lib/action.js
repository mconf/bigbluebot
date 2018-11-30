/**
 * @name Action
 *
 * @desc Collection of bot actions
 */

const audio = require('./action/audio.js')
const chat = require('./action/chat.js')
const note = require('./action/note.js')
const presentation = require('./action/presentation.js')
const user = require('./action/user.js')
const video = require('./action/video.js')
const whiteboard = require('./action/whiteboard.js')

module.exports = {
  audio: audio,
  chat: chat,
  note: note,
  presentation: presentation,
  user: user,
  video: video,
  whiteboard: whiteboard
}
