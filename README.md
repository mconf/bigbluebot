# BigBlueBot

BigBlueButton bots

## Requirements

A BigBlueButton server with `bbb-demo` installed or setting the server API secret

## Instructions

**IMPORTANT**: do not run this lib with `root` privileges

`npm i bigbluebot`

`cp node_modules/bigbluebot/.env.template .env`

### Set your environment variables

At the `.env` file you just copied, set:

 - your BigBlueButton server URL
```
BIGBLUEBOT_HOST=https://your.bigbluebutton.server
```
 - [optional] room meetingID
```
BIGBLUEBOT_ROOM=yourbigbluebuttonroomidentifier
```
If you would like the bots to join an existing room, you may fill
out the password variables and use the `meetingID` value as `BIGBLUEBOT_ROOM`
To find out these data, you may call the `getMeetings` route of your BBB
instance as described [here](https://docs.bigbluebutton.org/dev/api.html#getmeetings).

Attention: this is NOT the room ID of a room made bei Greenlight! If you want to join an existing room
(this is good and impressive for watching the test in headless mode), use the next option.
 - [optional] room name
```
BIGBLUEBOT_NAME=yourbigbluebuttonroomname
```
If you want to join a preexisting room, then use this option. YOU HAVE TO PROVIDE the serverAPI secret
to work with this. When you give the (hopefully) unique room name and the server secret then all
other credentials are extracted from the `getMeetings` route of the BBB instance.
Here you can join any room only by knowing his meetingName.
 - [optional] the `attendeePW` and `moderatorPW` as shown in getMeetings
```
BIGBLUEBOT_ATTENDEE_PW=yourattendeepassword
BIGBLUEBOT_MODERATOR_PW=yourmoderatorpassword
```
 - [optional] your BigBlueButton server API secret
```
BIGBLUEBOT_SECRET=yourbigbluebuttonsecret
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
 - [optional] log level
```
BIGBLUEBOT_LOG=info
```

### Make a run script

Create your script, e.g. `run.js`:

Join audio with microphone

```js
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.audio.modal.microphone(page);
};

bigbluebot.run(actions);
```

Join audio as a listener

```js
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.audio.modal.listen(page);
};

bigbluebot.run(actions);
```

Join video

```js
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.video.join(page);
};

bigbluebot.run(actions);
```

Write in chat

```js
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.chat.send(page);
};

bigbluebot.run(actions);
```

#### Runtime options

You can pass options as a run parameter

```js
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.audio.modal.microphone(page);
  await bigbluebot.video.join(page);
  await bigbluebot.chat.send(page);
};

const options = {
  host: 'https://your.bigbluebutton.server',
  secret: 'yourbigbluebuttonsecret',
  room: 'yourbigbluebuttonroomidentifier',
  password: {
    moderator: 'yourmoderatorpassword',
    attendee: 'yourattendeepassword',
  },
  moderator: true OR false,
};

bigbluebot.run(actions, options);
```

### Run your script

`node run.js`
