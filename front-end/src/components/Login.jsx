import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', { email, password })
      .then(response => {
        if (response.data.success) {
          setIsLoggedIn(true);
          navigate('/dashboard');
        } else {
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 20 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#4CAF50', color: '#fff' }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
