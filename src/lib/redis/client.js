const redis = require('./redis');
const redisConfig = require('./config');

let client = null;

// Create a new client only if it's not yet initialized
// Otherwise use the existing one
const redisClient = () => {
  if (!client) {
    client = redis.createClient(redisConfig);
  }

  return client;
};

module.exports = redisClient;
