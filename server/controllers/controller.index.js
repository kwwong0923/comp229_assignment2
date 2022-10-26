const express = require("express");
const app = express();

module.exports.displayHomepage = (req, res) =>
{
    res.render("index",{ title: "Homepage"});
};