const { gameSchema } = require('../fields/index');

const {
  id,
  teamId,
} = gameSchema;

module.exports = {
  fetchGamesByTeamIdSchema: {
    rules: {
      teamId: teamId.required(),
    },
    hints: {
      teamId: 'Invalid team identifier',
    },
  },
  fetchGameStatisticByIdSchema: {
    rules: {
      id: id.required(),
    },
    hints: {
      id: 'Invalid game identifiers',
    },
  },
};
