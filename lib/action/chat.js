const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const main = require('./main');

const { chat: label } = conf.label;
const { chat: content } = conf.config.content;

const options = async (page, option) => {
  await util.click(page, label.options.open, true);
  await util.click(page, option, true);
};

const action = {
  get open() {
    return {
      description: 'chat open',
      before: main.panel.open,
      execute: async page => await util.click(page, label.open, true),
      test: async page => await util.visible(page, label.panel),
    };
  },
  get close() {
    return {
      description: 'chat close',
      before: main.panel.open,
      execute: async page => await util.click(page, label.close, true),
      test: async page => await util.hidden(page, label.panel),
    };
  },
  get send() {
    return {
      description: 'chat send',
      before: async page => await perform(page, this.open, true),
      execute: async page => {
        let messages = util.generateText(content.lines);
        for (let i = 0; i < messages.length; i++) {
          await util.type(page, label.form.input, messages[i]);
          await util.click(page, label.form.send, true);
        }
      },
      test: async page => true, // TODO
    };
  },
  get clear() {
    return {
      description: 'chat clear',
      before: async page => await perform(page, this.open, true),
      execute: async page => await options(page, label.options.clear),
      test: async page => true, // TODO
    };
  },
  get copy() {
    return {
      description: 'chat copy',
      before: async page => await perform(page, this.open, true),
      execute: async page => await options(page, label.options.copy),
      test: async page => true, // TODO
    };
  },
  get save() {
    return {
      description: 'chat save',
      before: async page => await perform(page, this.open, true),
      execute: async page => await options(page, label.options.save),
      test: async page => true, // TODO
    };
  },
};

module.exports = {
  open: async page => await perform(page, action.open, true),
  close: async page => await perform(page, action.close, true),
  send: async page => await perform(page, action.send),
  options: {
    clear: async page => await perform(page, action.clear),
    copy: async page => await perform(page, action.copy),
    save: async page => await perform(page, action.save),
  },
};
