const { currentDateTime } = require('../../util/date');
const { Athlete } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await Athlete.count());

    if (empty) {
      return queryInterface.bulkInsert('Athletes', [{
        name: 'Spencer Dinwiddie',
        teamId: 1,
        referenceId: '203915',
        positionId: 1,
        twitterHandle: 'SDinwiddie_25',
        instagramHandle: 'spencerdinwiddie',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Athletes', null, {})
  ),
};
