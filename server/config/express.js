// 3rd party moduels
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// require own modules
const db = require("./db");

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


// require all the route js file
let indexRouter = require("../routes/route.index");
let contactRouter = require("../routes/route.contact");
let businessRouter = require("../routes/route.business");

//-------set up for ejs---------
// view engine setup
const viewsLocation = path.join(__dirname, "../views");
app.set("views", viewsLocation);
app.set("view engine", "ejs");
// app.set('views', '../views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// locate the static file
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));
// method override
app.use(methodOverride("_method"));
// grabs information from the post data form.
app.use(bodyParser.urlencoded({ extended: true }));

// setup express session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration
// create a User Model Instance
let userModel = require('../models/model.user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());


// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = db.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);


// handling website routing
app.use("/", indexRouter);
app.use("/contact", contactRouter);
app.use("/business", businessRouter);

module.exports = app;







