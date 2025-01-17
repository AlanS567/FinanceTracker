import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: 10, // Adjust this value to move the heading down
          marginBottom: 4,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976d2', // Adjust color to your preference
        }}
      >
        Manage Expenses
      </Typography>
      <Grid container spacing={2}>
        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Amount: ₹{expense.Amount}</Typography>
                <Typography variant="body1">Category: {expense.Category}</Typography>
                <Typography variant="body1">Date: {expense.Date}</Typography>
                <Typography variant="body1">Description: {expense.Description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenDialog(expense)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(expense._id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        href="/add"
        sx={{ marginTop: 2 }}
      >
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
