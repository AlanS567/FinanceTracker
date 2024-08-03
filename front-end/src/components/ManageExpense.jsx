import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:1880/view_expense', {
          params: { email: 'user-email' } // Replace with the actual email or retrieve from state
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1880/remove_expense/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Expenses</Typography>
      {expenses.map(expense => (
        <Box key={expense._id} mb={2} border={1} p={2}>
          <Typography variant="h6">{expense.Description}</Typography>
          <Typography>Amount: ₹{expense.Amount}</Typography>
          <Typography>Category: {expense.Category}</Typography>
          <Typography>Date: {expense.Date}</Typography>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(expense._id)}>Delete</Button>
        </Box>
      ))}
    </Container>
  );
};

export default ManageExpense;
