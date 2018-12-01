/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')

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
  next: {
    description: 'next slide',
    execute: async page => await util.click(page, presentation.slide.next, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  previous: {
    description: 'previous slide',
    execute: async page => await util.click(page, presentation.slide.previous, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  fit: {
    description: 'slide fit to width',
    execute: async page => await util.click(page, presentation.fit, true),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  in: {
    description: 'slide zoom in',
    execute: async page => await util.click(page, presentation.zoom.in),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  out: {
    description: 'slide zoom out',
    execute: async page => await util.click(page, presentation.zoom.out),
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
  next: async page => {
    await perform(page, action.next)
  },
  previous: async page => {
    await perform(page, action.previous)
  },
  fit: async page => {
    await perform(page, action.fit)
  },
  in: async page => {
    await perform(page, action.in)
  },
  out: async page => {
    await perform(page, action.out)
  }
}
