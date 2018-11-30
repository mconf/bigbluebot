/**
 * @name Audio
 *
 * @desc Collection of bot audio actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const audio = conf.label.audio

const evaluate = {
  join: {
    description: 'open audio dialog',
    test: async page => await util.visible(page, audio.dialog.modal)
  },
  microphone: {
    description: 'join microphone',
    test: async page => await util.visible(page, audio.leave)
  },
  listen: {
    description: 'join listener',
    test: async page => await util.visible(page, audio.leave)
  },
  close: {
    description: 'close audio dialog',
    test: async page => await util.hidden(page, audio.dialog.modal)
  },
  mute: {
    description: 'mute microphone',
    test: async page => await util.visible(page, audio.unmute)
  },
  unmute: {
    description: 'unmute microphone',
    test: async page => await util.visible(page, audio.mute)
  },
  leave: {
    description: 'leave audio',
    test: async page => await util.visible(page, audio.join)
  }
}

module.exports = {
  join: async page => {
    await util.click(page, audio.join, true)
    await util.test(page, evaluate.join)
  },
  microphone: async page => {
    await util.click(page, audio.dialog.microphone)
    await util.click(page, audio.echo.confirm)
    await util.test(page, evaluate.microphone)
  },
  listen: async page => {
    await util.click(page, audio.dialog.listen)
    await util.test(page, evaluate.listen)
  },
  close: async page => {
    await util.click(page, audio.dialog.close)
    await util.test(page, evaluate.close)
  },
  mute: async page => {
    await util.click(page, audio.mute, true)
    await util.test(page, evaluate.mute)
  },
  unmute: async page => {
    await util.click(page, audio.unmute, true)
    await util.test(page, evaluate.unmute)
  },
  leave: async page => {
    await util.click(page, audio.leave, true)
    await util.test(page, evaluate.leave)
  }
}
