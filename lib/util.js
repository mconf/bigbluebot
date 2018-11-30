/**
 * @name Util
 *
 * @desc Collection of common functions
 */

const conf = require('./conf.js')

const config = conf.config
const label = conf.label
const timeout = config.timeout

const delay = async time => new Promise(resolve => setTimeout(resolve, time))
const timestamp = () => Math.floor(new Date() / 1000)
const identify = (id, data) => ('0' + id).slice(-2) + ' - ' + data

const url = id => {
  const username = identify(id, config.url.user)
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
  identify: identify,
  delay: delay,
  join: async (page, id) => {
    await page.goto(url(id))
    await page.waitForSelector(label.audio.dialog.modal, { timeout: timeout.selector })
    await delay(config.delay.animation)
  },
  click: async (page, element, animation = false) => {
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.click(element)
    if (animation) await delay(config.delay.animation)
  },
  type: async (page, element, text, animation = false) => {
    await page.waitForSelector(element, { timeout: timeout.selector })
    await page.type(element, text)
    if (animation) await delay(config.delay.animation)
  },
  write: async (page, element, text) => {
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
  test: async (page, evaluate) => {
    if (config.test.enabled) {
      await delay(config.delay.relief)
      const accepted = await evaluate.test(page)
      if (accepted) {
        console.log('\x1b[32m%s\x1b[0m', 'PASS', evaluate.description)
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'FAIL', evaluate.description)
        let filename = evaluate.description + ' - ' + timestamp() + '.png'
        await page.screenshot({ path: config.screenshot.path + filename })
      }
    }
  },
  visible: async (page, element) => {
    let visible
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => visible = true)
      .catch(() => visible = false)
    return visible
  },
  hidden: async (page, element) => {
    let hidden
    await page.waitForSelector(element, { timeout: config.delay.relief })
      .then(() => hidden = false)
      .catch(() => hidden = true)
    return hidden
  }
}
