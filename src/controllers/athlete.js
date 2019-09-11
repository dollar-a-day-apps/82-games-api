const {
  Athlete,
  AthleteStatistic,
} = require('../database/models');
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
} = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');

module.exports = {
  fetchAthleteById: async (req) => {
    const { params } = req;

    await validateInput(params, fetchAthleteByIdSchema);

    const { id } = params;

    try {
      const athlete = await Athlete.findOne({
        where: { id },
        plain: true,
      });

      return sanitizeObject(athlete, ['referenceId']);
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
};
