const express = require("express");
const erouter = express.Router();
const imagesdb = require("../db/queries/imagesdb");

// GET /images   - Gets all images
erouter.get("/first", (req, res) => {
  imagesdb.getFirstImage().then((images) => {
    res.send(images);
  });
});

module.exports = erouter;
