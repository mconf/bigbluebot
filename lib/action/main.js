/**
 * @name Main
 *
 * @desc Collection of bot main window actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const { main } = conf.label

const action = {
  panel: {
    open: {
      description: 'main panel open',
      before: audio.dialog.close,
      execute: async page => await util.click(page, main.panel.open, true),
      test: async page => await util.visible(page, main.panel.name)
    },
    close: {
      description: 'main panel close',
      execute: async page => await util.click(page, main.panel.close, true),
      test: async page => await util.hidden(page, main.panel.name)
    }
  }
}

module.exports = {
  panel: {
    open: async page => {
      await perform(page, action.panel.open, true)
    },
    close: async page => {
      await perform(page, action.panel.close, true)
    }
  }
}
