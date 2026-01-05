const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const islogged = require("../middleware/isLogged");

//show add task form
router.get("/tasks/new",islogged,(req,res)=>{
    res.render("tasks/new",{title:"Add new Task"});
});

//create new task
router.post("/tasks/new",islogged,async(req,res)=>{
    const {title,description}=req.body;
    await Task.create({
        title,
        description,
        user:req.session.userId
    });
    res.render("tasks/new",{title:"Add new Task"});
});

//show the all tasks
router.get("/tasks",islogged,async(req,res)=>{
    const tasks = await Task.find({user:req.session.userId});
    res.render("tasks/index",{title:"Task View",tasks:tasks});
});

//edit task
router.get("/tasks/:id/edit",islogged,async(req,res)=>{
    const task = await Task.findById(req.params.id);
    res.render("tasks/edit",{title:"Edit Task",task:task});
});

//update task
router.post("/tasks/:id/update",islogged,async(req,res)=>{
    await Task.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/tasks")
});

//delete task
router.post("/tasks/:id/delete",islogged,async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks");
});

module.exports = router;