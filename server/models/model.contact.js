// create the Contact to get the contact msg info

// require mongoose
const mongoose = require("mongoose");

// create a contact schema (a table)
let contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true,
            min: 18,
            max: 120,
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        message: {
            type: String,
            require: true
        }
    },
    {
        collection: "contact"
    }
)

// exports
module.exports = mongoose.model("Contact", contactSchema);