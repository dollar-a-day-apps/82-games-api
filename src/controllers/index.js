const team = require('./team');
const athlete = require('./athlete');
const game = require('./game');

module.exports = {
  ...team,
  ...athlete,
  ...game,
};
