/**
 * @name User
 *
 * @desc Collection of bot user actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const main = require('./main.js')

const user = conf.label.user

const status = async (page, emoji) => {
  await util.click(page, user.name.me, true)
  await util.click(page, user.status.open, true)
  await util.click(page, emoji, true)
}

const action = {
  get away() {
    return {
      description: 'user status away',
      before: main.panel.open,
      execute: async page => await status(page, user.status.away),
      test: async page => await util.visible(page, user.name.away)
    }
  },
  get hand() {
    return {
      description: 'user status hand',
      before: main.panel.open,
      execute: async page => await status(page, user.status.hand),
      test: async page => await util.visible(page, user.name.hand)
    }
  },
  get undecided() {
    return {
      description: 'user status undecided',
      before: main.panel.open,
      execute: async page => await status(page, user.status.undecided),
      test: async page => await util.visible(page, user.name.undecided)
    }
  },
  get confused() {
    return {
      description: 'user status confused',
      before: main.panel.open,
      execute: async page => await status(page, user.status.confused),
      test: async page => await util.visible(page, user.name.confused)
    }
  },
  get sad() {
    return {
      description: 'user status sad',
      before: main.panel.open,
      execute: async page => await status(page, user.status.sad),
      test: async page => await util.visible(page, user.name.sad)
    }
  },
  get happy() {
    return {
      description: 'user status happy',
      before: main.panel.open,
      execute: async page => await status(page, user.status.happy),
      test: async page => await util.visible(page, user.name.happy)
    }
  },
  get applaud() {
    return {
      description: 'user status applaud',
      before: main.panel.open,
      execute: async page => await status(page, user.status.applaud),
      test: async page => await util.visible(page, user.name.applaud)
    }
  },
  get up() {
    return {
      description: 'user status up',
      before: main.panel.open,
      execute: async page => await status(page, user.status.up),
      test: async page => await util.visible(page, user.name.up)
    }
  },
  get down() {
    return {
      description: 'user status down',
      before: main.panel.open,
      execute: async page => await status(page, user.status.down),
      test: async page => await util.visible(page, user.name.down)
    }
  },
  get clear() {
    return {
      description: 'user status clear',
      before: main.panel.open,
      execute: async page => {
        await util.click(page, user.name.me, true)
        await util.click(page, user.status.clear, true)
      },
      test: async page => await util.visible(page, user.name.clear)
    }
  },
  get present() {
    return {
      description: 'user present',
      before: main.panel.open,
      execute: async page => {
        await util.click(page, user.name.me, true)
        await util.click(page, user.present, true)
      },
      test: async page => await util.visible(page, user.name.presenter)
    }
  },
  get promote() {
    return {
      description: 'user promote',
      before: main.panel.open,
      execute: async page => {},
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get demote() {
    return {
      description: 'user demote',
      before: main.panel.open,
      execute: async page => {},
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get kick() {
    return {
      description: 'user kick',
      before: main.panel.open,
      execute: async page => {},
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  }
}

module.exports = {
  status: {
    away: async page => {
      await perform(page, action.away)
    },
    hand: async page => {
      await perform(page, action.hand)
    },
    undecided: async page => {
      await perform(page, action.undecided)
    },
    confused: async page => {
      await perform(page, action.confused)
    },
    sad: async page => {
      await perform(page, action.sad)
    },
    happy: async page => {
      await perform(page, action.happy)
    },
    applaud: async page => {
      await perform(page, action.applaud)
    },
    up: async page => {
      await perform(page, action.up)
    },
    down: async page => {
      await perform(page, action.down)
    },
    clear: async page => {
      await perform(page, action.clear, true)
    }
  },
  present: async page => {
    await perform(page, action.present, true)
  },
  promote: async page => {
    await perform(page, action.promote)
  },
  demote: async page => {
    await perform(page, action.demote)
  },
  kick: async page => {
    await perform(page, action.kick)
  }
}
