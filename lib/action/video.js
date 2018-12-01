/**
 * @name Video
 *
 * @desc Collection of bot video actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const video = conf.label.video

const evaluate = {
  join: {
    description: 'share video',
    test: async page => true
  },
  leave: {
    description: 'unshare video',
    test: async page => true
  },
  focus: {
    description: 'focus video',
    test: async page => true
  },
  stats: {
    description: 'show video stats',
    test: async page => true
  },
  swap: {
    description: 'swap main content',
    test: async page => true
  }
}

module.exports = {
  join: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.share, true)
    await util.click(page, video.settings.start, true)
    await util.test(page, evaluate.join)
  },
  leave: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.unshare, true)
    await util.test(page, evaluate.leave)
  },
  focus: async page => {
    await util.test(page, evaluate.focus)
  },
  stats: async page => {
    await util.test(page, evaluate.stats)
  },
  swap: async page => {
    await util.click(page, video.open, true)
    await util.click(page, video.menu.swap)
    await util.test(page, evaluate.swap)
  }
}
