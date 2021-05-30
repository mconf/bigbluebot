const axios = require('axios');
const conf = require('./conf');
const logger = require('./logger');

const { config } = conf;

module.exports = {
  get: async (options) => {
    const { lang } = config.browser;
    logger.info(`Fetching ${lang} locale`);
    const host = options.host || config.url.host;
    const version = options.version || config.url.version;
    const client = `${host}/${config.url.basename}`;
    const url = `${client}/locale?locale=${lang}`;
    let locale;
    await axios.get(url).then(async response => {
      switch (version) {
        case '2.2':
          const { messages } = response.data;
          if (messages) {
            locale = messages;
          } else {
            logger.error(`Missing locale messages`);
          }
          break;
        case '2.3':
          const { normalizedLocale } = response.data;
          const json = `${client}/locales/${normalizedLocale}.json`;
          await axios.get(json).then(response => {
            locale = response.data;
          }).catch(error => {
            logger.error(error);
          });
          break;
        default:
          logger.error(`Invalid BigBlueButton's server version: ${version}`);
      }
    }).catch(error => {
      logger.error(error);
    });

    return locale;
  },
};
