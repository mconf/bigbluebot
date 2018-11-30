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
    await util.test(page, evaluate.next)
  },
  previous: async page => {
    await util.test(page, evaluate.previous)
  }
}
