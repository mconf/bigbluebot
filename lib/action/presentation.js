/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const { presentation } = conf.label

const action = {
  upload: {
    description: 'presentation upload',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  change: {
    description: 'presentation change',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  slide: {
    next: {
      description: 'presentation slide next',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.slide.next, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    previous: {
      description: 'presentation slide previous',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.slide.previous, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  zoom: {
    in: {
      description: 'presentation zoom in',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.zoom.in),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    out: {
      description: 'presentation zoom out',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.zoom.out),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  fit: {
    description: 'presentation fit',
    before: audio.dialog.close,
    execute: async page => await util.click(page, presentation.fit, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  upload: async page => {
    await perform(page, action.upload)
  },
  change: async page => {
    await perform(page, action.change)
  },
  slide: {
    next: async page => {
      await perform(page, action.slide.next)
    },
    previous: async page => {
      await perform(page, action.slide.previous)
    }
  },
  zoom: {
    in: async page => {
      await perform(page, action.in)
    },
    out: async page => {
      await perform(page, action.out)
    }
  },
  fit: async page => {
    await perform(page, action.fit)
  }
}
