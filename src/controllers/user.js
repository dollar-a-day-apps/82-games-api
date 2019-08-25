const {
  User,
} = require('../database/models');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const { fetchUserSchema } = require('../joi/methods');
const { routeErrorMessages } = require('../util/constants');

module.exports = {
  fetchUser: async (req) => {
    const { params } = req;

    await validateInput(params, fetchUserSchema);

    const { id } = params;

    try {
      const user = await User.findOne({
        where: { id },
        plain: true,
      });

      return user;
    } catch (err) {
      return throwError(new Error(routeErrorMessages.FETCH_USER_FAILED), {
        fn: 'fetchUser',
        source: 'src/controller/user.js',
        payload: JSON.stringify({
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
};
