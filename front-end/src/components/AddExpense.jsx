import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense'); // Default to 'expense'

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/expenses', { amount, date, description, type })
      .then(response => {
        // Handle success
        console.log(response.data);
        // Redirect or show success message
      })
      .catch(error => {
        // Handle error
        console.error('There was an error adding the expense!', error);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Add Expense
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
              required
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: '#4CAF50', color: '#fff' }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddExpense;
