const db = require("../db");

// getImages - Get object of the first image of each item
const getFirstImage = () => {
  return db
    .query(
      `SELECT DISTINCT ON (item_id) id, item_id, img_url FROM item_images ORDER BY item_id, id;`
    )
    .then((images) => {
      return images.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

const createImage = (imageInfo) => {
  const query = {
    text: `INSERT INTO item_images ( item_id, img_url ) 
      VALUES ($1, $2) RETURNING *;`,
    values: [imageInfo.item_id, imageInfo.img_url],
  };
  return db
    .query(query)
    .then((imageInfo) => {
      return imageInfo.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};
module.exports = {
  getFirstImage,
  createImage
};
