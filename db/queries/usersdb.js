const db = require("../db");

// getAllUsers - Get object of all users
const getAllUsers = () => {
  return db
    .query(
      `SELECT * FROM users;`
    )
    .then((users) => {
      return users.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error - getAllUsers " + error);
    });
};

// getUser - Returns a single user 
const getUser = (id) => {
  return db
    .query(`SELECT * 
    FROM users 
    WHERE users.id = ${id};`)
    .then((user) => {
      return user.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error - getUser " + error);
    });
};

module.exports = {
  getAllUsers,
  getUser
};