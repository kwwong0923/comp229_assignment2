const express = require("express");
let Business = require("../models/model.business");

module.exports.displayBusinessPage = async(req, res)=>
{
    try
    {
        let data = await Business.find();
        res.render("business/list", {data, title: "Business Contact List"})
    }
    catch
    {
        res.send("error with finding data.");
    }
};

module.exports.displayAddPage = (req, res) =>
{
    res.render("business/add",{title: "Add Business Contact"});
}   

module.exports.processAddPage = (req, res) =>
{
    console.log("processAddPage");
    let {name, phone, email} = req.body;
    let newBusiness = new Business(
        {
            name,
            phone,
            email
        }
    )
    newBusiness
        .save()
        .then(()=>
        {
            console.log("Business Contact Message accpeted");
            res.render("business/accpet", {
                name,
                title: "Message accpeted"
            })
        })
        .catch((e) => 
        {
            res.render("business/reject", {
                title: "Message rejected"
            })
            console.log(e);
        })
}

module.exports.displayEditPage = async (req, res) => 
{
    let {id} = req.params;
    try
    {
        let data = await Business.findOne({_id: id});
        if(data !== null)
        {
            res.render("business/edit", {data, title: "Edit"});
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
}

module.exports.processEditPage = async (req, res) =>
{
    let{ id } = req.params;
    let {name, phone, email} = req.body;

    let editedBusiness = Business(
        {
            _id: id,
            name,
            phone,
            email
        }
    );

    Business.updateOne({_id: id}, editedBusiness, (e) => 
    {
        if(e)
        {
            console.log(e);
        }
        else
        {
            // refresh the business list
            res.redirect("/business/");
        }
    });
};

module.exports.processDeletePage = (req, res) =>
{
    let {id} = req.params;
    Business.deleteOne({_id: id}, (e)=>
    {
        if (e)
        {
            console.log(e);
        }
        else
        {
            console.log("deleted");
            res.redirect("/business/");
        }
    })
};