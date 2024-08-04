import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdminExpenseManage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, []);

  const handleDelete = (expenseId) => {
    axios.delete(`/api/admin/expenses/${expenseId}`)
      .then(() => {
        setExpenses(expenses.filter(expense => expense._id !== expenseId));
      })
      .catch(error => {
        console.error("There was an error deleting the expense!", error);
      });
  };

  return (
    <Container>
      <br /><br />
      <Typography variant="h4" gutterBottom>
        Manage Expenses
      </Typography>
      <List>
        {expenses.map(expense => (
          <ListItem key={expense._id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(expense._id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText 
              primary={`₹${expense.amount}`} 
              secondary={`${expense.category} - ${expense.description} on ${new Date(expense.date).toLocaleDateString()}`} 
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminExpenseManage;
