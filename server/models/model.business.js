// create the Business to get the contact msg info

// require mongoose
const mongoose = require("mongoose");

// create a contact schema (a table)
let businessSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            require: true
        },

    },
    {
        collection: "business"
    }
)
const Business = mongoose.model("Business", businessSchema);
// exports
module.exports = Business;