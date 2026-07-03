-- ============================================================
-- በልኬ (Belke) Database Schema
-- Normalized to 3NF:
--   - categories are stored once and referenced by id (no repeated
--     category strings on every business row)
--   - reviews reference businesses via a foreign key rather than
--     duplicating business info inside each review
--   - average rating is DERIVED (computed with SQL AVG()) rather than
--     stored redundantly on the businesses table, so it can never
--     go out of sync with the underlying reviews
-- ============================================================

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS businesses;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL UNIQUE,
  icon        TEXT NOT NULL,        -- react-icon key, e.g. "FaUtensils"
  description TEXT
);

CREATE TABLE businesses (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  address     TEXT NOT NULL,
  city        TEXT NOT NULL DEFAULT 'Addis Ababa',
  latitude    REAL,
  longitude   REAL,
  image_url   TEXT NOT NULL,
  price_range TEXT,                 -- e.g. "$", "$$", "$$$"
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE reviews (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id  INTEGER NOT NULL,
  author_name  TEXT NOT NULL,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT NOT NULL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

CREATE INDEX idx_businesses_category ON businesses(category_id);
CREATE INDEX idx_reviews_business ON reviews(business_id);
CREATE INDEX idx_businesses_name ON businesses(name);
