/**
 * @name Logger
 *
 * @desc Log execution flow in console
 */

const config = require('../config/config.json')
const enabled = config.logger.enabled
const debug = enabled && config.logger.level.toLowerCase() == 'debug'

const red = '\x1b[31m%s\x1b[0m'
const green = '\x1b[32m%s\x1b[0m'
const yellow = '\x1b[33m%s\x1b[0m'
const blue = '\x1b[34m%s\x1b[0m'

module.exports = {
  info: (...messages) => {
    if (enabled) {
      console.log('INFO', ...messages)
    }
  },
  warn: (...messages) => {
    if (debug) {
      console.log(yellow, 'WARN', ...messages)
    }
  },
  debug: (...messages) => {
    if (debug) {
      console.log(blue, 'DEBUG', ...messages)
    }
  },
  error: (...messages) => {
    console.log(red, 'ERROR', ...messages)
  },
  test: {
    pass: (...messages) => {
      console.log(green, 'PASS', ...messages)
    },
    fail: (...messages) => {
      console.log(red, 'FAIL', ...messages)
    }
  }
}
