import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box, Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          background: "linear-gradient(135deg, #1a237e, #3949ab)",
          color: "white",
          padding: { xs: 3, md: 6 },
          borderRadius: 3,
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Welcome to CRM Pro
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.9,
          }}
        >
          Streamline your customer relationships with our powerful CRM solution
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/register"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
        }}
      >
        Why Choose Our CRM?
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Customer Management
            </Typography>
            <Typography>
              Easily track and manage all your customer interactions in one
              place with our intuitive interface.
            </Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Powerful Analytics
            </Typography>
            <Typography>
              Get detailed reports and insights to help you make data-driven
              business decisions.
            </Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard elevation={3}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Automated Follow-ups
            </Typography>
            <Typography>
              Never miss an opportunity with our automated follow-up system that
              keeps you connected.
            </Typography>
          </FeatureCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
