/**
 * @name Chat
 *
 * @desc Collection of bot chat actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const main = require('./main.js')

const chat = conf.label.chat
const data = conf.config.data

const options = async (page, option) => {
  await util.click(page, chat.options.open, true)
  await util.click(page, option, true)
}

const action = {
  open: {
    description: 'open chat',
    before: main.panel.open,
    execute: async page => await util.click(page, chat.open, true),
    test: async page => await util.visible(page, chat.panel)
  },
  close: {
    description: 'close chat',
    before: main.panel.open,
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
  options: {
    clear: {
      description: 'clear chat',
      execute: async page => await options(page, chat.options.clear),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    copy: {
      description: 'copy chat',
      execute: async page => await options(page, chat.options.copy),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    save: {
      description: 'save chat',
      execute: async page => await options(page, chat.options.save),
      test: async page => {
        // TODO: evaluation test
        return true
      }
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
  options: {
    clear: async page => {
      await perform(page, action.options.clear)
    },
    copy: async page => {
      await perform(page, action.options.copy)
    },
    save: async page => {
      await perform(page, action.options.save)
    }
  }
}
