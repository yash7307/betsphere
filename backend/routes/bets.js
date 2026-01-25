const express = require('express');
const router = express.Router();
const {
    placeBet,
    getUserBets,
    getBet,
    cashOutBet,
    getBettingStats
} = require('../controllers/betController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
    .post(placeBet)
    .get(getUserBets);

router.get('/stats', getBettingStats);

router.route('/:id')
    .get(getBet);

router.post('/:id/cashout', cashOutBet);

module.exports = router;
