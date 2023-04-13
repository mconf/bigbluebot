const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');

const { audio: label } = conf.label;
const { audio: datatest } = conf.datatest;

const action = {
  get join() {
    return {
      description: 'audio join',
      execute: async page => await util.click(page, util.buildElement(datatest.join, label.join), true),
      test: async page => await util.visible(page, util.buildElement(datatest.modal.name, label.modal.name)),
    };
  },
  get microphone() {
    return {
      description: 'audio modal microphone',
      before: async page => await perform(page, this.join, true),
      execute: async page => {
        await util.click(page, util.buildElement(datatest.modal.microphone, label.modal.microphone), true);
        await util.click(page, util.buildElement(datatest.echo.confirm, label.echo.confirm), true);
      },
      test: async page => await util.visible(page, util.buildElement(datatest.change, label.change), true),
    };
  },
  get listen() {
    return {
      description: 'audio modal listen',
      before: async page => await perform(page, this.join, true),
      execute: async page => await util.click(page, util.buildElement(datatest.modal.listen, label.modal.listen), true),
      test: async page => await util.visible(page, util.buildElement(datatest.leave, label.change), true),
    };
  },
  get close() {
    return {
      description: 'audio modal close',
      execute: async page => await util.click(page, util.buildElement(datatest.modal.close, label.modal.close)),
      test: async page => await util.hidden(page, util.buildElement(datatest.modal.name, label.modal.name)),
    };
  },
  get mute() {
    return {
      description: 'audio mute',
      execute: async page => await util.click(page, util.buildElement(datatest.mute, label.mute), true),
      test: async page => await util.visible(page, util.buildElement('', label.unmute)),
    };
  },
  get unmute() {
    return {
      description: 'audio unmute',
      execute: async page => await util.click(page, util.buildElement(datatest.unmute, label.unmute), true),
      test: async page => await util.visible(page, util.buildElement('', label.mute)),
    };
  },
  get leave() {
    return {
      description: 'audio leave',
      execute: async page => await util.click(page, util.buildElement(datatest.leave, label.leave), true),
      test: async page => await util.visible(page, util.buildElement(datatest.join, label.join)),
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
