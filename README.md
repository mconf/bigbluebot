# BigBlueBot

BigBlueButton bots

## Requisites

A BigBlueButton server with `bbb-demo` installed or setting the server API secret

## Instructions

`npm i bigbluebot`

`cp node_modules/bigbluebot/.env.template .env`

At the `.env` file you just copied, set:

 - your BigBlueButton server URL
```
BIGBLUEBOT_HOST=https://your.bigbluebutton.server
```
 - [optional] room name
```
BIGBLUEBOT_ROOM=Demo Meeting
```
 - [optional] your BigBlueButton server API secret
```
BIGBLUEBOT_SECRET=moOBbUYPva5olDhDj8Lp6+V7URBZKCRn
```
 - [optional] number of bots to join the room
```
BIGBLUEBOT_BOTS=1
```
 - [optional] time (milliseconds) between bots to join
```
BIGBLUEBOT_WAIT=2000
```
 - [optional] time (milliseconds) of a bot life span
```
BIGBLUEBOT_LIFE=60000
```
 - [optional] external browser to be used
```
BIGBLUEBOT_BROWSER=/path/to/your/browser
```
 - [optional] number of browser processes
```
BIGBLUEBOT_POOL=1
```
 - [optional] endpoint browser websocket to be used
```
BIGBLUEBOT_ENDPOINT=wss://your.browser.websocket
```
 - [optional] endpoint authentication token
```
BIGBLUEBOT_TOKEN=yourauthenticationtoken
```

Create your script, e.g. `run.js`:

Join audio with microphone

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.modal.microphone(page)
}

bigbluebot.run(actions)
```

Join audio as a listener

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.modal.listen(page)
}

bigbluebot.run(actions)
```

Join video

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  // H.264 users must use an external Chrome instance
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
```

Write in chat

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.chat.send(page)
}

bigbluebot.run(actions)
```

`node run.js`
