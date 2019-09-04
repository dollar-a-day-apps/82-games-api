const uuidv4 = require('uuid/v4');
const { Fan } = require('../database/models');
const { managementClient } = require('../util/auth');
const throwError = require('../util/throw-error');
const validateInput = require('../joi/validate-input');
const { sanitizeObject } = require('../util/sanitize-output');
const { authenticateUserSchema } = require('../joi/methods/index');
const { routeErrorMessages } = require('../util/constants');

module.exports = {
  authenticateUser: async (req) => {
    const {
      body,
      user: { sub: authId },
    } = req;

    await validateInput(body, authenticateUserSchema);

    let errorMessage = routeErrorMessages.AUTHENTICATE_USER_FAILED;

    const { email } = body;

    try {
      // Check the email confirmation status from Auth0
      // and see if the email has already been confirmed
      const user = await managementClient.getUser({ id: authId });

      if (!user) {
        errorMessage = 'User not found';

        return throwError(new Error(errorMessage), {
          fn: 'authenticateUser',
          source: 'src/controller/user.js',
          payload: JSON.stringify({
            authId,
            request: {
              url: req.url,
              rawHeaders: req.rawHeaders,
              body: req.body,
            },
          }),
        }, {
          requestUrl: req.url,
          requestHost: req.headers.host,
        });
      }

      // Get additional registration info
      const {
        username,
        user_metadata = {},
        email_verified,
      } = user;
      const {
        profilePictureUrl = '',
        name = '',
      } = user_metadata;

      let [authenticatedUser] = await Fan.findOrCreate({ /* eslint prefer-const: 0 */
        where: { email },
        defaults: {
          id: uuidv4(), // New userId generated via UUID V4 generator
          username,
          authId,
        },
      });

      // Combine our local db user data with the metadata stored in Auth0
      return {
        ...sanitizeObject(authenticatedUser),
        emailVerified: email_verified,
        profilePictureUrl,
        name,
      };
    } catch (err) {
      console.log(err);
      return throwError(new Error(errorMessage), {
        fn: 'authenticateUser',
        source: 'src/controller/user.js',
        payload: JSON.stringify({
          authId,
          errorDetail: err.message,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });
    }
  },
};
