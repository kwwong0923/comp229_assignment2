let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let db = require('../config/db');

// create the User Model instance
let userModel = require('../models/model.user');
let User = userModel.User; // alias

module.exports.displayHomepage = (req, res) =>
{
    res.render("index",{ title: "Homepage", username: req.user? req.user.username : ""});
};

module.exports.displayAboutMe = (req, res) =>
{
    res.render("index", { title: "About Me", username: req.user? req.user.username : ""});
};

module.exports.displayProjectPage = (req, res) =>
{
    res.render("index", { title: "Projects Page", username: req.user? req.user.username : ""});
};

module.exports.displayServicesPage = (req, res) =>
{
    res.render("index", { title: "Services Page", username: req.user? req.user.username : ""});
};

module.exports.displayErrorPage = (req, res) => 
{
    res.status(404);
    res.render("error", { title: "Error", message: "404 NOT FOUND" });
};

module.exports.displayLoginPage = (req, res, next) =>
{
    // check if the user is already logged in
    // if user didn't login
    if(!req.user)
    {
        res.render("auth/login", {
            title: "Login",
            messages: req.flash("loginMessage")
        })
    }
    else
    {
        return res.redirect("/");
    }
};

module.exports.processLoginPage = (req, res, next) =>
{
    console.log("processLoginPage");
    passport.authenticate("local", (err, user, info) => 
    {
        console.log("authenticate");
        if(err)
        {
            console.log("error");

            return next(err);
        }
        if(!user)
        {
            console.log("!user");

            req.flash("loginMessage", "Autherntication Error");
            return res.redirect("/login");
        }
        req.login(user, (err) => 
        {
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                username: user.username,
            }

            const authToken = jwt.sign(payload, db.Secret, {
                expiresIn: 604800 // 1 week
            });

            return res.redirect("/")
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => 
{
    if(!req.user)
    {
        res.render("auth/register",
        {
            title: "Register",
            messages: req.flash("registerMessage"),
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) =>
{
    let {username, password} = req.body;
    //instance a user object
    let newUser = new User(
        {
            username
        }
    );

    User.register(newUser, password, (err) => 
    {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
            });
        }
        else
        {
            return passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            });
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}