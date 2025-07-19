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

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );
      localStorage.setItem("token", response.data.token);
      enqueueSnackbar("Registration successful", { variant: "success" });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || "Registration failed", {
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
            Create Account
          </Typography>
          <Fade in timeout={800}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
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
                  bgcolor: "secondary.main",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Register
              </Button>
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Container>
  );
}

export default Register;
