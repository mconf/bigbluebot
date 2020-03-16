/**
 * @name Video
 *
 * @desc Collection of bot video actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const { video } = conf.label

const action = {
  get join() {
    return {
      description: 'video join',
      before: audio.modal.close,
      execute: async page => {
        await util.click(page, video.share, true)
        await util.click(page, video.settings.start, true)
      },
      test: async page => {
        const { username } = page.bigbluebot
        const params = [ username ]
        const element = { label: video.fullscreen, params }
        return await util.visible(page, element, true)
      }
    }
  },
  get leave() {
    return {
      description: 'video leave',
      execute: async page => {
        await util.click(page, video.unshare, true)
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get focus() {
    return {
      description: 'video focus',
      execute: async page => {
        // TODO: interface actions
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
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
  }
}
