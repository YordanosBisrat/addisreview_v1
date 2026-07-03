const businessModel = require('../models/businessModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * GET /api/businesses
 * Optional query param: ?category=<categoryId>
 */
const getAllBusinesses = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const categoryId = category ? Number(category) : undefined;

  if (category && Number.isNaN(categoryId)) {
    throw new ApiError(400, 'category must be a valid numeric id');
  }

  const businesses = businessModel.getAll({ categoryId });
  res.status(200).json({ success: true, count: businesses.length, data: businesses });
});

/**
 * GET /api/businesses/:id
 */
const getBusinessById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    throw new ApiError(400, 'Business id must be a number');
  }

  const business = businessModel.getById(id);
  if (!business) {
    throw new ApiError(404, `Business with id ${id} not found`);
  }

  const ratingDistribution = businessModel.getRatingDistribution(id);

  res.status(200).json({
    success: true,
    data: { ...business, rating_distribution: ratingDistribution },
  });
});

module.exports = { getAllBusinesses, getBusinessById };
