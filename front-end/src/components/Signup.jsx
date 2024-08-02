import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Sign Up Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 15 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSignup}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: '8px' }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: '8px' }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#4CAF50', color: '#fff' }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
