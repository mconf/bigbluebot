const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const selector = require('../selector');

const { audio: label } = conf.label;

const action = {
  get join() {
    return {
      description: 'audio join',
      execute: async page => await util.click(page, label.join, true),
      test: async page => await util.visible(page, label.modal.name),
    };
  },
  get microphone() {
    return {
      description: 'audio modal microphone',
      before: async page => await perform(page, this.join, true),
      execute: async page => {
        await util.click(page, label.modal.microphone, true);
        await util.click(page, label.echo.confirm, true);
      },
      test: async page => await util.visible(page, label.change, true),
    };
  },
  get listen() {
    return {
      description: 'audio modal listen',
      before: async page => await perform(page, this.join, true),
      execute: async page => await util.click(page, label.modal.listen, true),
      test: async page => await util.visible(page, label.change, true),
    };
  },
  get close() {
    return {
      description: 'audio modal close',
      execute: async page => {
        const { locale } = page.bigbluebot;
        const localizedLabel = selector.localize(locale, label.modal.close)
          + ' ' + selector.localize(locale, label.modal.name);
        await util.click(page, localizedLabel);
      },
      test: async page => await util.hidden(page, label.modal.name),
    };
  },
  get mute() {
    return {
      description: 'audio mute',
      execute: async page => await util.click(page, label.mute, true),
      test: async page => await util.visible(page, label.unmute),
    };
  },
  get unmute() {
    return {
      description: 'audio unmute',
      execute: async page => await util.click(page, label.unmute, true),
      test: async page => await util.visible(page, label.mute),
    };
  },
  get leave() {
    return {
      description: 'audio leave',
      execute: async page => await util.click(page, label.leave, true),
      test: async page => await util.visible(page, label.join),
    };
  },
};

module.exports = {
  join: async page => await perform(page, action.join, true),
  modal: {
    microphone: async page => await perform(page, action.microphone),
    listen: async page => await perform(page, action.listen),
    close: async page => await perform(page, action.close, true),
  },
  mute: async page => await perform(page, action.mute, true),
  unmute: async page => await perform(page, action.unmute, true),
  leave: async page => await perform(page, action.leave, true),
};
