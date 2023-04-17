const db = require('../db');

const getBids = () => {
  return db
    .query(`SELECT bids.*, item_images.img_url FROM bids JOIN item_images ON bids.item_id = item_images.item_id AND bids.id NOT IN (SELECT MIN(id) FROM bids GROUP BY item_id)`)
    .then(bids => {
      console.log(bids.rows);
      return bids.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
      console.log("xhr: " + xhr);
      console.log("stat: " + status);
    });
};

const getBidsForUser = (userId) => {
  return db
    .query(`SELECT DISTINCT ON (bids.item_id) bids.*, item_images.img_url FROM bids JOIN item_images ON bids.item_id = item_images.item_id WHERE bids.user_id = ${userId}
  AND bids.id NOT IN (SELECT MIN(id) FROM bids GROUP BY item_id)`)
    .then(bids => {
      console.log("%%%", bids.rows);
      return bids.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


const createBid = (bidInfo) => {
  const query = {
    text: `INSERT INTO bids (user_id, item_id, bid_value) 
      VALUES ($1, $2, $3) RETURNING *;`,
    values: [bidInfo.user_id, bidInfo.item_id, bidInfo.bid_value],
  };
  return db
    .query(query)
    .then((bidInfo) => {
      return bidInfo.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


module.exports = {
  getBids,
  getBidsForUser,
  createBid
};
