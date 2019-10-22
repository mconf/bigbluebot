/**
 * @name Example
 *
 * @desc Dispatch an HTML5 bot script
 */

const bigbluebot = require('./index.js')

let actions = async page => {
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
