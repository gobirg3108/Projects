import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";

const features = [
  {
    icon: <PeopleIcon fontSize="large" />,
    title: "User Management",
    description:
      "Easily add, edit, and manage all your users in one place with our intuitive interface.",
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Secure Authentication",
    description:
      "Protected with JWT tokens and password hashing for maximum security.",
  },
  {
    icon: <SettingsIcon fontSize="large" />,
    title: "Simple Interface",
    description:
      "Designed for effortless user administration with minimal learning curve.",
  },
];

function Home() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              User Management System
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 4,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Streamline your user administration with our powerful tools
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Register
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            p: 4,
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ready to get started?
          </Typography>
          <Typography
            sx={{
              mb: 3,
              maxWidth: 600,
              mx: "auto",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Join thousands of administrators who manage their users efficiently
            with our system.
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Create Account
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
