const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const {
  fetchGamesByTeamId,
  fetchGameStatisticById,
} = require('../controllers');

const router = Router();

// Fetch games by teamId
router.get('/team/:teamId', routeHandler(fetchGamesByTeamId));
router.get('/statistic/:id', routeHandler(fetchGameStatisticById));

module.exports = router;
