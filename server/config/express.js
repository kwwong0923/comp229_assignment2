const express = require("express");
const app = express();

const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
// require own modules
const db = require("./mongoose");

let indexRouter = require("../routes/route.index");

//-------set up for ejs---------
// view engine setup
const viewsLocation = path.join(__dirname, "../views");
app.set("views", viewsLocation);
app.set("view engine", "ejs");
// app.set('views', '../views');


// locate the static file
const publicLocation = path.join(__dirname, "../../public");
console.log(publicLocation)
app.use(express.static(publicLocation));
// console.log(path.join(__dirname + "../../public"));
app.use(express.static(path.join(__dirname, "../../node_modules")));




// require routing js file

// handling website routing
app.use("/", indexRouter);


module.exports = app;







