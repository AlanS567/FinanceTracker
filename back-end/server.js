// importing express
var express = require("express");
var cors = require("cors");
const jwt = require("jsonwebtoken");
require("./connection");
var UserData = require("./model/userdata");
var Expense = require("./model/expense");
const { SECRET } = require("./config");
var email_obj;
var email_string;
// initialising
var app = express();
var { authmiddleware } = require("./middleware");
//middleware
app.use(express.json());
app.use(cors());

// API

// USER
// Add userdata signup
app.post("/add_user", async (req, res) => {
  try {
    const user = await UserData(req.body).save();
    const userId = user._id;
    const token = jwt.sign({ userId }, SECRET);
    res.send({ message: "data added!!", token: token });
  } catch (error) {
    res.send({ message: "This email already exists" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const user = await UserData.findOne({
    Email: req.body.Email,
    Password: req.body.Password,
  });

  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, SECRET);
    return res.send({
      status: "ok",
      user: true,
      message: "success",
      email: user.Email,
      token: token,
    });
  } else {
    return res.send({ status: "error", user: false, message: "failed" });
  }
});

// Display expense
app.post("/get_userinfo", async (req, res) => {
  try {
    email_obj = await req.body;
    console.log(email_obj);
  } catch (error) {
    res.send(error);
  }
});

// View expense
app.get("/view_expense", authmiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    var data = await Expense.find({ userId: userId });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// Add expense
app.post("/add_expense", authmiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const expenseData = { ...req.body, userId };
    await Expense(expenseData).save();
    res.send({ message: "data added!!" });
  } catch (error) {
    res.send(error);
  }
});

// Delete expense
app.delete("/remove_expense/:id", async (req, res) => {
  try {
    var id = req.params.id;
    await Expense.findByIdAndDelete(id);
    res.send({ message: `Data of ${id} Deleted` });
  } catch (error) {
    console.log(error);
  }
});

// Update expense
app.put("/update_expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// ADMIN
// Admin view users
app.get("/admin_view", async (req, res) => {
  try {
    var data = await UserData.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// Admin view expenses
app.get("/admin_view_exp", async (req, res) => {
  try {
    var data = await Expense.find({ Category: "Expense" });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// Admin delete users
app.delete("/admin_remove/:id", async (req, res) => {
  try {
    var id = req.params.id;
    await UserData.findByIdAndDelete(id);
    res.send({ message: `Data of ${id} Deleted` });
  } catch (error) {
    console.log(error);
  }
});

// Admin delete expenses
app.delete("/admin_remove_exp/:id", async (req, res) => {
  try {
    var id = req.params.id;
    await Expense.findByIdAndDelete(id);
    res.send({ message: `Data of ${id} Deleted` });
  } catch (error) {
    console.log(error);
  }
});

// Port
app.listen(1880, (req, res) => {
  console.log("Port is up and running");
});
