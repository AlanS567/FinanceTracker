import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
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
          }, // Replace with the actual email or retrieve from state
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
    <Container>
      <br />
      <br />
      <Typography variant="h6">Total Income: ₹{income}</Typography>
      <Typography variant="h6">Total Expenses: ₹{expenseTotal}</Typography>

      <Box mt={4}>
        <Typography variant="h6">Recent Income</Typography>
        <List>
          {recentIncome.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.Description}
                secondary={`₹${item.Amount}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Recent Expenses</Typography>
        <List>
          {recentExpenses.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.Description}
                secondary={`₹${item.Amount}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box mt={2}>
        <Button variant="contained" color="primary" href="/add">
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
