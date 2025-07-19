require("dotenv").config(); // Load .env first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
