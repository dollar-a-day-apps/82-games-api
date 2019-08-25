const { userSchema } = require('../fields/index');

const {
  id,
} = userSchema;

module.exports = {
  fetchUserSchema: {
    rules: {
      id: id.required(),
    },
    hints: {
      id: 'Invalid user identifier',
    },
  },
};
