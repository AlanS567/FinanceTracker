// importing express
var express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
require("./connection")
var UserData = require('./model/userdata')
var Expense = require('./model/expense')
var email_obj
var email_string
// initialising
var app = express()

//middleware
app.use(express.json());
app.use(cors());

// USER
// add userdata signup
app.post("/add_user",async(req,res)=>{
    try {
      await UserData(req.body).save();
      res.send({message:"data added!!"});
    } catch (error) {
      res.send({message:"This email already exists"});
    }
})

//login
app.post('/login', async (req, res) => {
    const user = await UserData.findOne({
        Email: req.body.Email,
        Password: req.body.Password
    })

    if (user) {
        return res.send({ status: 'ok', user: true, message:'success', email:user.Email})
    } else {
        return res.send({ status: 'error', user: false, message:'failed' })
    }
})

//display expense
app.post("/get_userinfo",async(req,res)=>{
  try {
    email_obj = await req.body;
    console.log(email_obj)
  } catch (error) {
    res.send(error);
  }
})

// 
app.get("/view_expense",async(req,res)=>{
  try {
    email_string = email_obj.email
    console.log(email_string)
    var data = await Expense.find({Email:email_string})
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

//add expense
app.post("/add_expense",async(req,res)=>{
  try {
    await Expense(req.body).save();
    res.send({message:"data added!!"});
  } catch (error) {
    res.send(error);
  }
})

//delete expense
app.delete("/remove_expense/:id",async(req,res)=>{
  try {
    var id = req.params.id
    await Expense.findByIdAndDelete(id)
    res.send({message:`Data of ${id} Deleted`})
  } catch (error) {
    console.log(error)
  }
})

//update expense
app.put("/update_expense/:id",async(req,res)=>{
  try {
    var id = req.params.id
    await Expense.findByIdAndUpdate(id, req.body, { new: true })
    res.send({message:`Data of ${id} Updated`})
  } catch (error) {
    console.log(error)
  }
})

//ADMIN
// admin view users
app.get("/admin_view",async(req,res)=>{
  try {
    var data = await UserData.find()
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

//admin view expenses
app.get("/admin_view_exp",async(req,res)=>{
  try {
    var data = await Expense.find({Category:'Expense'})
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

// admin delete users
app.delete("/admin_remove/:id",async(req,res)=>{
  try {
    var id = req.params.id
    await UserData.findByIdAndDelete(id)
    res.send({message:`Data of ${id} Deleted`})
  } catch (error) {
    console.log(error)
  }
})

//admin delete expenses
app.delete("/admin_remove_exp/:id",async(req,res)=>{
  try {
    var id = req.params.id
    await Expense.findByIdAndDelete(id)
    res.send({message:`Data of ${id} Deleted`})
  } catch (error) {
    console.log(error)
  }
})

//port
app.listen(1880,(req,res)=>{
    console.log("Port is up and running")
})
