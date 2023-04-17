const express = require("express");
const erouter = express.Router();
const usersdb = require('../db/queries/usersdb');


// GET /users   - Gets all users
erouter.get("/", (req, res) => {
  usersdb.getAllUsers().then((users) => {
    res.send(users);
  });
});




module.exports = erouter;