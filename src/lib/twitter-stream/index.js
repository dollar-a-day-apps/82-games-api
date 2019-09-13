const TwitterStream = require('twitter-stream-api');
const { updateCachedTweetsByAthleteId, getCachedTweetsByAthleteId } = require('../redis/twitter');

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
  });

  Twitter.on('data', (obj) => {
    // Typecast and parse accordingly as JSON
    const tweet = JSON.parse(obj.toString('utf8'));
    console.log(tweet.text);
    console.log('----');
    updateCachedTweetsByAthleteId(1, tweet);
  });

  Twitter.on('data keep-alive', () => {
    console.log('Twitter Stream - Keep-alive');
  });

  Twitter.on('data error', (error) => {
    console.log('Twitter Stream - Error', error);
  });

  Twitter.on('connection rate limit', (httpStatusCode) => {
    console.log('Twitter Stream - Rate Limit Error', httpStatusCode);
  });

  Twitter.on('connection error network', (error) => {
    console.log('Twitter Stream - Network Error', error);
  });

  Twitter.on('connection error http', (httpStatusCode) => {
    console.log('Twitter Stream - HTTP Error', httpStatusCode);
  });

  Twitter.on('connection error stall', () => {
    console.log('Twitter Stream - Connection Stalled');
  });

  Twitter.on('connection error unknown', (error) => {
    console.log('Twitter Stream - Unknown Error', error);
  });

  getCachedTweetsByAthleteId(1, '20190913115900', '20190913115959', 0, 3).then(result => console.log(result));
};

module.exports = {
  setupTwitterStream,
};
