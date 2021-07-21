const axios = require('axios');
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

const getUserdata = (options) => options.userdata ? { ...config.bot.userdata, ...options.userdata } : config.bot.userdata;

const isModerator = (options) => options.moderator !== undefined ? options.moderator : config.url.moderator.value;

const getHost = (options) => options.host || config.url.host;

const getSecret = (options) => options.secret || config.api.secret;

const getMeetingID = (options) => options.room || config.url.meeting.name;

const getVersion = (options) => options.version || config.url.version;

const getPassword = (role, options) => {
  return options.password && options.password[role] ?
    options.password[role] : config.api.password[role];
};

const getURL = (action, params, options) => {
  const query = buildQuery(params);
  const checksum = calculateChecksum(action, query, options);
  const host = getHost(options);
  const api = config.api.path;
  const url = `${host}/${api}/${action}?${query}&checksum=${checksum}`;

  return url;
};

const calculateChecksum = (action, query, options) => {
  const secret = getSecret(options);
  const checksum = sha1(action + query + secret);

  return checksum;
};

const getCreateURL = (options) => {
  const params = {
    meetingID: getMeetingID(options),
    record: true,
    moderatorPW: getPassword('moderator', options),
    attendeePW: getPassword('attendee', options),
  };

  return getURL('create', params, options);
};

const getEndURL = (options) => {
  const params = {
    meetingID: getMeetingID(options),
    password: getPassword('moderator', options),
  };

  return getURL('end', params, options);
};

const getJoinURL = (username, options) => {
  const params = {
    meetingID: getMeetingID(options),
    fullName: username,
    password: isModerator(options) ? getPassword('moderator', options) : getPassword('attendee', options),
    ...getUserdata(options),
  };

  return getURL('join', params, options);
};

const call = async (url) => {
  let data = null;
  await axios.get(url).then(response => {
    if (response.data.response && response.data.response.returncode === 'FAILED') {
      const { messageKey, message } = response.data.response;
      logger.error(`${messageKey}: ${message}`);
    } else {
      data = response.data;
    }
  }).catch(error => {
    logger.error(error);
  });

  return data;
};

const create = async (options) => {
  const url = getCreateURL(options);
  const data = await call(url);

  return data;
};

const end = async (options) => {
  const url = getEndURL(options);
  const data = await call(url);

  return data;
};

module.exports = {
  create,
  end,
  getHost,
  getMeetingID,
  getVersion,
  getJoinURL,
};
