const db = require("../db");

// getItems - Get object of all Items
const getAllItems = () => {
  return db
    // .query(`SELECT * FROM items;`)
    // .query(`SELECT items.*, bids.bid_value FROM items JOIN bids on items.id = bids.item_id ORDER BY bids.bid_value DESC;`)
    .query(`SELECT items.*, MAX(bids.bid_value) AS highest_bid FROM items JOIN bids ON items.id = bids.item_id GROUP BY items.id;`)
    .then((items) => {
      return items.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:1 " + error);
    });
};

// getItem - Get object of one Item
const getItemDetails = (id) => {
  return db
    .query(
      `SELECT items.*, 
    bids.*
  FROM items
  JOIN bids ON items.id = bids.item_id 
  WHERE items.id = ${id}
  ORDER BY bids.bid_value DESC;`
    )
    .then((itemInfo) => {
      // I am making a second db query within our .then to obtain all the images for certain item
      return (
        db
          .query(
            `SELECT img_url
        FROM item_images
        WHERE item_id = ${id};`
          )
          // then I add another .then that creates an img_url key in the object at itemInfo.rows[0] and sets it to the result of the second db query for images
          .then((images) => {
            itemInfo.rows[0].img_url = images.rows;
            return itemInfo.rows;
          })
      );
    })
    .catch(function (xhr, status, error) {
      console.log("Error:2 " + error);
    });
};

// createItem - Creates new item
const createItem = (item) => {
  const queryObj = {
    text: `INSERT INTO items (user_id, category_id, title, description, condition, end_date) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    values: [
      item.user_id,
      item.category,
      item.title,
      item.description,
      item.condition,
      item.endDate,
    ],
  };

  return db
    .query(queryObj)
    .then((itemInfo) => {
      return itemInfo.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:3 " + error);
    });
};

// editItem
const editItem = (item) => {
  const queryObj = {
    text: `UPDATE items
    SET category_id = $1, title = $2, description = $3, condition = $4, end_date = $5
    WHERE id = $6
    RETURNING *;`,
    values: [
      item.category,
      item.title,
      item.description,
      item.condition,
      item.endDate,
      item.id
    ]
  };

  return db
    .query(queryObj)
    .then((itemInfo) => {
      return itemInfo.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error! db query failed");
    });
};


// getItemsEndingSoon 
const getItemsEndingSoon = () => {
  return db
    .query("SELECT * FROM items WHERE end_date >= NOW() ORDER BY end_date ASC LIMIT 10;")
    .then((items) => {
      return items.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:4 " + error);
      console.log(xhr);
      console.log(status);
    });
};

// getItem - Returns a single item with username 
const getItem = (id) => {
  return db
    .query(`SELECT items.* 
    FROM items 
    WHERE items.id = ${id};`)
    .then((item) => {
      return item.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error:4 " + error);
      console.log(xhr);
      console.log(status);
    });
};


module.exports = {
  getItem,
  getAllItems,
  getItemDetails,
  createItem,
  editItem,
  getItemsEndingSoon
};
