import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Email as EmailIcon,
  Description as ActionIcon,
  Send as SendIcon,
  CalendarToday as DateIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import CustomSnackbar from "../Auth/CustomSnackbar";

const FollowUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    action: "",
    priority: "medium",
    followUpDate: format(new Date(), "yyyy-MM-dd"),
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const actionOptions = [
    "Schedule Meeting",
    "Request Feedback",
    "Send Proposal",
    "Payment Reminder",
    "Product Follow-up",
    "Other",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.action) newErrors.action = "Action is required";
    if (!formData.followUpDate) newErrors.followUpDate = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "https://my-crm-project.onrender.com/api/followup/send",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: response.data.msg || "Follow-up email sent successfully!",
        severity: "success",
      });

      // Reset form after successful submission
      setFormData({
        email: "",
        action: "",
        priority: "medium",
        followUpDate: format(new Date(), "yyyy-MM-dd"),
      });
    } catch (err) {
      console.error("Error sending follow-up:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || "Failed to send follow-up email",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 3,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          Customer Follow-Up
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Action Type</InputLabel>
                <Select
                  label="Action Type"
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                  error={!!errors.action}
                  startAdornment={
                    <InputAdornment position="start">
                      <ActionIcon color="action" />
                    </InputAdornment>
                  }
                >
                  {actionOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Follow-up Date"
                name="followUpDate"
                type="date"
                value={formData.followUpDate}
                onChange={handleChange}
                error={!!errors.followUpDate}
                helperText={errors.followUpDate}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Message"
                name="message"
                value={formData.message || ""}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Add any additional notes or custom message here..."
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button variant="outlined" color="secondary" sx={{ px: 4 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={<SendIcon />}
              sx={{ px: 4 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Follow-up"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        position={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
};

export default FollowUpPage;
