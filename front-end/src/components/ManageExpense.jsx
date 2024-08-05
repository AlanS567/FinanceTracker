import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton, Dialog, 
  DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const email = "user@example.com"; // Replace this with dynamic email or user info
        const response = await axios.get("http://localhost:1880/view_expense", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1880/remove_expense/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleOpenDialog = (expense) => {
    setSelectedExpense(expense);
    setUpdatedAmount(expense.Amount);
    setUpdatedCategory(expense.Category);
    setUpdatedDate(expense.Date);
    setUpdatedDescription(expense.Description);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedExpense(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:1880/update_expense/${selectedExpense._id}`,
        {
          Amount: updatedAmount,
          Category: updatedCategory,
          Date: updatedDate,
          Description: updatedDescription,
          // Email: selectedExpense.Email,
        }
      );
      setExpenses(
        expenses.map((expense) =>
          expense._id === selectedExpense._id
            ? {
                ...expense,
                Amount: updatedAmount,
                Category: updatedCategory,
                Date: updatedDate,
                Description: updatedDescription,
              }
            : expense
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        Manage Expenses
      </Typography>
      <List>
        {expenses.map((expense) => (
          <ListItem key={expense._id}>
            <ListItemText
              primary={`Amount: ${expense.Amount} ₹`}
              secondary={`Category: ${expense.Category}, Date: ${expense.Date}, Description: ${expense.Description}`}
            />
            <IconButton onClick={() => handleOpenDialog(expense)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(expense._id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" href="/add">
        Add New Expense
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Update Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={updatedAmount}
            onChange={(e) => setUpdatedAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageExpense;
