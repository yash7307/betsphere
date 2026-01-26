const express = require('express');
const router = express.Router();
const {
    getLiveMatches,
    getUpcomingMatches,
    getMatchDetails
} = require('../controllers/cricketController');

// Public routes - no authentication required
router.get('/live', getLiveMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/match/:matchKey', getMatchDetails);

module.exports = router;
