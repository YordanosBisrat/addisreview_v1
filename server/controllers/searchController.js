const businessModel = require('../models/businessModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * GET /api/search?q=<term>
 * Searches business name and category name.
 */
const searchBusinesses = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || !q.trim()) {
    throw new ApiError(400, 'Query parameter "q" is required');
  }

  const results = businessModel.search(q.trim());
  res.status(200).json({ success: true, count: results.length, data: results });
});

module.exports = { searchBusinesses };
