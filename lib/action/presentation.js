/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const presentation = conf.label.presentation

const evaluate = {
  upload: {
    description: 'upload presentation',
    test: async page => true
  },
  change: {
    description: 'change presentation',
    test: async page => true
  },
  next: {
    description: 'next slide',
    test: async page => true
  },
  previous: {
    description: 'previous slide',
    test: async page => true
  },
  fit: {
    description: 'slide fit to width',
    test: async page => true
  },
  in: {
    description: 'slide zoom in',
    test: async page => true
  },
  out: {
    description: 'slide zoom out',
    test: async page => true
  }
}

module.exports = {
  upload: async page => {
    await util.test(page, evaluate.upload)
  },
  change: async page => {
    await util.test(page, evaluate.change)
  },
  next: async page => {
    await util.click(page, presentation.slide.next, true)
    await util.test(page, evaluate.next)
  },
  previous: async page => {
    await util.click(page, presentation.slide.previous, true)
    await util.test(page, evaluate.previous)
  },
  fit: async page => {
    await util.click(page, presentation.fit, true)
    await util.test(page, evaluate.fit)
  },
  in: async page => {
    await util.click(page, presentation.zoom.in)
    await util.test(page, evaluate.in)
  },
  out: async page => {
    await util.click(page, presentation.zoom.out)
    await util.test(page, evaluate.out)
  }
}
