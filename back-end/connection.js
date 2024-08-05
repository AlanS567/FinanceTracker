const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/alan")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
