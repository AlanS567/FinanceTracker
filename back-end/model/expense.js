var mongoose = require('mongoose');
var schema = mongoose.Schema({
    Amount: { type: Number },
    Category: { type: String },
    Date: { type: String },
    Description: { type: String },
    Email: { type: String }
})

var Expense = mongoose.model("expense", schema);
module.exports = Expense;
