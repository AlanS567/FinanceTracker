import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminUserManage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1880/admin_view");

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1880/admin_remove/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.Username} secondary={user.Email} />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(user._id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminUserManage;
