import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./components/Dashboard";
import CustomerForm from "./components/Customers/CustomerForm";
import CustomerList from "./components/Customers/CustomerList";
import Reports from "./components/Customers/Reports";
import FollowUpPage from "./components/FollowUpPage/FollowUpPage";
import { Box } from "@mui/material";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          padding: { xs: 2, sm: 3 },
          backgroundColor: "#f5f7fa",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-customer" element={<CustomerForm />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/follow-up" element={<FollowUpPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
