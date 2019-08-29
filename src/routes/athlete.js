const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const {
  fetchAthleteById,
  fetchAthletesByTeamId,
} = require('../controllers');

const router = Router();

// Fetch athlete by id
router.get('/:id', routeHandler(fetchAthleteById));

// Fetch athletes by teamId
router.get('/team/:teamId', routeHandler(fetchAthletesByTeamId));

module.exports = router;
