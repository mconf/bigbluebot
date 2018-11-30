# BigBlueBot

BigBlueButton bots

*I bot, I die, I bot again!*

## Requisites

A BigBlueButton server with `bbb-demo` installed

## Instructions

`git clone https://github.com/pedrobmarin/bigbluebot.git`

`npm install`

Set your BigBlueButton server URL as the `HOST` at `config.json`

Customize `ìndex.js`

```js
const action = require('./lib/action.js')
const run = require('./lib/run.js')

let actions = async (page, id) => {
  await action.audio.microphone(page)
}

run(actions)
```

```js
const action = require('./lib/action.js')
const run = require('./lib/run.js')

let actions = async (page, id) => {
  await action.audio.listen(page)
}

run(actions)
```

```js
const action = require('./lib/action.js')
const run = require('./lib/run.js')

let actions = async (page, id) => {
  await action.audio.close(page)
  // Using puppeteer with Chromium (our default case here) you will need to
  // configure bbb-webrtc-sfu to use VP8 instead of H.264
  await action.video.join(page)
}

run(actions)
```
