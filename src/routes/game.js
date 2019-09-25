const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const {
  fetchGamesByAthleteId,
  fetchGameStatisticById,
} = require('../controllers');

const router = Router();

// Fetch games by teamId
router.get('/athlete/:athleteId', routeHandler(fetchGamesByAthleteId));
router.get('/statistic/:id', routeHandler(fetchGameStatisticById));

module.exports = router;
