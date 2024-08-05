import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '80px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            marginBottom: 4,
          }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" component={Link} to="/adminuser">
            Manage Users
          </Button>
          <Button variant="contained" component={Link} to="/adminexpense">
            Manage Expenses
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
