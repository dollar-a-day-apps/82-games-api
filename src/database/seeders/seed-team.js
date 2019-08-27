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
        name: 'Brooklyn Nets',
        ...insertDate,
      }, {
        name: 'Franca Franca',
        ...insertDate,
      }, {
        name: 'Los Angeles Lakers',
        ...insertDate,
      }, {
        name: 'Toronto Raptors',
        ...insertDate,
      }, {
        name: 'Minnesota Timberwolves',
        ...insertDate,
      }, {
        name: 'New York Knicks',
        ...insertDate,
      }, {
        name: 'Memphis Grizzlies',
        ...insertDate,
      }, {
        name: 'Indiana Pacers',
        ...insertDate,
      }, {
        name: 'Houston Rockets',
        ...insertDate,
      }, {
        name: 'Detroit Pistons',
        ...insertDate,
      }, {
        name: 'New Orleans Pelicans',
        ...insertDate,
      }, {
        name: 'Portland Trail Blazers',
        ...insertDate,
      }, {
        name: 'Phoenix Suns',
        ...insertDate,
      }, {
        name: 'Utah Jazz',
        ...insertDate,
      }, {
        name: 'Denver Nuggets',
        ...insertDate,
      }, {
        name: 'Chicago Bulls',
        ...insertDate,
      }, {
        name: 'Charlotte Hornets',
        ...insertDate,
      }, {
        name: 'Sacramento Kings',
        ...insertDate,
      }, {
        name: 'Cleveland Cavaliers',
        ...insertDate,
      }, {
        name: 'Boston Celtics',
        ...insertDate,
      }, {
        name: 'Miami Heat',
        ...insertDate,
      }, {
        name: 'Atlanta Hawks',
        ...insertDate,
      }, {
        name: 'Philadelphia 76ers',
        ...insertDate,
      }, {
        name: 'San Antonio Spurs',
        ...insertDate,
      }, {
        name: 'Dallas Mavericks',
        ...insertDate,
      }, {
        name: 'Orlando Magic',
        ...insertDate,
      }, {
        name: 'Oklahoma City Thunder',
        ...insertDate,
      }, {
        name: 'Milwaukee Bucks',
        ...insertDate,
      }, {
        name: 'Washington Wizards',
        ...insertDate,
      }, {
        name: 'Golden State Warriors',
        ...insertDate,
      }, {
        name: 'LA Clippers',
        ...insertDate,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('Teams', null, {})
  ),
};
