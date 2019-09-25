const moment = require('moment-timezone');
const {
  Sequelize: { Op },
  Game,
  GameStatistic,
  AthleteStatistic,
} = require('../database/models');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const {
  sanitizeList,
  sanitizeObject,
} = require('../util/sanitize-output');
const {
  fetchGamesByAthleteIdSchema,
  fetchGameStatisticByIdSchema,
} = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');
const { seasonTable } = require('../util/look-up-tables');

const getSeason = (date) => {
  const gameDateTime = moment(date).tz('America/New_York');

  let gameSeason = null;
  seasonTable.forEach((season) => {
    const seasonStartDate = moment.tz(season.startDate, 'America/New_York');
    const seasonEndDate = moment.tz(season.endDate, 'America/New_York');

    if (gameDateTime.isBetween(seasonStartDate, seasonEndDate, 'day', '[]')) {
      gameSeason = season;
    }
  });

  return gameSeason;
};

// Attach the season identifier for each games of the specified athlete
// and then grab the final point count for each teams from the stats
const parseAthleteGames = (games) => {
  const result = [];
  let lastSeasonDate = '';
  let gameNumber = 1;

  games.forEach((game) => {
    const {
      'Game.id': id,
      'Game.homeTeamId': homeTeamId,
      'Game.awayTeamId': awayTeamId,
      'Game.arena': arena,
      'Game.dateTime': dateTime,
      'Game.GameStatistic.homeTeamPoints': homeTeamPoints,
      'Game.GameStatistic.awayTeamPoints': awayTeamPoints,
    } = game;

    const gameSeason = getSeason(dateTime);
    if (gameSeason) {
      const { startDate } = gameSeason;

      if (lastSeasonDate !== startDate) {
        lastSeasonDate = startDate;
        gameNumber = 1;
      } else {
        gameNumber += 1;
      }

      result.push({
        id,
        homeTeamId,
        awayTeamId,
        arena,
        dateTime,
        seasonYears: gameSeason.seasonYears,
        gameNumber,
        homeTeamPoints,
        awayTeamPoints,
      });
    } else {
      // Should never come down here unless we have a unindexed/invalid game record
      console.log('Invalid Game Data');
    }
  });

  return result;
};

// Pull out detailed statistic for the specified game
const parseStatistic = (game) => {
  const {
    dateTime,
    'GameStatistic.homeTeamPoints': homeTeamPoints,
    'GameStatistic.awayTeamPoints': awayTeamPoints,
    'GameStatistic.homeTeamStatistics': homeTeamStatistics,
    'GameStatistic.awayTeamStatistics': awayTeamStatistics,
  } = game;

  const gameSeason = getSeason(dateTime);

  if (gameSeason) {
    return {
      ...game,
      seasonYears: gameSeason.seasonYears,
      homeTeamPoints,
      awayTeamPoints,
      homeTeamStatistics,
      awayTeamStatistics,
    };
  } else {
    // Should never come down here unless we have a unindexed/invalid game record
    console.log('Invalid Game Data');
  }
};

const unusedStatFields = [
  'Game.id',
  'Game.dateTime',
  'Game.referenceId',
  'Game.homeTeamId',
  'Game.awayTeamId',
  'Game.arena',
  'Game.createdAt',
  'Game.updatedAt',
  'Game.GameStatistic.id',
  'Game.GameStatistic.gameId',
  'Game.GameStatistic.homeTeamPoints',
  'Game.GameStatistic.awayTeamPoints',
  'Game.GameStatistic.homeTeamStatistics',
  'Game.GameStatistic.awayTeamStatistics',
  'Game.GameStatistic.createdAt',
  'Game.GameStatistic.updatedAt',
];

module.exports = {
  fetchGamesByAthleteId: async (req) => {
    const { params } = req;

    await validateInput(params, fetchGamesByAthleteIdSchema);

    const { athleteId } = params;

    try {
      const games = await AthleteStatistic.findAll({
        where: {
          athleteId,
          performanceStatistics: { [Op.ne]: null },
        },
        include: [{
          model: Game,
          include: [
            GameStatistic,
          ],
        }],
        raw: true,
      });

      // Attach season identifier and also return the final result/points from both teams
      // then remove unrelevant fields
      const sanitizedGames = sanitizeList(parseAthleteGames(games), [
        'referenceId',
        ...unusedStatFields,
      ]);
      return sanitizedGames;
    } catch (err) {
      console.log(err);
      return throwError(new Error(routeErrorMessages.FETCH_GAMES_FAILED), {
        fn: 'fetchGamesByAthleteId',
        source: 'src/controller/game.js',
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
  fetchGameStatisticById: async (req) => {
    const { params } = req;

    await validateInput(params, fetchGameStatisticByIdSchema);

    const { id } = params;

    try {
      // Reformat the list of gameIds and reject requests with absurd number of gameIds
      const ids = id.split(',');
      if (ids.length > 100) {
        throw new Error('Bad Request');
      }

      const games = await Game.findAll({
        where: { id: ids },
        include: [GameStatistic],
        raw: true,
      });

      // Attach season identifier and also return the final result/points from both teams
      // then remove unrelevant fields
      const gameStats = [];
      games.forEach((game) => {
        const sanitizedGame = sanitizeObject(parseStatistic(game), [
          'referenceId',
          ...unusedStatFields,
        ], false);
        gameStats.push(sanitizedGame);
      });

      return gameStats;
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_GAME_DETAIL_FAILED), {
        fn: 'fetchGameStatisticById',
        source: 'src/controller/game.js',
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
