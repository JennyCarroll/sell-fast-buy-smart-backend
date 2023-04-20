const express = require("express");
const erouter = express.Router();
const ratingsdb = require("../db/queries/ratingsdb");

erouter.get('/:userId', (req, res) => {
  console.log('req.query', req.query)
  ratingsdb.getUserRatings(req.query).then((userRatings) => {
    res.send(userRatings)
  })
})


module.exports = erouter;