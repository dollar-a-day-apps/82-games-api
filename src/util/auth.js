const {
  ManagementClient,
  AuthenticationClient,
} = require('auth0');

const {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_MANAGEMENT_CLIENT_ID,
  AUTH0_MANAGEMENT_CLIENT_SECRET,
} = process.env;

const auth0Domain = AUTH0_DOMAIN || '82-games-dev.auth0.com';
const auth0ClientId = AUTH0_CLIENT_ID || '7gK88Bdn1eJb43UtM2DHRgfoXXMooAwk';
const auth0ManagementClientId = AUTH0_MANAGEMENT_CLIENT_ID || 'd3vsAOEEN8lSn09IUIdlTY8gxkzJXZZt';
const auth0ManagementClientSecret = AUTH0_MANAGEMENT_CLIENT_SECRET || 'IqRGl12zE2Y7eIcV6UfKIwI8wqR9BB8aAfnLPO3Ah7rKOMR6vtaCN_HgefEMw3yq';

const managementClient = new ManagementClient({
  domain: auth0Domain,
  clientId: auth0ManagementClientId,
  clientSecret: auth0ManagementClientSecret,
  scope: 'read:users update:users',
});

const authenticationClient = new AuthenticationClient({
  domain: auth0Domain,
  clientId: auth0ClientId,
});

module.exports = {
  managementClient,
  authenticationClient,
};
