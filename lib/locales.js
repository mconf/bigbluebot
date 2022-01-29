const axios = require('axios');
const conf = require('./conf');
const logger = require('./logger');
const api = require('./api');

const DEFAULT_LANGUAGE = 'en';

const { config } = conf;

const fetchLocale = async (client) => {
  const { lang } = config.browser;
  logger.info(`Fetching ${lang} locale`);
  const url = `${client}/locale?locale=${lang}`;

  return axios.get(url);
};

const fetchLocaleJSON = async (client, locale) => {
  const json = `${client}/locales/${locale}.json`;
  let data = {};
  await axios.get(json).then(response => {
    if (response.status === 200) data = response.data;
    else logger.error(`Could not fetch ${json} data`);
  }).catch(error => {
    logger.error(error);
  });

  return data;
};

const fetchFallbackLocale = async (client) => {
  logger.debug(`Fetching ${DEFAULT_LANGUAGE} fallback locale`);
  const fallback = await fetchLocaleJSON(client, DEFAULT_LANGUAGE);

  return fallback;
};

const fetchRegionLocale = async (client, locale) => {
  let region = {};

  if (locale) {
    logger.debug(`Fetching ${locale} region locale`);
    region = await fetchLocaleJSON(client, locale);
  }

  return region;
};

const fetchNormalizedLocale = async (client, locale) => {
  let normalized = {};

  if (locale) {
    logger.debug(`Fetching ${locale} normalized locale`);
    normalized = await fetchLocaleJSON(client, locale);
  }

  return normalized;
};

const mergeLocales = (...locales) => {
  let data = {};
  for (const index in locales) {
    data = Object.assign(data, locales[index]);
  }

  return data;
};

module.exports = {
  get: async (options) => {
    const host = api.getHost(options);
    const client = `${host}/${config.url.basename}`;
    let locale = {};
    await fetchLocale(client).then(async response => {
      const version = api.getVersion(options);
      switch (version) {
        case '2.3':
        case '2.4':
          const {
            normalizedLocale,
            regionDefaultLocale,
          } = response.data;

          const fallback = await fetchFallbackLocale(client);
          const region = await fetchRegionLocale(client, regionDefaultLocale);
          const normalized = await fetchNormalizedLocale(client, normalizedLocale);
          locale = mergeLocales(fallback, region, normalized);
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
