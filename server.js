// server.js for hosting the server
// require the app.js from config file
const app = require("./server/config/express");
const mongoose = require("./server/config/mongoose");
const db = mongoose();

app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), ()=>{
    console.log("Server is running in port3000");
});
