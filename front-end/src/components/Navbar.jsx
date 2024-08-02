import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ showDashboardLinks, showAdminLinks, handleLogout }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
          FinanceTracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!showDashboardLinks && !showAdminLinks ? (
            <>
              <Button color="inherit" component={Link} to="/">
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
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/adminuser">
                Manage Users
              </Button>
              <Button color="inherit" component={Link} to="/adminexpense">
                Manage Expenses
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Admin Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

