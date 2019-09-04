const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const { authenticateUser } = require('../controllers');

const router = Router();

router.post('/authenticate', routeHandler(authenticateUser));

module.exports = router;
