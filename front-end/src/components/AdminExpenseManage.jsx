import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminExpenseManage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1880/admin_view_exp")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, []);

  const handleDelete = (expenseId) => {
    axios
      .delete(`http://localhost:1880/admin_remove_exp/${expenseId}`)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      })
      .catch((error) => {
        console.error("There was an error deleting the expense!", error);
      });
  };

  return (
    <Container sx={{ marginTop: '80px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          marginBottom: 4,
          color: 'primary.main',
          textAlign: 'center',
        }}
      >
        Manage Expenses
      </Typography>
      <Grid container spacing={3}>
        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  ₹{expense.Amount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {expense.Category} - {expense.Description} on {new Date(expense.Date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(expense._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminExpenseManage;
