const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const {
  fetchAthleteById,
  fetchAthletesByTeamId,
  fetchAthleteStatisticByGameId,
  fetchAthleteTweets,
} = require('../controllers');

const router = Router();

// Fetch athlete by id
router.get('/profile/:id', routeHandler(fetchAthleteById));

// Fetch athletes by teamId
router.get('/team/:teamId', routeHandler(fetchAthletesByTeamId));

// Fetch game statistic for the specified athlete and game identifiers
router.get('/statistic/', routeHandler(fetchAthleteStatisticByGameId));

// Fetch tweets by the specified athlete (optionally with a date range and pagination params)
router.get('/tweets/', routeHandler(fetchAthleteTweets));

module.exports = router;
