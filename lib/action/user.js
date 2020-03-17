const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const main = require('./main');

const { user: label } = conf.label;

const status = async (page, emoji) => {
  await util.click(page, label.name.me, true);
  await util.click(page, label.status.open, true);
  await util.click(page, emoji, true);
};

const action = {
  get away() {
    return {
      description: 'user status away',
      before: main.panel.open,
      execute: async page => await status(page, label.status.away),
      test: async page => await util.visible(page, label.name.away),
    };
  },
  get hand() {
    return {
      description: 'user status hand',
      before: main.panel.open,
      execute: async page => await status(page, label.status.hand),
      test: async page => await util.visible(page, label.name.hand),
    };
  },
  get undecided() {
    return {
      description: 'user status undecided',
      before: main.panel.open,
      execute: async page => await status(page, label.status.undecided),
      test: async page => await util.visible(page, label.name.undecided),
    };
  },
  get confused() {
    return {
      description: 'user status confused',
      before: main.panel.open,
      execute: async page => await status(page, label.status.confused),
      test: async page => await util.visible(page, label.name.confused),
    };
  },
  get sad() {
    return {
      description: 'user status sad',
      before: main.panel.open,
      execute: async page => await status(page, label.status.sad),
      test: async page => await util.visible(page, label.name.sad),
    };
  },
  get happy() {
    return {
      description: 'user status happy',
      before: main.panel.open,
      execute: async page => await status(page, label.status.happy),
      test: async page => await util.visible(page, label.name.happy),
    };
  },
  get applaud() {
    return {
      description: 'user status applaud',
      before: main.panel.open,
      execute: async page => await status(page, label.status.applaud),
      test: async page => await util.visible(page, label.name.applaud),
    };
  },
  get up() {
    return {
      description: 'user status up',
      before: main.panel.open,
      execute: async page => await status(page, label.status.up),
      test: async page => await util.visible(page, label.name.up),
    };
  },
  get down() {
    return {
      description: 'user status down',
      before: main.panel.open,
      execute: async page => await status(page, label.status.down),
      test: async page => await util.visible(page, label.name.down),
    };
  },
  get clear() {
    return {
      description: 'user status clear',
      before: main.panel.open,
      execute: async page => {
        await util.click(page, label.name.me, true);
        await util.click(page, label.status.clear, true);
      },
      test: async page => await util.visible(page, label.name.clear),
    };
  },
  get present() {
    return {
      description: 'user present',
      before: main.panel.open,
      execute: async page => {
        await util.click(page, label.name.me, true);
        await util.click(page, label.present, true);
      },
      test: async page => await util.visible(page, label.name.presenter),
    };
  },
  get promote() {
    return {
      description: 'user promote',
      before: main.panel.open,
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
  get demote() {
    return {
      description: 'user demote',
      before: main.panel.open,
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
  get kick() {
    return {
      description: 'user kick',
      before: main.panel.open,
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  }
};

module.exports = {
  status: {
    away: async page => await perform(page, action.away),
    hand: async page => await perform(page, action.hand),
    undecided: async page => await perform(page, action.undecided),
    confused: async page => await perform(page, action.confused),
    sad: async page => await perform(page, action.sad),
    happy: async page => await perform(page, action.happy),
    applaud: async page => await perform(page, action.applaud),
    up: async page => await perform(page, action.up),
    down: async page => await perform(page, action.down),
    clear: async page => await perform(page, action.clear, true),
  },
  present: async page => await perform(page, action.present, true),
  promote: async page => await perform(page, action.promote),
  demote: async page => await perform(page, action.demote),
  kick: async page => await perform(page, action.kick),
};
