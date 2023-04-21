// load .env data into process.env
require("dotenv").config();

// PG database client/connection setup
const { Pool } = require("pg");

//took the original connection string and added on the root certificate DB_CA_CERT environment variable that in on Digital Ocean
const conString =
  process.env.DB_STRING + "&sslrootcert=" + process.env.DB_CA_CERT;

const dbParams = {
  // //this connects us directly to the Digital Ocean db
  connectionString: conString,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  //set ssl to true for Digital Ocean
  ssl: true,
  // user: 'labber',
  // password: 'labber'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
