const express = require("express");
const erouter = express.Router();
const bidsdb = require("../db/queries/bidsdb");
const itemsdb = require('../db/queries/itemsdb');
const usersdb = require('../db/queries/usersdb');
const { socketBidNotify } = require('../websocket');

// GET /bids   - Gets all bids
erouter.get("/", (req, res) => {
  bidsdb.getBids().then((categories) => {
    res.send(categories);
  });
});
// GET /bidss/:userId   - Gets all bids for user
erouter.get("/:userId", (req, res) => {
  let userId = req.query.id;
  bidsdb.getBidsForUser(userId).then((bidsForUser) => {
    res.send(bidsForUser);
  });
});

// POST /bids/new - Create new bid
erouter.post("/new", (req, res) => {
  let returnObj = {};
  bidsdb.createBid(req.body)
    .then((bid) => {
      returnObj.bid = bid[0];
      return itemsdb.getItem(returnObj.bid.item_id);
    })
    .then((item) => {
      returnObj.item = item[0];
      return usersdb.getUser(returnObj.bid.user_id);
    })
    .then((user) => {
      returnObj.user = user[0];
      socketBidNotify(returnObj);
    });
}
);
module.exports = erouter;