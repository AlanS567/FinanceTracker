import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to FinanceTracker
      </Typography>
      <Typography variant="h6" paragraph>
        Manage your finances effectively and efficiently.
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ marginRight: 2 }}>
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup">
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
