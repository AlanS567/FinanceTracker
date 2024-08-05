import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:1880/view_expense", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setExpenses(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateTotals = (data) => {
    const totalIncome = data
      .filter((item) => item.Category === "Income")
      .reduce((acc, item) => acc + item.Amount, 0);
    const totalExpense = data
      .filter((item) => item.Category === "Expense")
      .reduce((acc, item) => acc + item.Amount, 0);

    setIncome(totalIncome);
    setExpenseTotal(totalExpense);
  };

  // Separate recent income and expenses
  const recentIncome = expenses
    .filter((item) => item.Category === "Income")
    .slice(-5)
    .reverse();
  const recentExpenses = expenses
    .filter((item) => item.Category === "Expense")
    .slice(-5)
    .reverse();

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 8, pb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Total Income: ₹{income}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Total Expenses: ₹{expenseTotal}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Income
        </Typography>
        <Grid container spacing={3}>
          {recentIncome.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.Description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    ₹{item.Amount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Expenses
        </Typography>
        <Grid container spacing={3}>
          {recentExpenses.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.Description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    ₹{item.Amount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" href="/add" sx={{ mr: 2 }}>
          Add Expense
        </Button>
        <Button variant="contained" color="secondary" href="/manage">
          Manage Expenses
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
