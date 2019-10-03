/**
 * @name Video
 *
 * @desc Collection of bot video actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const video = conf.label.video

const action = {
  join: {
    description: 'share video',
    before: audio.dialog.close,
    execute: async page => {
      await util.click(page, video.open, true)
      await util.click(page, video.settings.start, true)
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  leave: {
    description: 'unshare video',
    execute: async page => {
      await util.click(page, video.open, true)
      await util.click(page, video.menu.unshare, true)
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  focus: {
    description: 'focus video',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  stats: {
    description: 'show video stats',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  swap: {
    description: 'swap main content',
    execute: async page => {
      await util.click(page, video.open, true)
      await util.click(page, video.menu.swap)
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  join: async page => {
    await perform(page, action.join)
  },
  leave: async page => {
    await perform(page, action.leave)
  },
  focus: async page => {
    await perform(page, action.focus)
  },
  stats: async page => {
    await perform(page, action.stats)
  },
  swap: async page => {
    await perform(page, action.swap)
  }
}
