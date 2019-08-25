const Sentry = require('@sentry/node');

// A wrapper to process requests to routes, fetch the results,
// and properly handle any thrown error
module.exports = routeMethod => async (req, res) => {
  try {
    Sentry.configureScope((scope) => {
      scope.setExtra('path', req.originalUrl);
    });

    const results = await routeMethod(req, res);
    res.send(results);
  } catch (err) {
    // Default to HTTP error 400 on all errors
    res.status(400);
    res.send({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
};
