import React from "react";
import { Container } from "@mui/material";
import CustomerList from "../components/Customers/CustomerList";

const DashboardPage = () => {
  return (
    <Container>
      <CustomerList />
    </Container>
  );
};

export default DashboardPage;
