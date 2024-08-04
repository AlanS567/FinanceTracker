import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ showDashboardLinks, showAdminLinks, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="FinanceTracker Logo" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ color: '#fff', marginLeft: 2 }}>
            FinanceTracker
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!showDashboardLinks && !showAdminLinks ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : showDashboardLinks ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/add">
                Add
              </Button>
              <Button color="inherit" component={Link} to="/manage">
                Manage
              </Button>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : showAdminLinks ? (
            <>
              <Button color="inherit" component={Link} to="/adminuser">
                Admin Users
              </Button>
              <Button color="inherit" component={Link} to="/adminexpense">
                Admin Expenses
              </Button>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
