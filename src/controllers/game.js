const {
  Sequelize: { Op },
  Game,
} = require('../database/models');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const { sanitizeList } = require('../util/sanitize-output');
const { fetchGamesByTeamIdSchema } = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');

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
        raw: true,
      });

      return sanitizeList(games);
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
