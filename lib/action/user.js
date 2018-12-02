/**
 * @name User
 *
 * @desc Collection of bot user actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')

const user = conf.label.user

const status = async (page, emoji) => {
  await util.click(page, user.name.me, true)
  await util.click(page, user.status.open, true)
  await util.click(page, emoji, true)
}

const action = {
  status: {
    away: {
      description: 'user away status',
      execute: async page => await status(page, user.status.away),
      test: async page => await util.visible(page, user.name.away)
    },
    hand: {
      description: 'user raise hand status',
      execute: async page => await status(page, user.status.hand),
      test: async page => await util.visible(page, user.name.hand)
    },
    undecided: {
      description: 'user undecided status',
      execute: async page => await status(page, user.status.undecided),
      test: async page => await util.visible(page, user.name.undecided)
    },
    confused: {
      description: 'user confused status',
      execute: async page => await status(page, user.status.confused),
      test: async page => await util.visible(page, user.name.confused)
    },
    sad: {
      description: 'user sad status',
      execute: async page => await status(page, user.status.sad),
      test: async page => await util.visible(page, user.name.sad)
    },
    happy: {
      description: 'user happy status',
      execute: async page => await status(page, user.status.happy),
      test: async page => await util.visible(page, user.name.happy)
    },
    applaud: {
      description: 'user applaud status',
      execute: async page => await status(page, user.status.applaud),
      test: async page => await util.visible(page, user.name.applaud)
    },
    up: {
      description: 'user thumbs up status',
      execute: async page => await status(page, user.status.up),
      test: async page => await util.visible(page, user.name.up)
    },
    down: {
      description: 'user thumbs down status',
      execute: async page => await status(page, user.status.down),
      test: async page => await util.visible(page, user.name.down)
    },
    clear: {
      description: 'clear user status',
      execute: async page => {
        await util.click(page, user.name.me, true)
        await util.click(page, user.status.clear, true)
      },
      test: async page => await util.visible(page, user.name.clear)
    }
  },
  present: {
    description: 'set presenter',
    execute: async page => {
      await util.click(page, user.name.me, true)
      await util.click(page, user.present, true)
    },
    test: async page => await util.visible(page, user.name.presenter)
  },
  promote: {
    description: 'promote user',
    execute: async page => {},
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  demote: {
    description: 'demote user',
    execute: async page => {},
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  kick: {
    description: 'kick user',
    execute: async page => {},
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  status: {
    away: async page => {
      await perform(page, action.status.away)
    },
    hand: async page => {
      await perform(page, action.status.hand)
    },
    undecided: async page => {
      await perform(page, action.status.undecided)
    },
    confused: async page => {
      await perform(page, action.status.confused)
    },
    sad: async page => {
      await perform(page, action.status.sad)
    },
    happy: async page => {
      await perform(page, action.status.happy)
    },
    applaud: async page => {
      await perform(page, action.status.applaud)
    },
    up: async page => {
      await perform(page, action.status.up)
    },
    down: async page => {
      await perform(page, action.status.down)
    },
    clear: async page => {
      await perform(page, action.status.clear, true)
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
