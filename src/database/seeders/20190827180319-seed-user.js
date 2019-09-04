const { currentDateTime } = require('../../util/date');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await User.count());

    if (empty) {
      return queryInterface.bulkInsert('Users', [{
        id: '1a136c60-1fc5-abc9-a84b-a383ce60b235',
        username: 'testfan1',
        email: 'fanatic@fan.com',
        authId: 'auth0|000000',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};
