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
        referenceId: '1610612751',
        ...insertDate,
      }, {
        name: 'Franca',
        referenceId: '12332',
        ...insertDate,
      }, {
        name: 'Los Angeles',
        referenceId: '1610612747',
        ...insertDate,
      }, {
        name: 'Toronto',
        referenceId: '1610612761',
        ...insertDate,
      }, {
        name: 'Minnesota',
        referenceId: '1610612750',
        ...insertDate,
      }, {
        name: 'New York',
        referenceId: '1610612752',
        ...insertDate,
      }, {
        name: 'Memphis',
        referenceId: '1610612763',
        ...insertDate,
      }, {
        name: 'Indiana',
        referenceId: '1610612754',
        ...insertDate,
      }, {
        name: 'Houston',
        referenceId: '1610612745',
        ...insertDate,
      }, {
        name: 'Detroit',
        referenceId: '1610612765',
        ...insertDate,
      }, {
        name: 'New Orleans',
        referenceId: '1610612740',
        ...insertDate,
      }, {
        name: 'Portland',
        referenceId: '1610612757',
        ...insertDate,
      }, {
        name: 'Phoenix',
        referenceId: '1610612756',
        ...insertDate,
      }, {
        name: 'Utah',
        referenceId: '1610612762',
        ...insertDate,
      }, {
        name: 'Denver',
        referenceId: '1610612743',
        ...insertDate,
      }, {
        name: 'Chicago',
        referenceId: '1610612741',
        ...insertDate,
      }, {
        name: 'Charlotte',
        referenceId: '1610612766',
        ...insertDate,
      }, {
        name: 'Sacramento',
        referenceId: '1610612758',
        ...insertDate,
      }, {
        name: 'Cleveland',
        referenceId: '1610612739',
        ...insertDate,
      }, {
        name: 'Boston',
        referenceId: '1610612738',
        ...insertDate,
      }, {
        name: 'Miami',
        referenceId: '1610612748',
        ...insertDate,
      }, {
        name: 'Atlanta',
        referenceId: '1610612737',
        ...insertDate,
      }, {
        name: 'Philadelphia',
        referenceId: '1610612755',
        ...insertDate,
      }, {
        name: 'San Antonio',
        referenceId: '1610612759',
        ...insertDate,
      }, {
        name: 'Dallas',
        referenceId: '1610612742',
        ...insertDate,
      }, {
        name: 'Orlando',
        referenceId: '1610612753',
        ...insertDate,
      }, {
        name: 'Oklahoma City',
        referenceId: '1610612760',
        ...insertDate,
      }, {
        name: 'Milwaukee',
        referenceId: '1610612749',
        ...insertDate,
      }, {
        name: 'Washington',
        referenceId: '1610612764',
        ...insertDate,
      }, {
        name: 'Golden State',
        referenceId: '1610612744',
        ...insertDate,
      }, {
        name: 'LA',
        referenceId: '1610612746',
        ...insertDate,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Teams', null, {})
  ),
};
