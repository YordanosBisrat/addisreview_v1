const express = require('express');
const router = express.Router();

const { getAllBusinesses, getBusinessById } = require('../controllers/businessController');
const { getReviewsForBusiness, createReview } = require('../controllers/reviewController');
const { validateReviewInput } = require('../middleware/validate');

// GET /api/businesses
router.get('/', getAllBusinesses);

// GET /api/businesses/:id
router.get('/:id', getBusinessById);

// GET /api/businesses/:id/reviews
router.get('/:id/reviews', getReviewsForBusiness);

// POST /api/businesses/:id/reviews
router.post('/:id/reviews', validateReviewInput, createReview);

module.exports = router;
