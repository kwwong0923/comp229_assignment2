const express =require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// require the business controller
const businessController = require("../controllers/controller.business");

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

router.get("/", businessController.displayBusinessPage);

router.get("/add", businessController.displayAddPage);
router.post("/add", businessController.processAddPage);

router.get("/edit/:id", businessController.displayEditPage);
router.post("/edit/:id", businessController.processEditPage);

router.get("/delete/:id", businessController.processDeletePage);



module.exports = router;