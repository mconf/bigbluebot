/**
 * @name Logger
 *
 * @desc Log execution flow in console
 */

const config = require('../config/config.json')
const enabled = config.logger.enabled
const debug = enabled && config.logger.level.toLowerCase() == 'debug'

const tab = '\t'

const red = '\x1b[31m%s\x1b[0m'
const green = '\x1b[32m%s\x1b[0m'
const yellow = '\x1b[33m%s\x1b[0m'
const blue = '\x1b[34m%s\x1b[0m'

module.exports = {
  info: (...messages) => {
    if (enabled) {
      console.log('INFO', tab, ...messages)
    }
  },
  warn: (...messages) => {
    if (debug) {
      console.log(yellow, 'WARN', tab, ...messages)
    }
  },
  debug: (...messages) => {
    if (debug) {
      console.log(blue, 'DEBUG', tab, ...messages)
    }
  },
  error: (...messages) => {
    console.log(red, 'ERROR', tab, ...messages)
  },
  test: {
    pass: (...messages) => {
      console.log(green, 'PASS', tab, ...messages)
    },
    fail: (...messages) => {
      console.log(red, 'FAIL', tab, ...messages)
    }
  }
}
