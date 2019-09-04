const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const throwError = require('../util/throw-error');
const { globalErrors } = require('../util/constants');

const {
  AUTH0_ISSUER,
  AUTH0_AUDIENCE,
} = process.env;

const auth0Issuer = AUTH0_ISSUER || 'https://82-games-dev.auth0.com/';
const auth0Audience = AUTH0_AUDIENCE || 'https://82-games-dev-auth-api';

// JWT parse and validation middleware
const jwtValidator = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0Issuer}.well-known/jwks.json`,
  }),
  audience: auth0Audience,
  issuer: auth0Issuer,
  algorithms: ['RS256'],
});

// Wrap the JWT call to handle the HTTP error 500
module.exports = (req, res, next) => {
  const handleError = (err) => {
    if (err && err.name === 'UnauthorizedError') {
      throwError(new Error(globalErrors.UNAUTHORIZED_ACCESS), {
        fn: 'validateJwt',
        source: 'src/middleware/validate-jwt.js',
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
      return res.send(new Error(globalErrors.UNAUTHORIZED_ACCESS));
    }
    return next(err);
  };
  return jwtValidator(req, res, handleError);
};
