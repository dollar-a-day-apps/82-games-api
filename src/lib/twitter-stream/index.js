const TwitterStream = require('twitter-stream-api');
const { updateCachedTweetsByAthleteId } = require('../redis/twitter');

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
    track: 'nba',
    // follow: ['368148234'],
  });

  Twitter.on('connection success', (uri) => {
    console.log('connection success', uri);
  });

  Twitter.on('data', (obj) => {
    // Typecast and parse accordingly as JSON
    const tweet = JSON.parse(obj.toString('utf8'));
    console.log('----');
    console.log(tweet.created_at);
    console.log(tweet.text);
    console.log('----');
    updateCachedTweetsByAthleteId(1, tweet);
  });

  Twitter.on('data error', (error) => {
    console.log('data error', error);
  });

  Twitter.on('connection rate limit', (httpStatusCode) => {
    console.log('connection rate limit', httpStatusCode);
  });

  Twitter.on('connection error http', (httpStatusCode) => {
    console.log('connection error http', httpStatusCode);
  });
};

module.exports = {
  setupTwitterStream,
};
