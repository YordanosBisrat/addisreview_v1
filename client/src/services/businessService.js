import api from './api';

/**
 * Fetch all businesses, optionally filtered by category id.
 */
export async function getBusinesses({ categoryId } = {}) {
  const params = categoryId ? { category: categoryId } : {};
  const { data } = await api.get('/businesses', { params });
  return data.data;
}

/**
 * Fetch a single business by id (includes rating_distribution).
 */
export async function getBusinessById(id) {
  const { data } = await api.get(`/businesses/${id}`);
  return data.data;
}

/**
 * Search businesses by name or category.
 */
export async function searchBusinesses(query) {
  const { data } = await api.get('/search', { params: { q: query } });
  return data.data;
}
