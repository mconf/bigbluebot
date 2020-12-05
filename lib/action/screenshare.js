const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { screenshare: label } = conf.label;

const action = {
  get start() {
    return {
      description: 'screenshare start',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.start, true),
      test: async page => true, // TODO
    };
  },
  get stop() {
    return {
      description: 'screenshare stop',
      execute: async page => await util.click(page, label.stop, true),
      test: async page => true, // TODO
    };
  },
};

module.exports = {
  start: async page => await perform(page, action.start),
  stop: async page => await perform(page, action.stop),
};
