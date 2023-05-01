const db = require('../db');

const getBids = () => {
  return db
    .query(`SELECT bids.*, item_images.img_url FROM bids JOIN item_images ON bids.item_id = item_images.item_id AND bids.id NOT IN (SELECT MIN(id) FROM bids GROUP BY item_id)`)
    .then(bids => {
      return bids.rows;
    })
    .catch(function () {
      console.log("Error retrieving bids");
    });
};

const getBidsForUser = (userId) => {
  return db
    .query(`SELECT bids.item_id, MAX(bids.bid_value) AS highest_bid, (SELECT img_url FROM item_images WHERE item_id = bids.item_id ORDER BY id ASC LIMIT 1) AS img_url
  FROM bids WHERE bids.user_id = ${userId} GROUP BY bids.item_id;`)
    .then(bids => {
      return bids.rows;
    })
    .catch(function () {
      console.log("Error retrieving bids");
    });
};

const getHighestBids = (userId) => {
  return db
    .query(`SELECT item_id, MAX(bid_value) AS highest_bid FROM bids GROUP BY item_id;`)
    .then(highestBids => {
      return highestBids.rows;
    })
    .catch(function () {
      console.log("Error retrieving bids");
    });
};


const createBid = (bidInfo) => {
  const queryObj = {
    text: `INSERT INTO bids (user_id, item_id, bid_value) 
      VALUES ($1, $2, $3) RETURNING *;`,
    values: [bidInfo.user_id, bidInfo.item_id, bidInfo.bid_value],
  };
  return db
    .query(queryObj)
    .then((bidInfo) => {
      return bidInfo.rows;
    })
    .catch(function () {
      console.log("Error retrieving bid info");
    });
};


module.exports = {
  getBids,
  getBidsForUser,
  createBid,
  getHighestBids
};
