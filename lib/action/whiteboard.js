/**
 * @name Whiteboard
 *
 * @desc Collection of bot whiteboard actions
 */

const conf = require('../conf.js')
const util = require('../util.js')

const whiteboard = conf.label.whiteboard
const data = conf.config.data

const point = box => ({ x: box.x + (Math.random() * box.width), y: box.y + (Math.random() * box.height) })
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
const steps = (a, b) => Math.floor(distance(a, b) / data.whiteboard.distance)
const random = (collection) => collection[Math.floor(Math.random() * collection.length)]
const color = () => random(whiteboard.colors.palette)
const thickness = () => random(whiteboard.thickness.sizes)

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

const evaluate = {
  text: {
    description: 'write textual annotation',
    test: async page => true
  },
  line: {
    description: 'draw linear annotation',
    test: async page => true
  },
  ellipse: {
    description: 'draw elliptical annotation',
    test: async page => true
  },
  triangle: {
    description: 'draw triangular annotation',
    test: async page => true
  },
  rectangle: {
    description: 'draw rectangular annotation',
    test: async page => true
  },
  pencil: {
    description: 'draw pencil annotation',
    test: async page => true
  },
  undo: {
    description: 'undo annotation',
    test: async page => true
  },
  clear: {
    description: 'clear annotations',
    test: async page => true
  }
}

module.exports = {
  text: async page => {
    await util.test(page, evaluate.text)
  },
  line: async page => {
    await draw(page, whiteboard.tools.line)
    await util.test(page, evaluate.line)
  },
  ellipse: async page => {
    await draw(page, whiteboard.tools.ellipse)
    await util.test(page, evaluate.ellipse)
  },
  triangle: async page => {
    await draw(page, whiteboard.tools.triangle)
    await util.test(page, evaluate.triangle)
  },
  rectangle: async page => {
    await draw(page, whiteboard.tools.rectangle)
    await util.test(page, evaluate.rectangle)
  },
  pencil: async page => {
    const points = data.whiteboard.pencil.points
    await draw(page, whiteboard.tools.pencil, points)
    await util.test(page, evaluate.pencil)
  },
  undo: async page => {
    await util.click(page, whiteboard.undo)
    await util.test(page, evaluate.undo)
  },
  clear: async page => {
    await util.click(page, whiteboard.clear)
    await util.test(page, evaluate.clear)
  }
}
