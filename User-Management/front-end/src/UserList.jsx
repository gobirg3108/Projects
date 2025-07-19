import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Avatar,
  useMediaQuery,
  Box,
} from "@mui/material";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";

const API_URL = "https://user-management-w18l.onrender.com/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery("(max-width:600px)");

  const getAuthHeader = useCallback(
    () => ({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
    []
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`, getAuthHeader());
      setUsers(response.data);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Failed to fetch users", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader, enqueueSnackbar]);

  const addUser = async (userData) => {
    try {
      await axios.post(`${API_URL}/users`, userData, getAuthHeader());
      await fetchUsers();
      setEditingUser(null);
      enqueueSnackbar("User added successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Failed to add user", {
        variant: "error",
      });
    }
  };

  const updateUser = async (userData) => {
    try {
      await axios.put(
        `${API_URL}/users/${userData._id}`,
        userData,
        getAuthHeader()
      );
      await fetchUsers();
      setEditingUser(null);
      enqueueSnackbar("User updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Failed to update user", {
        variant: "error",
      });
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, getAuthHeader());
      await fetchUsers();
      enqueueSnackbar("User deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Failed to delete user", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 2 : 0,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              User Management
            </Typography>
            <Button
              variant="contained"
              onClick={() => setEditingUser({})}
              sx={{
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Add User
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {users.map((user, index) => (
                <Grid item xs={12} sm={6} md={4} key={user._id}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <UserItem
                      user={user}
                      onEdit={setEditingUser}
                      onDelete={deleteUser}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </motion.div>

      {editingUser && (
        <UserForm
          user={editingUser}
          onSave={editingUser._id ? updateUser : addUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </Container>
  );
}

export default UserList;
