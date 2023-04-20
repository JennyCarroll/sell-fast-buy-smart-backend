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
      console.log("Error:1 " + error);
      console.log(status)
      console.log(xhr)
    });
};

module.exports = {
  getUserRatings
};