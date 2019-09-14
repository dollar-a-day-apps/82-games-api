const {
  Athlete,
  AthleteStatistic,
} = require('../database/models');
const { getCachedTweetsByAthleteId } = require('../lib/redis/twitter');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const {
  sanitizeObject,
  sanitizeList,
} = require('../util/sanitize-output');
const {
  fetchAthleteByIdSchema,
  fetchAthletesByTeamIdSchema,
  fetchAthletStatisticByGameIdSchema,
  fetchAthleteTweetsSchema,
} = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');

const parseTweets = (tweets) => {
  const parsedTweets = [];

  tweets.forEach((row) => {
    const tweet = JSON.parse(row);
    parsedTweets.push(tweet);
  });

  return parsedTweets;
};

const parseAthleteStatistics = ({
  dataValues,
}) => {
  const {
    AthleteStatistics,
    ...athleteData
  } = dataValues;

  return {
    ...athleteData,
    performanceStatisticsByGameId: AthleteStatistics.reduce((acc, athleteStatistic) => {
      const {
        dataValues: {
          gameId,
          performanceStatistics,
        },
      } = athleteStatistic;

      return {
        ...acc,
        [gameId]: {
          gameId,
          ...performanceStatistics,
        },
      };
    }, {}),
  };
};

module.exports = {
  fetchAthleteById: async (req) => {
    const { params } = req;

    await validateInput(params, fetchAthleteByIdSchema);

    const { id } = params;

    try {
      const athlete = await Athlete.findOne({
        where: { id },
        include: [AthleteStatistic],
        plain: true,
      });

      return sanitizeObject(parseAthleteStatistics(athlete), ['referenceId'], false);
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_ATHLETE_FAILED), {
        fn: 'fetchAthleteById',
        source: 'src/controller/athlete.js',
        payload: JSON.stringify({
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
  fetchAthletesByTeamId: async (req) => {
    const { params } = req;

    await validateInput(params, fetchAthletesByTeamIdSchema);

    const { teamId } = params;

    try {
      const athletes = await Athlete.findAll({
        where: { teamId },
        raw: true,
      });

      return sanitizeList(athletes);
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_ATHLETES_FAILED), {
        fn: 'fetchAthletesByTeamId',
        source: 'src/controller/athlete.js',
        payload: JSON.stringify({
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
  fetchAthleteStatisticByGameId: async (req) => {
    const { query } = req;

    await validateInput(query, fetchAthletStatisticByGameIdSchema);

    const {
      athleteId,
      gameId,
    } = query;

    try {
      const statistic = await AthleteStatistic.findOne({
        where: {
          athleteId,
          gameId,
        },
        plain: true,
      });

      return sanitizeObject(statistic);
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_ATHLETE_STATISTIC_FAILED), {
        fn: 'fetchAthleteStatisticByGameId',
        source: 'src/controller/athlete.js',
        payload: JSON.stringify({
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
  fetchAthleteTweets: async (req) => {
    const { query } = req;

    await validateInput(query, fetchAthleteTweetsSchema);

    const {
      athleteId,
      fromDate = '',
      toDate = '',
      page = 1, // Default to page 1
      size = 20, // Default to 20 records at a time
    } = query;
    const offset = (page - 1) * size;

    try {
      const rawTweets = await getCachedTweetsByAthleteId(athleteId, fromDate, toDate, offset, size);

      return parseTweets(rawTweets);
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_ATHLETE_TWEETS_FAILED), {
        fn: 'fetchAthleteTweets',
        source: 'src/controller/athlete.js',
        payload: JSON.stringify({
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
};
