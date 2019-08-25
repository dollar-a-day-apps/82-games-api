const cors = require('cors');

const { CLIENT_WEB_URL } = process.env;

const dashboardClientWebUrl = CLIENT_WEB_URL || 'http://localhost:8080';

// Allow only requests coming from these origins
const whitelistedOrigins = [dashboardClientWebUrl];

// Setup CORS handler to avoid restrictions when receiving requests from the frontend side
module.exports = cors({
  origin: whitelistedOrigins,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'API-Token'],
  exposedHeaders: ['API-Token-Expiry'],
  credentials: true,
});
