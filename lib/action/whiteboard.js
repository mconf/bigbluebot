const conf = require('../conf');
const util = require('../util');
const perform = require('./perform');
const user = require('./user');

const { whiteboard: label } = conf.label;
const { whiteboard: content } = conf.config.content;

const point = box => ({ x: box.x + (Math.random() * box.width), y: box.y + (Math.random() * box.height) });
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
const steps = (a, b) => Math.floor(distance(a, b) / content.distance);
const color = () => util.random(label.colors.palette);
const thickness = () => util.random(label.thickness.sizes);

const paint = async page => {
  await util.click(page, label.colors.open, true);
  await util.click(page, color(), true);
};

const brush = async page => {
  await util.click(page, label.thickness.open, true);
  await util.click(page, thickness(), true);
};

const draw = async (page, tool, points = 2) => {
  await util.click(page, label.tools.open, true);
  await util.click(page, tool, true);
  await paint(page);
  await brush(page);

  const board = await page.$(label.board);
  const box = await board.boundingBox();

  let a = point(box);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  for (let i = 1; i < points; i++) {
    let b = point(box);
    await page.mouse.move(b.x, b.y, { steps: steps(a, b) });
    a = b;
  }
  await page.mouse.up();
};

const action = {
  get text() {
    return {
      description: 'whiteboard tools text',
      before: user.present,
      execute: async page => {}, // TODO
      test: async page => true, // TODO
    };
  },
  get line() {
    return {
      description: 'whiteboard tools line',
      before: user.present,
      execute: async page => await draw(page, label.tools.line),
      test: async page => true, // TODO
    };
  },
  get ellipse() {
    return {
      description: 'whiteboard tools ellipse',
      before: user.present,
      execute: async page => await draw(page, label.tools.ellipse),
      test: async page => true, // TODO
    };
  },
  get triangle() {
    return {
      description: 'whiteboard tools triangle',
      before: user.present,
      execute: async page => await draw(page, label.tools.triangle),
      test: async page => true, // TODO
    };
  },
  get rectangle() {
    return {
      description: 'whiteboard tools rectangle',
      before: user.present,
      execute: async page => await draw(page, label.tools.rectangle),
      test: async page => true, // TODO
    };
  },
  get pencil() {
    return {
      description: 'whiteboard tools pencil',
      before: user.present,
      execute: async page => {
        const { points } = content.pencil;
        await draw(page, label.tools.pencil, points);
      },
      test: async page => true, // TODO
    };
  },
  get undo() {
    return {
      description: 'whiteboard undo',
      before: user.present,
      execute: async page => await util.click(page, label.undo),
      test: async page => true, // TODO
    };
  },
  get clear() {
    return {
      description: 'whiteboard clear',
      before: user.present,
      execute: async page => await util.click(page, label.clear),
      test: async page => true, // TODO
    };
  },
  get enable() {
    return {
      description: 'whiteboard multi enable',
      before: user.present,
      execute: async page => await util.click(page, label.multi.enable),
      test: async page => await util.visible(page, label.multi.disable),
    };
  },
  get disable() {
    return {
      description: 'whiteboard multi disable',
      before: user.present,
      execute: async page => await util.click(page, label.multi.disable),
      test: async page => await util.visible(page, label.multi.enable),
    };
  },
};

module.exports = {
  tools: {
    text: async page => await perform(page, action.tools.text),
    line: async page => await perform(page, action.tools.line),
    ellipse: async page => await perform(page, action.tools.ellipse),
    triangle: async page => await perform(page, action.tools.triangle),
    rectangle: async page => await perform(page, action.tools.rectangle),
    pencil: async page => await perform(page, action.tools.pencil),
  },
  undo: async page => await perform(page, action.undo),
  clear: async page => await perform(page, action.clear),
  multi: {
    enable: async page => await perform(page, action.multi.enable, true),
    disable: async page => await perform(page, action.multi.disable, true),
  },
};
