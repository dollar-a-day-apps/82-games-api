const athleteMethodSchema = require('./athlete');
const userMethodSchema = require('./user');
const gameMethodSchema = require('./game');

module.exports = {
  ...athleteMethodSchema,
  ...userMethodSchema,
  ...gameMethodSchema,
};
