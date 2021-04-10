const express = require("express");
const cRoute = require("./cars/cars-router");

const server = express();

// DO YOUR MAGIC
server.use(express.json());
server.use("/api/cars", cRoute);

module.exports = server;
