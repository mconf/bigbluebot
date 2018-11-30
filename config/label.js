/**
 * @name Label
 *
 * @desc Set of interface labels
 */

const audio = require('./label/audio.js')
const chat = require('./label/chat.js')
const note = require('./label/note.js')
const presentation = require('./label/presentation.js')
const user = require('./label/user.js')
const video = require('./label/video.js')
const whiteboard = require('./label/whiteboard.js')

module.exports = {
  audio: audio,
  chat: chat,
  note: note,
  presentation: presentation,
  user: user,
  video: video,
  whiteboard: whiteboard
}
