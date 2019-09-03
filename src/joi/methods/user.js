const { userSchema } = require('../fields/index');

const { email } = userSchema;

module.exports = {
  authenticateUserSchema: {
    rules: {
      email: email.required(),
    },
    hints: {},
  },
};
