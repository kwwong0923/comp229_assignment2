// contact routing
// require express module
const express =require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// require the contact controller
const contactController = require("../controllers/controller.contact");

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

router.get("/", contactController.displayContactPage);
router.post("/", contactController.processContactPage);

router.get("/list", contactController.displayContactList);

// edit page
// GET - display the tagert contact info
router.get("/edit/:id",   contactController.displayEditPage);
// POST - replace the value by user input
router.post("/edit/:id",  contactController.processEditPage);

// GET - delete info
router.get("/delete/:id",  contactController.processDeletePage);

module.exports = router;