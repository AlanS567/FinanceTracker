const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://alanshaji567:alan@cluster0.c6n1mvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
