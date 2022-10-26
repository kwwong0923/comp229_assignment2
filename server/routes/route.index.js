// index routing
// require express module
const express =require("express");
const router = express.Router();

// require the index controller
const indexController = require("../controllers/controller.index");

// homepage
router.get("/", indexController.displayHomepage);
router.get("/home", indexController.displayHomepage);

// about me
router.get("/about", indexController.displayAboutMe);

// projects
router.get("/projects", indexController.displayProjectPage);

// services
router.get("/services", indexController.displayServicesPage);



// Login page
/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);
/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

// register page
/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);
// exports the rotuer object
module.exports = router;