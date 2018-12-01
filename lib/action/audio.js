/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')

const audio = conf.label.audio

const action = {
  join: {
    description: 'open audio dialog',
    execute: async page => await util.click(page, audio.join, true),
    test: async page => await util.visible(page, audio.dialog.modal)
  },
  microphone: {
    description: 'join microphone',
    execute: async page => {
      await util.click(page, audio.dialog.microphone)
      await util.click(page, audio.echo.confirm)
    },
    test: async page => await util.visible(page, audio.leave)
  },
  listen: {
    description: 'join listener',
    execute: async page => await util.click(page, audio.dialog.listen),
    test: async page => await util.visible(page, audio.leave)
  },
  close: {
    description: 'close audio dialog',
    execute: async page => await util.click(page, audio.dialog.close),
    test: async page => await util.hidden(page, audio.dialog.modal)
  },
  mute: {
    description: 'mute microphone',
    execute: async page => await util.click(page, audio.mute, true),
    test: async page => await util.visible(page, audio.unmute)
  },
  unmute: {
    description: 'unmute microphone',
    execute: async page => await util.click(page, audio.unmute, true),
    test: async page => await util.visible(page, audio.mute)
  },
  leave: {
    description: 'leave audio',
    execute: async page => await util.click(page, audio.leave, true),
    test: async page => await util.visible(page, audio.join)
  }
}

module.exports = {
  join: async page => {
    await perform(page, action.join, true)
  },
  microphone: async page => {
    await perform(page, action.microphone)
  },
  listen: async page => {
    await perform(page, action.listen)
  },
  close: async page => {
    await perform(page, action.close, true)
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
