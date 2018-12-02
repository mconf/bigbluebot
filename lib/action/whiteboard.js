/**
 * @name Whiteboard
 *
 * @desc Collection of bot whiteboard actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const user = require('./user.js')

const whiteboard = conf.label.whiteboard
const data = conf.config.data

const point = box => ({ x: box.x + (Math.random() * box.width), y: box.y + (Math.random() * box.height) })
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
const steps = (a, b) => Math.floor(distance(a, b) / data.whiteboard.distance)
const color = () => util.random(whiteboard.colors.palette)
const thickness = () => util.random(whiteboard.thickness.sizes)

const paint = async page => {
  await util.click(page, whiteboard.colors.open, true)
  await util.click(page, color(), true)
}

const brush = async page => {
  await util.click(page, whiteboard.thickness.open, true)
  await util.click(page, thickness(), true)
}

const draw = async (page, tool, points = 2) => {
  await util.click(page, whiteboard.tools.open, true)
  await util.click(page, tool, true)
  await paint(page)
  await brush(page)

  const board = await page.$(whiteboard.board)
  const box = await board.boundingBox()

  let a = point(box)
  await page.mouse.move(a.x, a.y)
  await page.mouse.down()
  for (let i = 1; i < points; i++) {
    let b = point(box)
    await page.mouse.move(b.x, b.y, { steps: steps(a, b) })
    a = b
  }
  await page.mouse.up()
}

const action = {
  tools: {
    text: {
      description: 'write textual annotation',
      before: user.present,
      execute: async page => {
        // TODO: interface actions
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    line: {
      description: 'draw linear annotation',
      before: user.present,
      execute: async page => await draw(page, whiteboard.tools.line),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    ellipse: {
      description: 'draw elliptical annotation',
      before: user.present,
      execute: async page => await draw(page, whiteboard.tools.ellipse),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    triangle: {
      description: 'draw triangular annotation',
      before: user.present,
      execute: async page => await draw(page, whiteboard.tools.triangle),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    rectangle: {
      description: 'draw rectangular annotation',
      before: user.present,
      execute: async page => await draw(page, whiteboard.tools.rectangle),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    pencil: {
      description: 'draw pencil annotation',
      before: user.present,
      execute: async page => {
        const points = data.whiteboard.pencil.points
        await draw(page, whiteboard.tools.pencil, points)
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  undo: {
    description: 'undo annotation',
    before: user.present,
    execute: async page => await util.click(page, whiteboard.undo),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  },
  clear: {
    description: 'clear annotations',
    before: user.present,
    execute: async page => await util.click(page, whiteboard.clear),
    test: async page => {
      // TODO: evaluation test
      return true
    }
  }
}

module.exports = {
  tools: {
    text: async page => {
      await perform(page, action.tools.text)
    },
    line: async page => {
      await perform(page, action.tools.line)
    },
    ellipse: async page => {
      await perform(page, action.tools.ellipse)
    },
    triangle: async page => {
      await perform(page, action.tools.triangle)
    },
    rectangle: async page => {
      await perform(page, action.tools.rectangle)
    },
    pencil: async page => {
      await perform(page, action.tools.pencil)
    }
  },
  undo: async page => {
    await perform(page, action.undo)
  },
  clear: async page => {
    await perform(page, action.clear)
  }
}
