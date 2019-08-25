const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const { fetchUser } = require('../controllers');

const router = Router();

// User specific routes
router.get('/:id', routeHandler(fetchUser));

module.exports = router;
