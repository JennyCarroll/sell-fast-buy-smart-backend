// load .env data into process.env
require("dotenv").config();

// PG database client/connection setup
const { Pool } = require("pg");

let fs = require("fs");

//took the original connection string and added on the root certificate DB_CA_CERT environment variable that in on Digital Ocean
// const conString = process.env.DB_STRING + "&sslrootcert=../ca-certificate.crt";

const dbParams = {
  // //this connects us directly to the Digital Ocean db
  // connectionString:
  //   "postgresql://doadmin:AVNS_aG9ulPC4xnym9pPn9_J@db-postgresql-tor1-25578-do-user-13968025-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //set ssl to true for Digital Ocean
  ssl: {
    rejectUnauthorized: false,
  },
  // ssl: {
  //   //i added cert below
  //   ca_cert: fs.readFileSync("db/ca-certificate.crt").toString(),
  // },
  // ssl: true,
  // //I also added this
  // sslValidate: false,
  // user: 'labber',
  // password: 'labber'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
