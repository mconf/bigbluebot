const logger = require('./logger');

// TODO: Better handle braces
const aria = label => {
  const opening = label.indexOf('{');
  if (opening === -1) {
    return `[aria-label^="${label}"]`;
  } else {
    if (opening !== 0) {
      return `[aria-label^="${label.slice(0, opening - 1)}"]`;
    }
    const closing = label.indexOf('}');

    return `[aria-label$="${label.slice(closing, label.length)}"]`;
  }
};

const compose = (label, params) => {
  let composition = label;
  params.forEach((param, index) => {
    composition = composition.replace(`{${index}}`, param);
  });

  return composition;
};

const getLabel = (element) => {
  if (element && element.label) return element.label;

  return element;
};

const getParams = (element) => {
  if (element && element.params) return element.params;

  return [];
};

const localize = (locale, element) => {
  const label = getLabel(element);
  const params = getParams(element);

  let localization;
  if (locale && locale[label]) {
    localization = compose(locale[label], params);
  } else {
    logger.error(`Missing label ${label}=${locale[label]}`);
    localization = label;
  }

  return localization;
};

module.exports = {
  get: (locale, element) => {
    const localization = localize(locale, element);
    const selector = aria(localization);

    return selector;
  },
  localize,
};
