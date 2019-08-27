const { currentDateTime } = require('../../util/date');
const { Fan } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await Fan.count());

    if (empty) {
      return queryInterface.bulkInsert('Fans', [{
        id: '1a136c60-1fc5-abc9-a84b-a383ce60b235',
        name: 'Fan Atic',
        email: 'fanatic@fan.com',
        profilePictureUrl: '',
        auth0Id: 'auth0|000000',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Fans', null, {})
  ),
};
