import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:1880/view_expense', {
          params: { email: 'user-email' } // Replace with the actual email or retrieve from state
        });
        setExpenses(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error('Failed to fetch expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateTotals = (data) => {
    const totalIncome = data.filter(item => item.Category === 'Income').reduce((acc, item) => acc + item.Amount, 0);
    const totalExpense = data.filter(item => item.Category === 'Expense').reduce((acc, item) => acc + item.Amount, 0);

    setIncome(totalIncome);
    setExpenseTotal(totalExpense);
  };

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenseTotal],
        backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography variant="h6">Total Income: ₹{income}</Typography>
      <Typography variant="h6">Total Expenses: ₹{expenseTotal}</Typography>
      <Line data={data} />
      <Box mt={2}>
        <Button variant="contained" color="primary" href="/add">Add Expense</Button>
        <Button variant="contained" color="secondary" href="/manage">Manage Expenses</Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
