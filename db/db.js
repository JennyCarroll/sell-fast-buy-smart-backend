// load .env data into process.env
require("dotenv").config();

// PG database client/connection setup
const { Pool } = require("pg");

const dbParams = {
  connectionString: process.env.DB_STRING,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  //set ssl to true for Digital Ocean
  // ssl: true,
  // user: 'labber',
  // password: 'labber'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
