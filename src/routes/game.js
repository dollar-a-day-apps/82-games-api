const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const { fetchGamesByTeamId } = require('../controllers');

const router = Router();

// Fetch games by teamId
router.get('/team/:teamId', routeHandler(fetchGamesByTeamId));

module.exports = router;
