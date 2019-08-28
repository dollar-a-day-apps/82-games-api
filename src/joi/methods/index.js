const athleteMethodSchema = require('./athlete');
const gameMethodSchema = require('./game');

module.exports = {
  ...athleteMethodSchema,
  ...gameMethodSchema,
};
