/**
 * @name Example
 *
 * @desc Dispatch an HTML5 bot script
 */

const bigbluebot = require('./index.js')

let actions = async page => {
  await bigbluebot.audio.modal.microphone(page)
  await bigbluebot.video.join(page)
  await bigbluebot.chat.send(page)
}

bigbluebot.run(actions)
