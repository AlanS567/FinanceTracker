import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    axios.get('/api/expenses')  // Make sure your API returns filtered data
      .then(response => {
        const expenses = response.data;
        const income = expenses.filter(expense => expense.type === 'income');
        const expense = expenses.filter(expense => expense.type === 'expense');

        setTotalIncome(income.reduce((sum, expense) => sum + expense.amount, 0));
        setTotalExpense(expense.reduce((sum, expense) => sum + expense.amount, 0));

        const chartData = [
          { name: 'Income', amount: totalIncome },
          { name: 'Expense', amount: totalExpense }
        ];

        setData(chartData);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [totalIncome, totalExpense]);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Total Income: ₹{totalIncome}
        </Typography>
        <Typography variant="h6">
          Total Expenses: ₹{totalExpense}
        </Typography>
      </Box>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" href="/add">
          Add Expense
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
