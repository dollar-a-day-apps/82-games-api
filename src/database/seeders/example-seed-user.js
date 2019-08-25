const { currentDateTime } = require('../../util/date');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await User.count());

    if (empty) {
      return queryInterface.bulkInsert('Users', [{
        id: '0ec36260-1113-4ac2-9ce4-3ce6235a380b',
        fullName: 'Dreamer',
        userType: 'INFLUENCER',
        profilePictureUrl: '',
        profileTagLine: '',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }, {
        id: '28c7b42d-d35f-48b1-b414-46fe0a3aca6e',
        fullName: 'Fanboy',
        userType: 'FAN',
        profilePictureUrl: '',
        profileTagLine: '',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};
