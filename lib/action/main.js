const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { main: label } = conf.label;
const { main: datatest } = conf.datatest;

const action = {
  get open() {
    return {
      description: 'main panel open',
      before: audio.modal.close,
      execute: async page => await util.click(page, util.buildElement(datatest.panel.open, label.panel.open), true),
      test: async page => await util.visible(page, util.buildElement(datatest.panel.name, label.panel.name)),
    };
  },
  get close() {
    return {
      description: 'main panel close',
      execute: async page => await util.click(page, util.buildElement(datatest.panel.close, label.panel.close), true),
      test: async page => await util.hidden(page, util.buildElement(datatest.panel.name, label.panel.name)),
    };
  },
};

module.exports = {
  panel: {
    open: async page => await perform(page, action.open, true),
    close: async page => await perform(page, action.close, true),
  },
};
