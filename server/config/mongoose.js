const mongoose = require("mongoose");
const dbConfig = require("./db");

//------set up for MongoDB--------
// require db.js for the URI
module.exports = function()
    {
        const db = mongoose.connect(dbConfig.URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(()=>
            {
                console.log("connected to MongoDB Altas server");
            })
            .catch((e)=>
            {
                console.log("failed to connect to MongoDB Altas server");
                console.log(e);
            });
        return db;            
    }
