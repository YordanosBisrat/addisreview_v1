const ApiError = require('../utils/ApiError');

/**
 * Validates the body of POST /api/businesses/:id/reviews.
 * Kept as its own middleware (rather than inline in the controller) so
 * validation rules are easy to find, test, and reuse.
 */
function validateReviewInput(req, res, next) {
  const { authorName, rating, comment } = req.body;
  const errors = [];

  if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
    errors.push('authorName is required');
  } else if (authorName.trim().length > 80) {
    errors.push('authorName must be 80 characters or fewer');
  }

  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    errors.push('rating must be an integer between 1 and 5');
  }

  if (!comment || typeof comment !== 'string' || !comment.trim()) {
    errors.push('comment is required');
  } else if (comment.trim().length > 1000) {
    errors.push('comment must be 1000 characters or fewer');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('; ')));
  }

  // Normalize before it reaches the controller
  req.body.authorName = authorName.trim();
  req.body.comment = comment.trim();
  req.body.rating = numericRating;

  next();
}

module.exports = { validateReviewInput };
