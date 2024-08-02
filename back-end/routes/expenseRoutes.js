const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// Add Expense
router.post('/', auth, async (req, res) => {
  try {
    const { amount, date, description, type } = req.body;

    const expense = new Expense({
      user: req.user.id,
      amount,
      date,
      description,
      type,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get Expenses (Optionally filter by type)
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
