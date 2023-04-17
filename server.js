// Imports
const express = require("express");
const http = require('http');
const { startWebSocket } = require('./websocket');
const morgan = require("morgan"); // Morgan documents network traffic to console.
const cors = require("cors");

// Create app, websocket and db instances
const port = 8001; // Define our base URL as http:\\localhost:8001
const app = express();
const server = http.createServer(app);
startWebSocket(server);
const db = require("./db/db");

// Middleware
// Morgan documents network traffic to console.
app.use(morgan("dev"));
// Converts url to readable text
app.use(express.urlencoded({ extended: false }));
// Converts data package to json if applicable
app.use(express.json());
// Prevents cors errors
app.use(cors());
// loads static if applicable. Currently routed to build
app.use(express.static("../client/build"));


//EXPRESS
// Separated Routes for each Resource
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");
const imageRoutes = require("./routes/images");
const categoryRoutes = require("./routes/categories");
const conditionRoutes = require("./routes/conditions");
const bidRoutes = require("./routes/bids");

//Endpoints:
app.use("/items", itemRoutes);
// app.use("/items/:id", itemRoutes);
app.use("/users", userRoutes);
app.use("/images", imageRoutes);
app.use("/categories", categoryRoutes);
app.use("/conditions", conditionRoutes);
app.use("/bids", bidRoutes);


// PORT LISTEN
server.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
