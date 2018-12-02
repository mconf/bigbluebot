/**
 * @name Util
 *
 * @desc Collection of common functions
 */

const conf = require('./conf.js')
const logger = require('./logger.js')

const config = conf.config
const label = conf.label
const timeout = config.timeout

const delay = async time => new Promise(resolve => setTimeout(resolve, time))
const timestamp = () => Math.floor(new Date() / 1000)
const random = (collection) => collection[Math.floor(Math.random() * collection.length)]

const url = (username) => {
  const user = config.url.userTag + encodeURI(username)
  const moderator = config.url.moderatorTag + config.url.moderator
  const meeting = config.url.meetingTag + encodeURI(config.url.meeting)
  return config.url.host + config.url.demo + user + moderator + meeting
}

const once = async (page, event, callback) => {
  return new Promise((resolve, reject) => {
    let fired = false
    setTimeout(() => {
      if (!fired) reject('Event listener timeout: ' + event)
    }, timeout.selector)
    const handler = () => {
      fired = true
      callback()
    }
    page.once(event, handler)
  })
}

module.exports = {
  delay: delay,
  random: random,
  join: async (page, id) => {
    const username = random(config.url.user)
    logger.debug('join', config.url.host, 'at', config.url.meeting,'as', username)
    await page.goto(url(username))
    await page.waitForSelector(label.audio.dialog.modal, { timeout: timeout.selector })
    await delay(config.delay.animation)
    return username
  },
  click: async (page, element, animation = false) => {
    logger.debug('click', element)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
    if (animation) await delay(config.delay.animation)
  },
  type: async (page, element, text, animation = false) => {
    logger.debug('type', text, 'in', element)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
    if (animation) await delay(config.delay.animation)
  },
  write: async (page, element, text) => {
    logger.debug('write', text, 'in', element)
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text, { delay: config.delay.type })
  },
  screenshot: async page => {
    if (config.screenshot.enabled) {
      await page.screenshot({ path: config.screenshot.path + timestamp() + '.png' })
    }
  },
  frame: async (page, name, relief = false) => {
    if (relief) await delay(config.delay.relief)
    return new Promise((resolve, reject) => {
      const check = () => {
        const frame = page.frames().find(f => f.name() === name)
        if (frame) resolve(frame)
        once(page, 'framenavigated', check).catch(error => reject(error))
      }
      check()
    })
  },
  visible: async (page, element) => {
    let visible
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => {
        logger.debug(element, 'is visible')
        visible = true
      })
      .catch(() => {
        logger.warn(element, 'is not visible')
        visible = false
      })
    return visible
  },
  hidden: async (page, element) => {
    let hidden
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => {
        logger.warn(element, 'is not hidden')
        hidden = false
      })
      .catch(() => {
        logger.debug(element, 'is hidden')
        hidden = true
      })
    return hidden
  }
}
