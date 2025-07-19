import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          UserManager
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
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
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Register
            </Button>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
