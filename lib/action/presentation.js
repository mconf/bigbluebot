/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const presentation = conf.label.presentation

const action = {
  upload: {
    description: 'upload presentation',
    execute: async page => {
      // TODO: interface actions
    },
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  change: {
    description: 'change presentation',
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
      description: 'next slide',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.slide.next, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    previous: {
      description: 'previous slide',
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
      description: 'slide zoom in',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.zoom.in),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    out: {
      description: 'slide zoom out',
      before: audio.dialog.close,
      execute: async page => await util.click(page, presentation.zoom.out),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  fit: {
    description: 'slide fit to width',
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
