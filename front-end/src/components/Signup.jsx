import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:1880/add_user', { Email: email, Password: password, Username: username });
            if (response.data.message === "data added!!") {
                navigate('/login');
            } else {
                setError('Signup failed. This email may already exist.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                    Signup
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={handleSignup}
                >
                    Signup
                </Button>
                {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
            </Box>
        </Container>
    );
};

export default Signup;
