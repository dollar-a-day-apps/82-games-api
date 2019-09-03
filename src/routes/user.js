const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
// const identifyUser = require('../middleware/identify-user');
const {
  // fetchUser,
  authenticateUser,
  // updateUserProfile,
} = require('../controllers');

const router = Router();

router.post('/authenticate', routeHandler(authenticateUser));

// Requires authenticated user from this point on
// router.use('/', identifyUser);

// router.post('/', routeHandler(fetchUser));
// router.post('/update', routeHandler(updateUserProfile));

module.exports = router;
