import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <br /><br /><br /><br /><br /><br />
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
