const sha1 = require('crypto-js/sha1');
const conf = require('./conf');

const { config } = conf;

const buildQuery = params => {
  let keys = [];
  for (property in params) keys.push(property);
  keys = keys.sort();

  let list = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = params[key];
    if (params.hasOwnProperty(key)) {
      list.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  let query = '';
  if (list.length > 0) query = list.join('&');

  return query;
};

const getURL = (action, params, options) => {
  const query = buildQuery(params);
  const checksum = calculateChecksum(action, query, options);
  const host = options.host || config.url.host;
  const api = config.api.path;
  const url = `${host}/${api}/${action}?${query}&checksum=${checksum}`;

  return url;
};

const calculateChecksum = (action, query, options) => {
  const secret = options.secret || config.api.secret;
  const checksum = sha1(action + query + secret);

  return checksum
};

const getCreateURL = (options) => {
  const params = {
    meetingID: options.room || config.url.meeting.name,
    record: true,
    moderatorPW: options.password.moderator || config.api.password.moderator,
    attendeePW: options.password.attendee || config.api.password.attendee,
  };

  return getURL('create', params, options);
};

const getEndURL = (options) => {
  const params = {
    meetingID: options.room || config.url.meeting.name,
    password: options.password.moderator || config.api.password.moderator,
  };

  return getURL('end', params, options);
};

const getJoinURL = (username, options) => {
  let password = options.password.attendee || config.api.password.attendee;
  if (options.moderator !== undefined ? options.moderator : config.url.moderator.value) {
    password = options.password.moderator || config.api.password.moderator;
  }

  const params = {
    meetingID: options.room || config.url.meeting.name,
    fullName: username,
    password: password,
  };

  return getURL('join', params, options);
};

module.exports = {
  getCreateURL,
  getEndURL,
  getJoinURL,
};
