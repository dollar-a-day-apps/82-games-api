const TwitterStream = require('twitter-stream-api');
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
  token: TWITTER_ACCESS_TOKEN,
  token_secret: TWITTER_ACCESS_TOKEN_SECRET,
};

const handleSetupError = (err) => {
  throwError(err, {
    fn: 'setupTwitterStream',
    source: 'src/lib/twitter-stream/index.js',
  }, {}, false);
};

// Initiate the tweet streaming from Twitter API
const setupTwitterStream = () => {
  const Twitter = new TwitterStream(credentials, false);

  // Stream only for latest tweets from Spencer's account for now
  Twitter.stream('statuses/filter', {
    // track: 'nba',
    follow: ['368148234'],
  });

  Twitter.on('connection success', (uri) => {
    console.log('Twitter Stream - Connected', uri);
  });

  Twitter.on('connection aborted', () => {
    console.log('Twitter Stream - Connection Aborted');
    handleSetupError(new Error('Connection Aborted'));
  });

  Twitter.on('data', (obj) => {
    // Typecast and parse accordingly as JSON
    const tweet = JSON.parse(obj.toString('utf8'));
    console.log(tweet.text);
    console.log('----');
    updateCachedTweetsByAthleteId(1, tweet);
  });

  // Sort of like "PING" from Twitter to indicate that the connection is still alive
  Twitter.on('data keep-alive', () => {
    console.log('Twitter Stream - Keep-alive');
  });

  Twitter.on('data error', (error) => {
    console.log('Twitter Stream - Error', error);
    handleSetupError(error);
  });

  Twitter.on('connection rate limit', (httpStatusCode) => {
    console.log('Twitter Stream - Rate Limit Error', httpStatusCode);
    handleSetupError(new Error(`Connection Rate Limited: ${httpStatusCode}`));
  });

  Twitter.on('connection error network', (error) => {
    console.log('Twitter Stream - Network Error', error);
    handleSetupError(error);
  });

  Twitter.on('connection error http', (httpStatusCode) => {
    console.log('Twitter Stream - HTTP Error', httpStatusCode);
    handleSetupError(`HTTP Error: ${httpStatusCode}`);
  });

  Twitter.on('connection error stall', () => {
    console.log('Twitter Stream - Connection Stalled');
    handleSetupError(new Error('Connection Stalled'));
  });

  Twitter.on('connection error unknown', (error) => {
    console.log('Twitter Stream - Unknown Error', error);
    handleSetupError(error);
  });
};

module.exports = {
  setupTwitterStream,
};
