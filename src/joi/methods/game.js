const { gameSchema } = require('../fields/index');

const {
  id,
  athleteId,
} = gameSchema;

module.exports = {
  fetchGamesByAthleteIdSchema: {
    rules: {
      athleteId: athleteId.required(),
    },
    hints: {
      athleteId: 'Invalid athlete identifier',
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
