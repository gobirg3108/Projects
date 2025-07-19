import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Fade,
  Slide,
} from "@mui/material";
import { useSnackbar } from "notistack";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://user-management-mqa3.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/users");
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Login failed", {
        variant: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Slide in direction="down" timeout={500}>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mb: 4,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome Back
          </Typography>
          <Fade in timeout={800}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Login
              </Button>
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Container>
  );
}

export default Login;
