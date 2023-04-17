const db = require("../db");

// getItems - Get object of all Items
const getAllUsers = () => {
  return db
    .query(
      `SELECT * FROM users;`
    )
    .then((users) => {
      return users.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

// getItem - Returns a single item with username 
const getUser = (id) => {
  return db
    .query(`SELECT * 
    FROM users 
    WHERE users.id = ${id};`)
    .then((user) => {
      return user.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:4 " + error);
      console.log(xhr);
      console.log(status);
    });
};

module.exports = {
  getAllUsers,
  getUser
};