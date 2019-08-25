const Sentry = require('@sentry/node');
const { forEach } = require('lodash');

const throwError = (err, data = {}, tags = {}, rethrow = true) => {
  Sentry.configureScope((scope) => {
    // Any arbitrary data to be included to make the error easier to identify
    scope.setExtra('data', data);

    if (Object.keys(tags).length) {
      forEach(tags, (tagValue, tagKey) => scope.setTag(tagKey, tagValue));
    }
  });

  Sentry.captureException(err);

  console.log('\n---ERROR LOG---\n');
  console.log(err);
  console.log('\n---ERROR LOG---\n');

  // In some cases, the error must not be rethrown due to it being already consumed/caught
  if (rethrow) {
    throw err;
  }
};

module.exports = throwError;
