require("dotenv").config();
let fs = require("fs");

const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //ssl for Digital Ocean
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  ssl: false,
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
