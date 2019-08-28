const { Router } = require('express');
const routeHandler = require('../middleware/route-handler');
const { fetchTeams } = require('../controllers');

const router = Router();

router.get('/', routeHandler(fetchTeams));

module.exports = router;
