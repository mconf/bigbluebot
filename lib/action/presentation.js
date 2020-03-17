const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const audio = require('./audio');

const { presentation: label } = conf.label;

const action = {
  get upload() {
    return {
      description: 'presentation upload',
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
  get change() {
    return {
      description: 'presentation change',
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
  get next() {
    return {
      description: 'presentation slide next',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.slide.next, true),
      test: async page => true, // TODO
    };
  },
  get previous() {
    return {
      description: 'presentation slide previous',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.slide.previous, true),
      test: async page => true, // TODO
    };
  },
  get in() {
    return {
      description: 'presentation zoom in',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.zoom.in),
      test: async page => true, // TODO
    };
  },
  get out() {
    return {
      description: 'presentation zoom out',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.zoom.out),
      test: async page => true, // TODO
    };
  },
  get fit() {
    return {
      description: 'presentation fit',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.fit, true),
      test: async page => true, // TODO
    };
  },
  get hide() {
    return {
      description: 'presentation hide',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.hide, true),
      test: async page => await util.visible(page, label.restore),
    };
  },
  get restore() {
    return {
      description: 'presentation restore',
      before: audio.modal.close,
      execute: async page => await util.click(page, label.restore, true),
      test: async page => await util.visible(page, label.hide),
    };
  },
};

module.exports = {
  upload: async page => await perform(page, action.upload),
  change: async page => await perform(page, action.change),
  slide: {
    next: async page => await perform(page, action.next),
    previous: async page => await perform(page, action.previous),
  },
  zoom: {
    in: async page => await perform(page, action.in),
    out: async page => await perform(page, action.out),
  },
  fit: async page => await perform(page, action.fit),
  hide: async page => await perform(page, action.hide),
  restore: async page => await perform(page, action.restore),
};
