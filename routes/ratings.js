const express = require("express");
const erouter = express.Router();
const ratingsdb = require("../db/queries/ratingsdb");

erouter.get('/:userId', (req, res) => {
  let ratingsObj = {};
  ratingsdb.getUserRatings(req.query)
    .then((userRatings) => {
      ratingsObj.sum = userRatings;
      return ratingsdb.getUserRatingsCount(req.query)
        .then((userRatingsCount) => {
          ratingsObj.count = userRatingsCount;
          res.send(ratingsObj);
        });
    });
});

erouter.post('/:userId', (req, res) => {
  let ratingsObj = {};
  ratingsdb.createRating(req.body)
    .then(() => {
      let user = { id: req.body.params.reviewedId };
      return ratingsdb.getUserRatings(user)
        .then((userRatings) => {
          ratingsObj.sum = userRatings;
          return ratingsdb.getUserRatingsCount(user)
            .then((userRatingsCount) => {
              ratingsObj.count = userRatingsCount;
              res.send(ratingsObj);
            });
        });
    });
});



module.exports = erouter;