// index routing
// require express module
const express =require("express");
const rotuer = express.Router();

// require the index controller
const indexController = require("../controllers/controller.index");

rotuer.get("/", indexController.displayHomepage);

// exports the rotuer object
module.exports = rotuer;