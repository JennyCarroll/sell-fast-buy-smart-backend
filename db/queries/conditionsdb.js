const db = require('../db');

const getConditions = () => {
  return db
    .query('SELECT * FROM conditions')
    .then(conditions => {
      return conditions.rows;
    })
    .catch(function () {
      console.log("Error retrieving conditions");
    });
};

module.exports = {
  getConditions
};
