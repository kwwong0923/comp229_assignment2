// server.js for hosting the server
// require the app.js from config file
const app = require("./server/config/express");
const mongoose = require("./server/config/mongoose");
// run one time
const db = mongoose();



app.listen(3000, ()=>{
    console.log("Server is running in port3000");
});
