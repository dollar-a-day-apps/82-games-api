const Sentry = require('@sentry/node');
const throwError = require('../util/throw-error');
const { globalErrors } = require('../util/constants');
const setUserIpAddress = require('../util/set-user-ip-address');
const { Fan } = require('../database/models');

// Use the authId parsed by JWT to check and get the linked User
module.exports = async (req, res, next) => {
  const { user } = req;
  const { UNAUTHORIZED_ACCESS } = globalErrors;

  // Unauthorized request detected
  if (!user) {
    throwError(new Error(UNAUTHORIZED_ACCESS), {
      fn: 'identifyUser',
      source: 'src/middleware/identify-user.js',
      payload: JSON.stringify({
        request: {
          url: req.url,
          rawHeaders: req.rawHeaders,
          body: req.body,
        },
      }),
    }, {
      requestUrl: req.url,
      requestHost: req.headers.host,
    }, false);

    res.status(401);
    return res.send(new Error(UNAUTHORIZED_ACCESS));
  }

  // Extract the `sub` AKA authId from JWT
  const { sub: authId } = user;

  // Get the userId that owns the authId
  const userAuth = await Fan.findOne({ where: { authId } });

  if (!userAuth) {
    throwError(new Error(UNAUTHORIZED_ACCESS), {
      fn: 'identifyUser',
      source: 'src/middleware/identify-user.js',
      payload: JSON.stringify({
        authId,
        request: {
          url: req.url,
          rawHeaders: req.rawHeaders,
          body: req.body,
        },
      }),
    }, {
      requestUrl: req.url,
      requestHost: req.headers.host,
    }, false);

    res.status(401);
    return res.send(new Error(UNAUTHORIZED_ACCESS));
  }

  // Set the userId, email and authId to req
  req.userId = userAuth.id;
  req.email = userAuth.email;
  req.username = userAuth.username;
  req.authId = authId;

  Sentry.configureScope((scope) => {
    // Include the userId and email to Sentry event so we can easily identify and filter out data
    const {
      userId: id,
      email,
    } = req;

    setUserIpAddress(req);

    scope.setUser({
      id,
      email,
    });
  });

  next();
};
