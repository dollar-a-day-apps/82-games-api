const { Team } = require('../database/models');
const throwError = require('../util/throw-error');
const { sanitizeList } = require('../util/sanitize-output');
const { routeErrorMessages } = require('../util/constants');

module.exports = {
  fetchTeams: async (req) => {
    try {
      // Fetch all team records
      const teams = await Team.findAll({ raw: true });

      return sanitizeList(teams, ['referenceId']);
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_TEAMS_FAILED), {
        fn: 'fetchTeams',
        source: 'src/controller/team.js',
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
