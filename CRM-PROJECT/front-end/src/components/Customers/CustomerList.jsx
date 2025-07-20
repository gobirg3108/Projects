import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableSortLabel,
  TablePagination,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const CustomerList = ({ paginated = false, itemsPerPage = 10 }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const statusColors = {
    New: "primary",
    Contacted: "info",
    Interested: "warning",
    Converted: "success",
    Lost: "error",
  };

  const formDataInitialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    source: "",
    status: "",
    purchaseHistory: "",
  };

  const [formData, setFormData] = useState(formDataInitialState);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      filterAndSortCustomers();
    }
  }, [customers, searchTerm, sortConfig]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.get(
        "https://my-crm-project.onrender.com/api/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(res.data);

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.role;
      setIsAdmin(userRole === "admin");
    } catch (err) {
      console.error(
        "Error fetching customers:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCustomers = () => {
    let result = [...customers];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term) ||
          customer.email.toLowerCase().includes(term) ||
          customer.phone.toLowerCase().includes(term) ||
          customer.status.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredCustomers(result);
  };

  const handleSortRequest = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(
        `https://my-crm-project.onrender.com/api/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(customers.filter((customer) => customer._id !== customerId));
    } catch (err) {
      console.error(
        "Error deleting customer:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to delete customer. Please try again.");
    }
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      source: customer.source,
      status: customer.status,
      purchaseHistory: customer.purchaseHistory,
    });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setCurrentCustomer(null);
    setFormData(formDataInitialState);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const updatedCustomer = { ...currentCustomer, ...formData };

      const res = await axios.put(
        `https://my-crm-project.onrender.com/api/customers/${currentCustomer._id}`,
        updatedCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCustomers = customers.map((customer) =>
        customer._id === res.data._id ? res.data : customer
      );
      setCustomers(updatedCustomers);
      handleCloseEdit();
    } catch (err) {
      console.error(
        "Error updating customer:",
        err.response ? err.response.data : err.message
      );
      setError("Failed to update customer. Please try again.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredCustomers.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Customer Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search customers..."
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />
          <Tooltip title="Refresh">
            <IconButton onClick={fetchCustomers}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "name"}
                      direction={
                        sortConfig.key === "name" ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSortRequest("name")}
                      sx={{ color: "white !important" }}
                    >
                      <Typography variant="subtitle2" color="white">
                        Name
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="white">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="white">
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "status"}
                      direction={
                        sortConfig.key === "status"
                          ? sortConfig.direction
                          : "asc"
                      }
                      onClick={() => handleSortRequest("status")}
                      sx={{ color: "white !important" }}
                    >
                      <Typography variant="subtitle2" color="white">
                        Status
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="white">
                      Source
                    </Typography>
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="right">
                      <Typography variant="subtitle2" color="white">
                        Actions
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isAdmin ? 6 : 5}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <Typography variant="body1">
                        {searchTerm
                          ? "No matching customers found"
                          : "No customers available"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  (paginated
                    ? filteredCustomers.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredCustomers
                  ).map((customer) => (
                    <TableRow key={customer._id} hover>
                      <TableCell>
                        <Typography fontWeight="500">
                          {customer.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.status}
                          color={statusColors[customer.status] || "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{customer.source}</TableCell>
                      {isAdmin && (
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Tooltip title="Edit">
                              <IconButton
                                color="primary"
                                onClick={() => handleEditCustomer(customer)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  handleDeleteCustomer(customer._id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={isAdmin ? 6 : 5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {paginated && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCustomers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}

      <Dialog open={editMode} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Customer Details</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ pt: 1 }}>
            <TextField
              margin="normal"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="source"
              label="Source"
              type="text"
              fullWidth
              value={formData.source}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="status"
              label="Status"
              type="text"
              fullWidth
              select
              SelectProps={{ native: true }}
              value={formData.status}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </TextField>
            <TextField
              margin="normal"
              name="purchaseHistory"
              label="Purchase History"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={formData.purchaseHistory}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button
            onClick={handleSubmitEdit}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerList;
