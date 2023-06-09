DROP TABLE IF EXISTS user_reviews CASCADE;
CREATE TABLE user_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reviewed_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  review_score INTEGER NOT NULL
);