const express = require("express");
const erouter = express.Router();
const categoriesdb = require("../db/queries/categoriesdb");

// GET /categories   - Gets all categories
erouter.get("/", (req, res) => {
  categoriesdb.getCategories().then((categories) => {
    res.send(categories);
  });
});
// GET /categories/:categoryId   - Gets all items for category
erouter.get("/:categoryId", (req, res) => {
  let categoryId = req.query.id
  categoriesdb.getItemsInCategory(categoryId).then((itemsInCategory) => {
    res.send(itemsInCategory);
  });
});


module.exports = erouter;
