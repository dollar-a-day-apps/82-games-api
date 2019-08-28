const { athleteSchema } = require('../fields/index');

const {
  id,
  teamId,
} = athleteSchema;

module.exports = {
  fetchAthleteByIdSchema: {
    rules: {
      id: id.required(),
    },
    hints: {
      id: 'Invalid athlete identifier',
    },
  },
  fetchAthletesByTeamIdSchema: {
    rules: {
      teamId: teamId.required(),
    },
    hints: {
      id: 'Invalid team identifier',
    },
  },
};
