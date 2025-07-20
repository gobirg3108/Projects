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
  CircularProgress,
  Grid,
  Box,
  Alert,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  useTheme,
  LinearProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";

const Reports = () => {
  const [reportData, setReportData] = useState({
    leadConversionRates: [],
    salesPerformance: [],
    customerAcquisition: [],
    revenueBySource: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        setLoading(true);
        const res = await axios.get(
          "https://my-crm-project.onrender.com/api/reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure all data arrays exist and have proper structure
        const data = {
          leadConversionRates: Array.isArray(res.data?.leadConversionRates)
            ? res.data.leadConversionRates
            : [],
          salesPerformance: Array.isArray(res.data?.salesPerformance)
            ? res.data.salesPerformance.map((item) => ({
                ...item,
                _id: {
                  month: item._id?.month || "Unknown",
                  year: item._id?.year || new Date().getFullYear(),
                },
              }))
            : [],
          customerAcquisition: Array.isArray(res.data?.customerAcquisition)
            ? res.data.customerAcquisition
            : [],
          revenueBySource: Array.isArray(res.data?.revenueBySource)
            ? res.data.revenueBySource
            : [],
        };

        setReportData(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderKpiCards = () => {
    const totalLeads = reportData.leadConversionRates.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );
    const convertedLeads =
      reportData.leadConversionRates.find((item) => item._id === "Converted")
        ?.count || 0;
    const conversionRate =
      totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
    const totalSales = reportData.salesPerformance.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* KPI Cards remain the same */}
      </Grid>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Overview
        return (
          <>
            {renderKpiCards()}

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Lead Conversion
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={reportData.leadConversionRates}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        fill={theme.palette.primary.main}
                        name="Leads"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Lead Sources
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={reportData.revenueBySource}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="revenue"
                        nameKey="_id"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {reportData.revenueBySource.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>
          </>
        );

      case 1: // Sales Performance
        return (
          <Card elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Sales Performance
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={reportData.salesPerformance.map((item) => ({
                  ...item,
                  monthYear: `${item._id?.month || "Unknown"}/${
                    item._id?.year?.toString()?.slice(2) || "??"
                  }`,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill={theme.palette.secondary.main}
                  name="Sales"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        );

      case 2: // Detailed Data
        return (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Lead Conversion Rates
              </Typography>
              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.leadConversionRates.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      reportData.leadConversionRates.map((rate) => {
                        const total = reportData.leadConversionRates.reduce(
                          (sum, item) => sum + (item.count || 0),
                          0
                        );
                        const percentage =
                          total > 0
                            ? ((rate.count / total) * 100).toFixed(1)
                            : 0;

                        return (
                          <TableRow key={rate._id || "unknown"}>
                            <TableCell>{rate._id || "Unknown"}</TableCell>
                            <TableCell align="right">
                              {rate.count || 0}
                            </TableCell>
                            <TableCell align="right">{percentage}%</TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sales Performance
              </Typography>
              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell align="right">Sales Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.salesPerformance.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      reportData.salesPerformance.map((performance) => (
                        <TableRow
                          key={`${performance._id?.month || "unknown"}-${
                            performance._id?.year || "unknown"
                          }`}
                        >
                          <TableCell>
                            {performance._id?.month || "Unknown"}
                          </TableCell>
                          <TableCell>
                            {performance._id?.year || "Unknown"}
                          </TableCell>
                          <TableCell align="right">
                            {performance.count || 0}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Analytics Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {format(new Date(), "MMMM d, yyyy")}
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 4 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Overview" />
        <Tab label="Sales Performance" />
        <Tab label="Detailed Data" />
      </Tabs>

      {renderTabContent()}
    </Container>
  );
};

export default Reports;
