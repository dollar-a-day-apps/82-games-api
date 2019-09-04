const user = require('./user');
const team = require('./team');
const athlete = require('./athlete');
const game = require('./game');

module.exports = {
  ...user,
  ...team,
  ...athlete,
  ...game,
};
