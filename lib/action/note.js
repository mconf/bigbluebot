/**
 * @name Note
 *
 * @desc Collection of bot note actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const note = conf.label.note
const data = conf.config.data

const evaluate = {
  open: {
    description: 'open note',
    test: async page => true
  },
  close: {
    description: 'close note',
    test: async page => true
  },
  write: {
    description: 'write note',
    test: async page => true
  }
}

module.exports = {
  open: async page => {
    await util.click(page, note.open, true)
    await util.test(page, evaluate.open)
  },
  close: async page => {
    await util.click(page, note.close, true)
    await util.test(page, evaluate.close)
  },
  write: async (page, id) => {
    let notes = data.note
    const frame = await util.frame(page, note.frame.name, true)
    for (let i = 0; i < notes.length; i++) {
      let text = "\n" + util.identify(id, notes[i])
      await util.write(frame, note.frame.pad, text)
    }
    await util.test(page, evaluate.write)
  }
}
