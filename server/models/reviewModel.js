const db = require('../config/db');

function getByBusinessId(businessId) {
  return db
    .prepare(
      `SELECT id, business_id, author_name, rating, comment, created_at
       FROM reviews
       WHERE business_id = ?
       ORDER BY datetime(created_at) DESC`
    )
    .all(businessId);
}

function create({ businessId, authorName, rating, comment }) {
  const info = db
    .prepare(
      `INSERT INTO reviews (business_id, author_name, rating, comment)
       VALUES (?, ?, ?, ?)`
    )
    .run(businessId, authorName, rating, comment);

  return db
    .prepare('SELECT id, business_id, author_name, rating, comment, created_at FROM reviews WHERE id = ?')
    .get(info.lastInsertRowid);
}

module.exports = {
  getByBusinessId,
  create,
};
