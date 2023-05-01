const db = require("../db");

const getUserRatings = (userId) => {
  const query = {
    text: 'SELECT SUM(review_score) FROM user_reviews WHERE reviewed_id = $1',
    values: [userId.id]
  };
  return db
    .query(query)
    .then((res) => {
      return res.rows[0].sum;
    })
    .catch(function (xhr, status, error) {
      console.log("Error - getUserRatings " + error);
    });
};

const getUserRatingsCount = (userId) => {
  const query = {
    text: 'SELECT COUNT(review_score) FROM user_reviews WHERE reviewed_id = $1',
    values: [userId.id]
  };
  return db
    .query(query)
    .then((res) => {
      return res.rows[0].count;
    })
    .catch(function (xhr, status, error) {
      console.log("Error - getUserRatingsCount " + error);
    });
};

const createRating = (ratingsObj) => {
  const info = ratingsObj.params;
  const query = {
    text: `INSERT INTO user_reviews (reviewer_id, reviewed_id, review_score) VALUES ($1, $2, $3) RETURNING *`,
    values: [info.reviewerId, info.reviewedId, info.rating]
  };
  return db
    .query(query)
    .then((res) => {
      return res.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error - createRating " + error);
    });
};

module.exports = {
  getUserRatings,
  createRating,
  getUserRatingsCount
};