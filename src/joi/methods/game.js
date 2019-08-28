const { gameSchema } = require('../fields/index');

const { teamId } = gameSchema;

module.exports = {
  fetchGamesByTeamIdSchema: {
    rules: {
      teamId: teamId.required(),
    },
    hints: {
      id: 'Invalid team identifier',
    },
  },
};
