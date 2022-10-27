
// create a reference to the model
const express = require("express");
let Contact = require("../models/model.contact");
module.exports.displayContactPage = (req, res) =>
{
    res.render("index", {title: "Contact Me"});
}

module.exports.processContactPage = (req, res) => 
{
    let {name, age, email, phone, message} = req.body;
    let newContact = new Contact(
        {
            name,
            age,
            email,
            phone,
            message,
        }
    );

    newContact
        .save()
        .then(()=>
        {
            console.log("Contact Message accpeted");
            res.render("contact/accpet", {
                name,
                title: "Message accpeted"
            })
        })
        .catch((e) =>
        {
            console.log("Contact message rejected");
            res.render("contact/reject", {
                title: "Message rejected"
            })
            console.log(e);
        })
}

module.exports.displayContactList = async (req, res) => 
{
    try
    {
        let data = await Contact.find();
        res.render("contact/list", {data, title: "Contact List", username: req.user? req.user.username : ""});
    }
    catch
    {
        res.send("error with finding data.");
    }
};

module.exports.displayEditPage = async (req, res) => 
{
    // get the :id. not _id
    let {id }= req.params;
    try
    {
        let data = await Contact.findOne({_id: id});
        if (data !== null)
        {
            res.render("contact/edit", {data, title: "Edit", username: req.user? req.user.username : ""});
        }
        else
        {
            res.send("Cannot find this student");
        }
    }
    catch(e)
    {
        res.send("Error");
        console.log(e);
    }
};

module.exports.processEditPage = async (req, res) =>
{
    let {id }= req.params;
    let {name, age, phone, email, message} = req.body;

    let editedContact = Contact(
        {
            _id: id,
            name,
            age,
            phone,
            email,
            message
        }
    );
    
    Contact.updateOne({_id: id}, editedContact, (e) => 
    {
        if(e)
        {
            console.log(e);
        }
        else
        {
            // refresh the contact list
            res.redirect("/contact/list");
        }
    })
};

module.exports.processDeletePage = (req, res) =>
{
    let id = req.params.id;
    Contact.deleteOne({_id: id}, (e)=>
    {
        if (e)
        {
            console.log(e);
        }
        else
        {
            console.log("deleted");
            res.redirect("/contact/list");
        }
    });
}