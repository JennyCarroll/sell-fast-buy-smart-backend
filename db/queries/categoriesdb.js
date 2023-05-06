const db = require('../db');

const getCategories = () => {
  return db
    .query('SELECT * FROM categories')
    .then(categories => {
      return categories.rows;
    })
    .catch(function () {
      console.log("Error retrieving categories");
    });
};

const getItemsByCategory = (categoryId) => {
  return db
    .query(`SELECT items.*, item_images.img_url FROM items
  JOIN (SELECT DISTINCT ON (item_id) id, item_id, img_url FROM item_images ORDER BY item_id, id) 
  item_images ON items.id = item_images.item_id
  WHERE items.category_id = ${categoryId}`)
    .then(items => {
      return items.rows;
    })
    .catch(function () {
      console.log("Error retrieving bids");
    });;
};

module.exports = {
  getCategories,
  getItemsByCategory: getItemsByCategory
};
