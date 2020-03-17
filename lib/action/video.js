const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { video: label } = conf.label;

const action = {
  get join() {
    return {
      description: 'video join',
      before: audio.modal.close,
      execute: async page => {
        await util.click(page, label.share, true);
        await util.click(page, label.settings.start, true);
      },
      test: async page => {
        const { username } = page.bigbluebot;
        const params = [ username ];
        const element = { label: label.fullscreen, params };
        return await util.visible(page, element, true);
      },
    };
  },
  get leave() {
    return {
      description: 'video leave',
      execute: async page => await util.click(page, label.unshare, true),
      test: async page => true, // TODO
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
