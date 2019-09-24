const express = require('express');
const rateLimiter = require('express-rate-limit');
const speedLimiter = require('express-slow-down');
const helmet = require('helmet');
const Sentry = require('@sentry/node');
const getUserIpAddress = require('./util/get-user-ip-address');
const setUserIpAddress = require('./util/set-user-ip-address');
const throwError = require('./util/throw-error');

const {
  NODE_ENV,
  PORT,
  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
} = process.env;

// Routes
const {
  teamRoutes,
  athleteRoutes,
  gameRoutes,
  serviceRoutes,
} = require('./routes');

// App middleware
const cors = require('./middleware/cors');

const {
  generatePastGamesStatistic,
  // generatePlayerGamesStatistic,
} = require('./lib/nba');

const nodeEnv = NODE_ENV || 'development';
const port = PORT || 8100;
const sentryDsn = SENTRY_DSN;
const sentryEnv = SENTRY_ENVIRONMENT || 'development';

// Disable logging outside development env
if (nodeEnv !== 'development') {
  console.log = () => {};
}

// Express instance
const app = express();

// Enable configured cors for requests
app.use('*', cors);

// Setup Sentry
Sentry.init({
  dsn: sentryDsn,
  environment: sentryEnv,
});

// Apply shared rate-limiter for all routes
const globalLimiter = rateLimiter({
  windowMs: 60 * 1000, // Duration for each time slot, set to 1-minute
  max: 200, // Maximum number of 200 requests in 1-minute
  handler: (req, res) => { // Catch the error and report it
    const errorMessage = 'Too many requests!';

    throwError(new Error(errorMessage), {
      fn: 'globalLimiter',
      source: 'src/index.js',
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
    });

    res.status(429).send({
      error: {
        message: errorMessage,
      },
    });
  },
  keyGenerator: req => getUserIpAddress(req),
});

app.use(globalLimiter);

// Slow down the remaining requests before blocking it for exceeding the request limit set above
const slowDown = speedLimiter({
  windowMs: 60 * 1000, // 1-minute interval
  delayAfter: 190, // Start delaying after reaching 190 requests
  delayMs: 500, // Add delay starting from 500ms (and up) per additional requests after reaching the limit
  keyGenerator: req => getUserIpAddress(req),
});

app.use(slowDown);

// Apply all default protections from Helmet
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Used for various service-related activities (e.g. health checks)
app.use('/service', serviceRoutes);

// Public endpoints
app.use('/api/team', teamRoutes);
app.use('/api/athlete', athleteRoutes);
app.use('/api/game', gameRoutes);

// Default response for invalid endpoints/routes
app.use((req, res) => {
  setUserIpAddress(req);

  const errorMessage = 'Invalid endpoint';

  res.status(404).send({
    error: { message: errorMessage },
  });

  throwError(new Error(errorMessage), {
    fn: 'app.use',
    source: 'src/index.js',
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
  });
});

// generatePlayerGamesStatistic();
generatePastGamesStatistic();

app.listen(port, () => console.log(`🚀 Listening on ${port}`));
