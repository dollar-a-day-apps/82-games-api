const team = require('./team');
const athlete = require('./athlete');

module.exports = {
  ...team,
  ...athlete,
};
