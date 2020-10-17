const bigbluebot = require('./index.js');

const actions = async page => {
  await bigbluebot.audio.modal.microphone(page);
  await bigbluebot.video.join(page);
  await bigbluebot.chat.send(page);
};

bigbluebot.run(actions);
