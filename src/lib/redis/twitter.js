const moment = require('moment');
const { defaultDateTimeFormat } = require('../../util/date');
const throwError = require('../../util/throw-error');
const redisClient = require('../redis/client');

const baseAthleteKey = 'athlete-tweets';

const getAthleteKey = athleteId => `${baseAthleteKey}-${athleteId}`;

// Get the cached tweets for the specified athleteId and date-range
// The date-range should be already in UTC timezone, formatted as YYYYMMDDHHmmss, ie. 20190901000000 (24Hr-format)
const getCachedTweetsByAthleteId = async (athleteId, fromDate = '', toDate = '', offset = 0, count = 20) => {
  const keyName = getAthleteKey(athleteId);
  const fromTimestamp = fromDate ? moment.utc(fromDate, 'YYYYMMDDHHmmss', 'en').format('x') : '-inf';
  const toTimestamp = toDate ? moment.utc(toDate, 'YYYYMMDDHHmmss', 'en').format('x') : '+inf';

  return redisClient().ZREVRANGEBYSCOREAsync(keyName, toTimestamp, fromTimestamp, 'LIMIT', offset, count);
};

const getLastTweetByAthleteId = async (athleteId) => {
  const keyName = getAthleteKey(athleteId);
  const tweet = await redisClient().ZREVRANGEAsync(keyName, 0, 0);

  const lastTweet = tweet[0] || '{}';
  return JSON.parse(lastTweet);
};

// Insert new tweet to the cached athlete tweets for the specified athleteId
const updateCachedTweetsByAthleteId = async (athleteId, tweet) => {
  const keyName = getAthleteKey(athleteId);
  const {
    id_str: id,
    source,
    text,
    created_at,
    user: {
      id_str: userId,
      name: userFullname,
      screen_name: userHandle,
      profile_image_url_https: userProfileImageUrl,
    },
    retweeted_status,
  } = tweet;

  // Normalize Twitter's unusual date format and get only what we need (Date and Hour)
  const tweetDateTime = moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').utc();
  const dateField = tweetDateTime.format('YYYY-MM-DD');
  const hourField = tweetDateTime.format('HH');

  // Prepare the next to be inserted tweet record
  const timestamp = tweetDateTime.unix();
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
    ...retweeted_status && {
      userId: retweeted_status.user.id,
      userHandle: retweeted_status.user.screen_name,
      userProfileImageUrl: retweeted_status.user.profile_image_url_https,
    },
  };
  const serializedTweet = JSON.stringify(newTweet);

  try {
    // Add new record to the sorted-set of the athlete tweets cache
    await redisClient().ZADDAsync(keyName, `${timestamp}`, serializedTweet);
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
        serializedTweet,
      }),
    });
  }
};

module.exports = {
  getCachedTweetsByAthleteId,
  getLastTweetByAthleteId,
  updateCachedTweetsByAthleteId,
};
