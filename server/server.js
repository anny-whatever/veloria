// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Configure CORS
const corsOptions = {
  origin: [
    "https://veloria.in",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  methods: ["GET, POST, PUT, DELETE, OPTIONS"],
  allowedHeaders: ["Content-Type, Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/finance", require("./routes/financeRoutes"));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Veloria Studio API" });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
