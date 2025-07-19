import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";

const theme = createTheme({
  palette: {
    primary: { main: "#6366f1" },
    secondary: { main: "#10b981" },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

const backgroundStyle = {
  minHeight: "100vh",
  backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  backgroundAttachment: "fixed",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <CssBaseline />
        <div style={backgroundStyle}>
          <BrowserRouter>
            <Navbar />
            <Container maxWidth="xl" sx={{ py: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
