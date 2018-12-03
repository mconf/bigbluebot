/**
 * @name Index
 *
 * @desc Dispatch an HTML5 bot script
 */

const action = require('./lib/action.js')
const run = require('./lib/run.js')

let actions = async page => {
  await action.audio.dialog.microphone(page)
}

run(actions)
