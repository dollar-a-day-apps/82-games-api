const moment = require('moment-timezone');
const {
  Sequelize: { Op },
  Game,
  GameStatistic,
} = require('../database/models');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const { sanitizeList } = require('../util/sanitize-output');
const { fetchGamesByTeamIdSchema } = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');
const { seasonTable } = require('../util/look-up-tables');

// Attach the season identifier for each games
// and then grab the final point count for each teams from the stats
const appendMetadata = (games) => {
  const result = [];

  games.forEach((game) => {
    const {
      dateTime,
      'GameStatistic.homeTeamPoints': homeTeamPoints,
      'GameStatistic.awayTeamPoints': awayTeamPoints,
    } = game;
    const gameDateTime = moment(dateTime).tz('America/New_York');

    let gameSeason = null;
    seasonTable.forEach((season) => {
      const seasonStartDate = moment.tz(season.startDate, 'America/New_York');
      const seasonEndDate = moment.tz(season.endDate, 'America/New_York');

      if (gameDateTime.isBetween(seasonStartDate, seasonEndDate, 'day', '[]')) {
        gameSeason = season;
      }
    });

    if (gameSeason) {
      result.push({
        ...game,
        season: gameSeason.id,
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

module.exports = {
  fetchGamesByTeamId: async (req) => {
    const { params } = req;

    await validateInput(params, fetchGamesByTeamIdSchema);

    const { teamId } = params;

    try {
      const games = await Game.findAll({
        where: {
          [Op.or]: [{
            homeTeamId: teamId,
          }, {
            awayTeamId: teamId,
          }],
        },
        include: [GameStatistic],
        raw: true,
      });

      // Attach season identifier and also return the final result/points from both teams
      // then remove unrelevant fields
      const sanitizedGames = sanitizeList(appendMetadata(games), [
        'referenceId',
        'GameStatistic.id',
        'GameStatistic.gameId',
        'GameStatistic.homeTeamPoints',
        'GameStatistic.awayTeamPoints',
        'GameStatistic.homeTeamStatistics',
        'GameStatistic.awayTeamStatistics',
        'GameStatistic.createdAt',
        'GameStatistic.updatedAt',
      ]);
      return sanitizedGames;
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_GAMES_FAILED), {
        fn: 'fetchGamesByTeamId',
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
