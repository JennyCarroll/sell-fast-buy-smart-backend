const express = require("express");
const erouter = express.Router();
const itemsdb = require("../db/queries/itemsdb");
const bidsdb = require("../db/queries/bidsdb");
const imagesdb = require("../db/queries/imagesdb");

// GET /items   - Gets all items
erouter.get("/", (req, res) => {
  itemsdb.getAllItems().then((items) => {
    res.send(items);
  });
});

// get 10 items ending soon
erouter.get("/ending-soon", (req, res) => {
  itemsdb.getItemsEndingSoon().then((items) => {
    res.send(items);
  });
});

// GET /items/:id   - Gets all details for one item (item, pics, bids)
erouter.get("/:id", (req, res) => {
  itemsdb.getItemDetails(req.params.id).then((itemDetails) => {
    res.send(itemDetails);
  });
});

// POST /items/new - Create new item and accompanying bid and image.
erouter.post("/new", (req, res) => {
  let newItem = {};
  itemsdb
    .createItem(req.body)
    .then((res) => {
      newItem = res[0];
      // Use info from the new item to populate the bid:
      const bidInfo = {
        user_id: newItem.user_id,
        item_id: newItem.id,
        bid_value: req.body.minBid,
      };
      bidsdb.createBid(bidInfo);
    })
    .then(() => {
      const imageInfo = {
        item_id: newItem.id,
        img_url: req.body.imgUrl,
      };
      imagesdb.createImage(imageInfo);
    })
    .then(() => {
      console.log(newItem);
      res.send(newItem);
    });
});

module.exports = erouter;
