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
  get join() {
    return {
      description: 'audio join',
      execute: async page => await util.click(page, audio.join, true),
      test: async page => await util.visible(page, audio.modal.name)
    }
  },
  modal: {
    get microphone() {
      return {
        description: 'audio modal microphone',
        execute: async page => {
          await util.click(page, audio.modal.microphone, true)
          await util.click(page, audio.echo.confirm, true)
        },
        test: async page => await util.visible(page, audio.leave)
      }
    },
    get listen() {
      return {
        description: 'audio modal listen',
        execute: async page => await util.click(page, audio.modal.listen, true),
        test: async page => await util.visible(page, audio.leave)
      }
    },
    get close() {
      return {
        description: 'audio modal close',
        execute: async page => await util.click(page, audio.modal.close),
        test: async page => await util.hidden(page, audio.modal.name)
      }
    }
  },
  get mute() {
    return {
      description: 'audio mute',
      execute: async page => await util.click(page, audio.mute, true),
      test: async page => await util.visible(page, audio.unmute)
    }
  },
  get unmute() {
    return {
      description: 'audio unmute',
      execute: async page => await util.click(page, audio.unmute, true),
      test: async page => await util.visible(page, audio.mute)
    }
  },
  get leave() {
    return {
      description: 'audio leave',
      execute: async page => await util.click(page, audio.leave, true),
      test: async page => await util.visible(page, audio.join)
    }
  }
}

module.exports = {
  join: async page => {
    await perform(page, action.join, true)
  },
  modal: {
    microphone: async page => {
      await perform(page, action.modal.microphone)
    },
    listen: async page => {
      await perform(page, action.modal.listen)
    },
    close: async page => {
      await perform(page, action.modal.close, true)
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
