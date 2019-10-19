/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')

const { audio } = conf.label

const action = {
  join: {
    description: 'audio join',
    execute: async page => await util.click(page, audio.join, true),
    test: async page => await util.visible(page, audio.dialog.modal)
  },
  dialog: {
    microphone: {
      description: 'audio dialog microphone',
      execute: async page => {
        await util.click(page, audio.dialog.microphone)
        await util.click(page, audio.echo.confirm)
      },
      test: async page => await util.visible(page, audio.leave)
    },
    listen: {
      description: 'audio dialog listen',
      execute: async page => await util.click(page, audio.dialog.listen),
      test: async page => await util.visible(page, audio.leave)
    },
    close: {
      description: 'audio dialog close',
      execute: async page => await util.click(page, audio.dialog.close),
      test: async page => await util.hidden(page, audio.dialog.modal)
    }
  },
  mute: {
    description: 'audio mute',
    execute: async page => await util.click(page, audio.mute, true),
    test: async page => await util.visible(page, audio.unmute)
  },
  unmute: {
    description: 'audio unmute',
    execute: async page => await util.click(page, audio.unmute, true),
    test: async page => await util.visible(page, audio.mute)
  },
  leave: {
    description: 'audio leave',
    execute: async page => await util.click(page, audio.leave, true),
    test: async page => await util.visible(page, audio.join)
  }
}

module.exports = {
  join: async page => {
    await perform(page, action.join, true)
  },
  dialog: {
    microphone: async page => {
      await perform(page, action.dialog.microphone)
    },
    listen: async page => {
      await perform(page, action.dialog.listen)
    },
    close: async page => {
      await perform(page, action.dialog.close, true)
    }
  },
  mute: async page => {
    await perform(page, action.mute, true)
  },
  unmute: async page => {
    await perform(page, action.unmute, true)
  },
  leave: async page => {
    await perform(page, action.leave, true)
  }
}
