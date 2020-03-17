const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { main: label } = conf.label;

const action = {
  get open() {
    return {
      description: 'main panel open',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.panel.open, true),
      test: async page => await util.visible(page, label.panel.name),
    };
  },
  get close() {
    return {
      description: 'main panel close',
      execute: async page => await util.click(page, label.panel.close, true),
      test: async page => await util.hidden(page, label.panel.name),
    };
  },
};

module.exports = {
  panel: {
    open: async page => await perform(page, action.open, true),
    close: async page => await perform(page, action.close, true),
  },
};
