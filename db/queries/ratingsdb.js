const db = require("../db");

const getUserRatings = (userId) => {
  console.log("userquery", userId)
  const query = {
    text: 'SELECT SUM(review_score) FROM user_reviews WHERE reviewed_id = $1',
    values: [userId.id]
  };
  return db
    .query(query)
    .then((res) => {
      console.log('sum', res.rows[0].sum)
      return res.rows[0].sum;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:1 " + error);
    });
};

const getUserRatingsCount = (userId) => {
  console.log(userId)
  const query = {
    text: 'SELECT COUNT(review_score) FROM user_reviews WHERE reviewed_id = $1',
    values: [userId.id]
  };
  return db
    .query(query)
    .then((res) => {
      console.log('count', res.rows[0].count)
      return res.rows[0].count;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:1 " + error);
    });
  }

const createRating = (ratingsObj) => {
  const info = ratingsObj.params
  console.log(info)
  const query = {
    text: `INSERT INTO user_reviews (reviewer_id, reviewed_id, review_score) VALUES ($1, $2, $3) RETURNING *`,
    values: [info.reviewerId, info.reviewedId, info.rating]
  };
    const query2 = {
    text: 'SELECT SUM(review_score) FROM user_reviews WHERE reviewed_id = $1',
    values: [info.reviewedId]
    }
  return db
    .query(query)
    .then((res) => {
      return res.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:2 " + error);
      console.log("Error:2 " + status);
      console.log("Error:2 " + xhr);
    });
};

module.exports = {
  getUserRatings,
  createRating,
  getUserRatingsCount
};