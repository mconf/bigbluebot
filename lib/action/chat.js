/**
 * @name Chat
 *
 * @desc Collection of bot chat actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')

const chat = conf.label.chat
const data = conf.config.data

const action = {
  open: {
    description: 'open chat',
    execute: async page => await util.click(page, chat.open, true),
    test: async page => await util.visible(page, chat.panel)
  },
  close: {
    description: 'close chat',
    execute: async page => await util.click(page, chat.close, true),
    test: async page => await util.hidden(page, chat.panel)
  },
  send: {
    description: 'send chat message',
    execute: async page => {
      let messages = data.chat
      for (let i = 0; i < messages.length; i++) {
        await util.type(page, chat.form.input, messages[i])
        await util.click(page, chat.form.send, true)
      }
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  clear: {
    description: 'clear chat',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  copy: {
    description: 'copy chat',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  save: {
    description: 'save chat',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  open: async page => {
    await perform(page, action.open, true)
  },
  close: async page => {
    await perform(page, action.close, true)
  },
  send: async page => {
    await perform(page, action.send)
  },
  clear: async page => {
    await perform(page, action.clear)
  },
  copy: async page => {
    await perform(page, action.copy)
  },
  save: async page => {
    await perform(page, action.save)
  }
}
