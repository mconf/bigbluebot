const sha1 = require('crypto-js/sha1')
const conf = require('./conf.js')

const { config } = conf

const buildQuery = params => {
  let keys = []
  for (property in params) keys.push(property)
  keys = keys.sort()

  let list = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = params[key]
    if (params.hasOwnProperty(key)) {
      list.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }

  let query = '';
  if (list.length > 0) query = list.join('&')

  return query
}

const getURL = (action, params) => {
  const query = buildQuery(params)
  const checksum = calculateChecksum(action, query)
  const host = config.url.host
  const api = config.api.path
  const url = `${host}/${api}/${action}?${query}&checksum=${checksum}`

  return url
}

const calculateChecksum = (action, query) => {
  const secret = config.api.secret
  const checksum = sha1(action + query + secret)

  return checksum
}

const getCreateURL = () => {
  const params = {
    meetingID: config.url.meeting.name,
    record: true,
    moderatorPW: config.api.password.moderator,
    attendeePW: config.api.password.attendee
  }

  return getURL('create', params)
}

const getJoinURL = username => {
  let password = config.api.password.attendee
  if (config.url.moderator.value) {
    password = config.api.password.moderator
  }

  const params = {
    meetingID: config.url.meeting.name,
    fullName: username,
    password: password
  }

  return getURL('join', params)
}

module.exports = {
  getCreateURL,
  getJoinURL
}
