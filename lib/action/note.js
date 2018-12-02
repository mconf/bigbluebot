/**
 * @name Note
 *
 * @desc Collection of bot note actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const main = require('./main.js')

const note = conf.label.note
const data = conf.config.data

const action = {
  open: {
    description: 'open note',
    before: main.panel.open,
    execute: async page => await util.click(page, note.open, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  close: {
    description: 'close note',
    before: main.panel.open,
    execute: async page => await util.click(page, note.close, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  write: {
    description: 'write note',
    execute: async page => {
      let notes = data.note
      const frame = await util.frame(page, note.frame.name, true)
      for (let i = 0; i < notes.length; i++) {
        let text = "\n" + notes[i]
        await util.write(frame, note.frame.pad, text)
      }
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  open: async page => {
    await perform(page, action.open)
  },
  close: async page => {
    await perform(page, action.close)
  },
  write: async page => {
    await perform(page, action.write)
  }
}
