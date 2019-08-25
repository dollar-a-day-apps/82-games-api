const Sentry = require('@sentry/node');
const getUserIpAddress = require('./get-user-ip-address');

const setUserIpAddress = req => (
  Sentry.configureScope((scope) => {
    scope.setUser({
      ip_address: getUserIpAddress(req),
    });
  })
);

module.exports = setUserIpAddress;
