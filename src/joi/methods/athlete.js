const { athleteSchema } = require('../fields/index');

const {
  id,
  gameId,
  teamId,
  dateTime,
  page,
  size,
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
  fetchAthleteTweetsSchema: {
    rules: {
      athleteId: id.required(),
      fromDate: dateTime,
      toDate: dateTime,
      page,
      size,
    },
    hints: {
      athleteId: 'Invalid athlete identifier',
      fromDate: 'Invalid date format',
      toDate: 'Invalid date format',
      page: 'Page must be larger than 0',
      size: 'Page size must be larger than 0 and less than 100',
    },
  },
};
