/**
 * @name Index
 *
 * @desc Dispatch an HTML5 bot script
 */

const action = require('./lib/action.js')
const run = require('./lib/run.js')

let actions = async page => {
  // Using puppeteer with Chromium (our default case here) you will need to
  // configure bbb-webrtc-sfu to use VP8 instead of H.264
  await action.video.join(page)
}

run(actions)
