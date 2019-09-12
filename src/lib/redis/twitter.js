const moment = require('moment');
const { defaultDateTimeFormat } = require('../../util/date');
const throwError = require('../../util/throw-error');
const redisClient = require('../redis/client');

const baseAthleteHash = 'athlete-tweets';

const getAthleteHash = athleteId => `${baseAthleteHash}-${athleteId}`;

// // Get the cached tweets for the specified athleteId
// const getCachedTweetsByAthleteId = athleteId => redisClient().HGETAsync(getAthleteHash(athleteId), userId);

// Insert new tweet to the cached athlete tweets for the specified athleteId
const updateCachedTweetsByAthleteId = async (athleteId, tweet) => {
  const hashName = getAthleteHash(athleteId);
  const {
    id_str: id,
    source,
    text,
    created_at,
    timestamp_ms: timestamp,
    user: {
      id_str: userId,
      name: userFullname,
      screen_nmea: userHandle,
      profile_image_url_https: userProfileImageUrl,
    },
  } = tweet;

  // Normalize Twitter's unusual date format and get only what we need (Date and Hour)
  const tweetDateTime = moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').utc();
  const dateField = tweetDateTime.format('YYYY-MM-DD');
  const hourField = tweetDateTime.format('HH');

  // Prepare the next to be inserted tweet record
  const newTweet = {
    id,
    source,
    text,
    dateTime: tweetDateTime.format(defaultDateTimeFormat),
    userId,
    userFullname,
    userHandle,
    userProfileImageUrl,
    timestamp,
  };

  let tweets = [];
  tweets.push(newTweet);

  const serializedStats = JSON.stringify({
    [hourField]: tweets,
  });

  let setNx;
  let data;
  let deserializedStats;
  let reserializedStats;

  try {
    // HSETNX sets the value of a key if it does not exist
    // Access the specified tweet hash and attempt to insert the new tweet
    setNx = await redisClient().HSETNXAsync(hashName, dateField, serializedStats);

    if (!setNx) {
      // Pull the current list of cached tweets of the given date and athlete
      data = await redisClient().HGETAsync(hashName, dateField);
      deserializedStats = JSON.parse(data);

      if (deserializedStats[hourField]) {
        tweets = [...deserializedStats[hourField]];
        tweets.push(newTweet);
      }

      // Then insert the latest tweet into it before pushing it back to Redis
      deserializedStats[hourField] = tweets;
      reserializedStats = JSON.stringify(deserializedStats);

      await redisClient().HSETAsync(hashName, dateField, reserializedStats);

      return reserializedStats;
    }

    return serializedStats;
  } catch (err) {
    return throwError(err, {
      athleteId,
      fn: 'updateCachedTweetsByAthleteId',
      source: 'src/lib/redis/twitter.js',
      payload: JSON.stringify({
        fnArgs: {
          athleteId,
          dateField,
          hourField,
        },
        serializedStats,
        setNx,
        data,
        deserializedStats,
        reserializedStats,
      }),
    });
  }
};

module.exports = {
  updateCachedTweetsByAthleteId,
};
