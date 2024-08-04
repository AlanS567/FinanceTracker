import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Expense');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1880/add_expense', {
        Amount: amount,
        Category: category,
        Date: date,
        Description: description,
        Email: 'user-email' // Replace with the actual email or retrieve from state
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to add expense', error);
    }
  };

  return (
    <Container>
      <br /><br /><br />
      <Typography variant="h4" gutterBottom>Add Expense</Typography>
      <Box component="form" onSubmit={handleAddExpense}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          label="Category"
          select
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </TextField>
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Add Expense</Button>
      </Box>
    </Container>
  );
};

export default AddExpense;
