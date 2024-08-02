import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { getExpenses, deleteExpense, updateExpense } from '../api';

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  const handleUpdate = async (id) => {
    const updatedExpense = prompt('Enter new description:');
    if (updatedExpense) {
      try {
        await updateExpense(id, { description: updatedExpense });
        setExpenses(expenses.map(expense => expense._id === id ? { ...expense, description: updatedExpense } : expense));
      } catch (error) {
        console.error('Failed to update expense', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Manage Expenses
        </Typography>
        <Box>
          {expenses.map(expense => (
            <Box key={expense._id} sx={{ mb: 2 }}>
              <Typography variant="h6">
                {expense.description} - ${expense.amount}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleUpdate(expense._id)}>
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(expense._id)} sx={{ ml: 2 }}>
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ManageExpense;
