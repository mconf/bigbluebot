const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const main = require('./main');

const { note: label } = conf.label;
const { note: content } = conf.config.content;

const action = {
  get open() {
    return {
      description: 'note open',
      before: main.panel.open,
      execute: async page => await util.click(page, label.open, true),
      test: async page => true, // TODO
    };
  },
  get close() {
    return {
      description: 'note close',
      before: main.panel.open,
      execute: async page => await util.click(page, label.close, true),
      test: async page => true, // TODO
    };
  },
  get write() {
    return {
      description: 'note write',
      execute: async page => {
        let notes = util.generateText(content.lines);
        const frame = await util.frame(page, label.frame.name, true);
        for (let i = 0; i < notes.length; i++) {
          let text = "\n" + notes[i];
          await util.write(frame, label.frame.pad, text);
        }
      },
      test: async page => true, // TODO
    };
  },
};

module.exports = {
  open: async page => await perform(page, action.open),
  close: async page => await perform(page, action.close),
  write: async page => await perform(page, action.write),
};
