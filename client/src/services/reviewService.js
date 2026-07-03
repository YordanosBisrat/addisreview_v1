import api from './api';

/**
 * Fetch all reviews for a business.
 */
export async function getReviews(businessId) {
  const { data } = await api.get(`/businesses/${businessId}/reviews`);
  return data.data;
}

/**
 * Submit a new review for a business.
 * payload: { authorName, rating, comment }
 */
export async function submitReview(businessId, payload) {
  const { data } = await api.post(`/businesses/${businessId}/reviews`, payload);
  return data.data;
}
