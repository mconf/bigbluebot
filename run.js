/**
 * @name Run
 *
 * @desc Dispatch an HTML5 bot script
 */

const action = require('./lib/action.js')
const bigbluebot = require('./lib/bigbluebot.js')

let actions = async (page, id) => {
  await action.audio.microphone(page)
}

bigbluebot(actions)
