const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { video: label } = conf.label;
const { video: datatest} = conf.datatest;

const action = {
  get join() {
    return {
      description: 'video join',
      before: audio.modal.close,
      execute: async page => {
        await util.click(page, util.buildElement(datatest.share, label.share), true);
        await util.click(page, util.buildElement(datatest.settings.start, label.settings.start), true);
      },
      test: async page => await util.visible(page, util.buildElement(datatest.fullscreen, label.fullscreen), true),
    };
  },
  get leave() {
    return {
      description: 'video leave',
      execute: async page => await util.click(page, util.buildElement(datatest.unshare, label.unshare), true),
      test: async page => await util.visible(page, util.buildElement(datatest.share, label.share), true),
    };
  },
  get focus() {
    return {
      description: 'video focus',
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
};

module.exports = {
  join: async page => await perform(page, action.join),
  leave: async page => await perform(page, action.leave),
  focus: async page => await perform(page, action.focus),
};
