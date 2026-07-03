const reviewModel = require('../models/reviewModel');
const businessModel = require('../models/businessModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * GET /api/businesses/:id/reviews
 */
const getReviewsForBusiness = asyncHandler(async (req, res) => {
  const businessId = Number(req.params.id);
  if (Number.isNaN(businessId)) {
    throw new ApiError(400, 'Business id must be a number');
  }

  if (!businessModel.exists(businessId)) {
    throw new ApiError(404, `Business with id ${businessId} not found`);
  }

  const reviews = reviewModel.getByBusinessId(businessId);
  res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

/**
 * POST /api/businesses/:id/reviews
 * Body: { authorName, rating, comment }
 */
const createReview = asyncHandler(async (req, res) => {
  const businessId = Number(req.params.id);
  if (Number.isNaN(businessId)) {
    throw new ApiError(400, 'Business id must be a number');
  }

  if (!businessModel.exists(businessId)) {
    throw new ApiError(404, `Business with id ${businessId} not found`);
  }

  const { authorName, rating, comment } = req.body;
  const review = reviewModel.create({ businessId, authorName, rating, comment });

  res.status(201).json({ success: true, data: review });
});

module.exports = { getReviewsForBusiness, createReview };
