import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ManageExpense from './components/ManageExpense';
import AddExpense from './components/AddExpense';
import AdminUserManage from './components/AdminUserManage';
import AdminExpenseManage from './components/AdminExpenseManage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdminLoggedIn(false);
    };

    return (
        <>
            <Navbar showDashboardLinks={isLoggedIn} showAdminLinks={isAdminLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="/manage" element={<ManageExpense />} />
                <Route path="/adminuser" element={<AdminUserManage />} />
                <Route path="/adminexpense" element={<AdminExpenseManage />} />
            </Routes>
        </>
    );
}

export default App;
