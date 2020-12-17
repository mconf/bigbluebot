const sha1 = require('crypto-js/sha1');
const conf = require('./conf');
const logger = require('./logger');

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

const getPassword = (role, options) => {
  return options.password && options.password[role] ?
    options.password[role] : config.api.password[role];
};

const getURL = (action, params, options) => {
  const query = buildQuery(params);
  const checksum = calculateChecksum(action, query, options);
  const host = options.host || config.url.host;
  const api = config.api.path;
  const url = `${host}/${api}/${action}?${query}&checksum=${checksum}`;

  logger.debug(url);
  return url;
};

const calculateChecksum = (action, query, options) => {
  const secret = options.secret || config.api.secret;
  const checksum = sha1(action + query + secret);

  return checksum
};

const getCreateURL = (options) => {
  const params = {
    meetingID: options.room || config.url.meeting.room,
    record: true,
    moderatorPW: getPassword('moderator', options),
    attendeePW: getPassword('attendee', options),
  };

  return getURL('create', params, options);
};

const getEndURL = (options) => {
  const params = {
    meetingID: options.room || config.url.meeting.room,
    password: getPassword('moderator', options),
  };

  return getURL('end', params, options);
};

const getJoinURL = (username, options) => {
  let password = getPassword('attendee', options);
  if (options.moderator !== undefined ? options.moderator : config.url.moderator.value) {
    password = getPassword('moderator', options);
  }

  const params = {
    meetingID: options.room || config.url.meeting.room,
    fullName: username,
    password: password,
  };

  return getURL('join', params, options);
};

const getMeetingsURL = (options) => {
  return getURL('getMeetings', {}, options);
};

module.exports = {
  getCreateURL,
  getEndURL,
  getJoinURL,
  getMeetingsURL,
};
