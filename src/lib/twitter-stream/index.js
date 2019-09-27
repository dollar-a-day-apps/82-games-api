const Twitter = require('twitter');
const {
  updateCachedTweetsByAthleteId,
  getLastTweetByAthleteId,
} = require('../redis/twitter');
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

// Initiate the tweet streaming from Twitter API
const setupTwitterStream = () => {
  const client = new Twitter(credentials);
  const mainTwitterId = '368148234';
  const fetchInterval = 10 * 1000; // set to 10 seconds

  // Periodically fetch and sync Spencer's latest tweets to our local storage
  setInterval(async () => {
    try {
      // Only fetch the latest 100 tweets after the last one already saved locally
      const lastTweet = await getLastTweetByAthleteId(1);

      const params = { user_id: mainTwitterId, count: 100, since_id: lastTweet.id };
      const tweets = await client.get('statuses/user_timeline', params);
      // console.log('New Tweets: ', tweets.length);
      tweets.forEach((tweet) => {
        console.log('--------');
        console.log(tweet.text);
        updateCachedTweetsByAthleteId(1, tweet);
      });
    } catch (err) {
      throwError(err, {
        fn: 'setupTwitterStream',
        source: 'src/lib/twitter-stream/index.js',
      }, {}, false);
    }
  }, fetchInterval);
};

module.exports = {
  setupTwitterStream,
};
