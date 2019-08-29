const cors = require('cors');

const { CLIENT_WEB_URL } = process.env;

const clientWebUrl = CLIENT_WEB_URL || 'http://localhost:8000';

// Allow only requests coming from these origins
const whitelistedOrigins = [clientWebUrl];

// Setup CORS handler to avoid restrictions when receiving requests from the frontend side
module.exports = cors({
  origin: whitelistedOrigins,
  methods: 'HEAD, GET, POST',
});
