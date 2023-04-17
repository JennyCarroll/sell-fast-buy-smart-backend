const db = require('../db');

const getConditions = () => {
  return db
    .query('SELECT * FROM conditions')
    .then(conditions => {
      return conditions.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

module.exports = {
  getConditions
};
