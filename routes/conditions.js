const express = require("express");
const erouter = express.Router();
const conditionsdb = require("../db/queries/conditionsdb");

// GET /conditions   - Gets all conditions
erouter.get("/", (req, res) => {
  conditionsdb.getConditions().then((conditions) => {
    // Some comment that explains the code
    res.send(conditions);
  });
});



module.exports = erouter;
