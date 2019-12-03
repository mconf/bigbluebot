/**
 * @name Note
 *
 * @desc Collection of bot note actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const main = require('./main.js')

const { note } = conf.label
const { content } = conf.config

const action = {
  get open() {
    return {
      description: 'note open',
      before: main.panel.open,
      execute: async page => await util.click(page, note.open, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get close() {
    return {
      description: 'note close',
      before: main.panel.open,
      execute: async page => await util.click(page, note.close, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get write() {
    return {
      description: 'note write',
      execute: async page => {
        let notes = util.generateText(content.note.lines)
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
