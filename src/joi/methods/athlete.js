const { athleteSchema } = require('../fields/index');

const {
  id,
  gameId,
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
      teamId: 'Invalid team identifier',
    },
  },
  fetchAthletStatisticByGameIdSchema: {
    rules: {
      athleteId: id.required(),
      gameId: gameId.required(),
    },
    hints: {
      athleteId: 'Invalid athlete identifier',
      gameId: 'Invalid game identifier',
    },
  },
};
