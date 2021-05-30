const conf = require('../conf');
const util = require('../util');
const selector = require('../selector');
const perform = require('./perform');
const audio = require('./audio');

const { screenshare: label } = conf.label;

const action = {
  get share() {
    return {
      description: 'screenshare share',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.share, true),
      test: async page => {
        const { locale } = page.bigbluebot;
        const params = [ selector.localize(locale, label.screenshare) ];
        const element = { label: label.fullscreen, params };
        return await util.visible(page, element, true);
      },
    };
  },
  get unshare() {
    return {
      description: 'screenshare unshare',
      execute: async page => await util.click(page, label.unshare, true),
      test: async page => await util.visible(page, label.share),
    };
  },
};

module.exports = {
  share: async page => await perform(page, action.share),
  unshare: async page => await perform(page, action.unshare),
};
