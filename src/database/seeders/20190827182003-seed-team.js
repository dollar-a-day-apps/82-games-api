const { currentDateTime } = require('../../util/date');
const { Team } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await Team.count());

    const insertDate = {
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
    };

    if (empty) {
      return queryInterface.bulkInsert('Teams', [{
        name: 'Brooklyn',
        ...insertDate,
      }, {
        name: 'Franca',
        ...insertDate,
      }, {
        name: 'Los Angeles',
        ...insertDate,
      }, {
        name: 'Toronto',
        ...insertDate,
      }, {
        name: 'Minnesota',
        ...insertDate,
      }, {
        name: 'New York',
        ...insertDate,
      }, {
        name: 'Memphis',
        ...insertDate,
      }, {
        name: 'Indiana',
        ...insertDate,
      }, {
        name: 'Houston',
        ...insertDate,
      }, {
        name: 'Detroit',
        ...insertDate,
      }, {
        name: 'New Orleans',
        ...insertDate,
      }, {
        name: 'Portland',
        ...insertDate,
      }, {
        name: 'Phoenix',
        ...insertDate,
      }, {
        name: 'Utah',
        ...insertDate,
      }, {
        name: 'Denver',
        ...insertDate,
      }, {
        name: 'Chicago',
        ...insertDate,
      }, {
        name: 'Charlotte',
        ...insertDate,
      }, {
        name: 'Sacramento',
        ...insertDate,
      }, {
        name: 'Cleveland',
        ...insertDate,
      }, {
        name: 'Boston',
        ...insertDate,
      }, {
        name: 'Miami',
        ...insertDate,
      }, {
        name: 'Atlanta',
        ...insertDate,
      }, {
        name: 'Philadelphia',
        ...insertDate,
      }, {
        name: 'San Antonio',
        ...insertDate,
      }, {
        name: 'Dallas',
        ...insertDate,
      }, {
        name: 'Orlando',
        ...insertDate,
      }, {
        name: 'Oklahoma',
        ...insertDate,
      }, {
        name: 'Milwaukee',
        ...insertDate,
      }, {
        name: 'Washington',
        ...insertDate,
      }, {
        name: 'San Francisco',
        ...insertDate,
      }, {
        name: 'Los Angeles',
        ...insertDate,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Teams', null, {})
  ),
};
