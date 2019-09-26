const Twitter = require('twitter');
const { updateCachedTweetsByAthleteId } = require('../redis/twitter');
const throwError = require('../../util/throw-error');

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

const credentials = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
};

const handleSetupError = (err) => {
  throwError(err, {
    fn: 'setupTwitterStream',
    source: 'src/lib/twitter-stream/index.js',
  }, {}, false);
};

// Initiate the tweet streaming from Twitter API
const setupTwitterStream = () => {
  const client = new Twitter(credentials);
  const mainTwitterId = '368148234';

  // Setup the streamer and follow Spencer's account
  const stream = client.stream('statuses/filter', { follow: mainTwitterId });

  stream.on('connection success', (uri) => {
    console.log('Twitter Stream - Connected', uri);
  });

  stream.on('connection aborted', () => {
    console.log('Twitter Stream - Connection Aborted');
    handleSetupError(new Error('Connection Aborted'));
  });

  stream.on('data', (tweet) => {
    // Filter out tweets to only those coming from Spencer himself
    if (tweet.user.id_str === mainTwitterId) {
      console.log(tweet.text);
      console.log('----');
      updateCachedTweetsByAthleteId(1, tweet);
    }
  });

  // Sort of like "PING" from Twitter to indicate that the connection is still alive
  stream.on('data keep-alive', () => {
    console.log('Twitter Stream - Keep-alive');
  });

  stream.on('data error', (error) => {
    console.log('Twitter Stream - Error', error);
    handleSetupError(error);
  });

  stream.on('connection rate limit', (httpStatusCode) => {
    console.log('Twitter Stream - Rate Limit Error', httpStatusCode);
    handleSetupError(new Error(`Connection Rate Limited: ${httpStatusCode}`));
  });

  stream.on('connection error network', (error) => {
    console.log('Twitter Stream - Network Error', error);
    handleSetupError(error);
  });

  stream.on('connection error http', (httpStatusCode) => {
    console.log('Twitter Stream - HTTP Error', httpStatusCode);
    handleSetupError(`HTTP Error: ${httpStatusCode}`);
  });

  stream.on('connection error stall', () => {
    console.log('Twitter Stream - Connection Stalled');
    handleSetupError(new Error('Connection Stalled'));
  });

  stream.on('connection error unknown', (error) => {
    console.log('Twitter Stream - Unknown Error', error);
    handleSetupError(error);
  });
};

module.exports = {
  setupTwitterStream,
};
