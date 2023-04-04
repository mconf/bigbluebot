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

const datatest = code => {
  const opening = code.indexOf('{');
  if (opening === -1) {
    return `[data-test^="${code}"]`;
  } else {
    if (opening !== 0) {
      return `[data-test^="${code.slice(0, opening - 1)}"]`;
    }
    const closing = code.indexOf('}');

    return `[data-test$="${code.slice(closing, code.length)}"]`;
  }
}

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
    logger.error(`Missing label ${locale[label]}`);
  }

  return localization;
};

module.exports = {
  get: (locale, element) => {
    const hasDatatest = Boolean(element.datatest);
    const hasAria = Boolean(element.aria);

    let ariaSelector;
    if (hasAria) {
      const localization = localize(locale, element.aria);
      ariaSelector = aria(localization);
    }

    return {
      ...( hasDatatest ? { main: datatest(element.datatest) } : { main: ariaSelector }),
      ...( hasAria && hasDatatest &&  { fallback: ariaSelector }),
    };
  },
  localize,
};
