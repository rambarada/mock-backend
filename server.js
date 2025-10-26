// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // For security headers

const app = express();
const PORT = process.env.PORT || 3000;
// HOST=0.0.0.0 is needed for containerized environments like Render
const HOST = process.env.HOST || "0.0.0.0";

// --- Middleware ---

// 1. Security headers
app.use(helmet());

// 2. CORS configuration (Production Ready)
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow if origin is in our whitelist
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Block if not in whitelist
    const msg = 'CORS policy does not allow access from this origin.';
    return callback(new Error(msg), false);
  }
};
app.use(cors(corsOptions));

// 3. JSON body parser with size limit
app.use(express.json({ limit: "1mb" }));

// --- Routes ---

// 4. Dedicated Health Check route
app.get("/api/health", (req, res) => {
  res.json({
    message: `Welcome to ${process.env.APP_NAME}! , auto deploy is working !`,
    status: "Running",
  });
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" },
    { id: 3, name: "Charlie", role: "Guest" },
  ]);
});

app.post("/api/feedback", (req, res) => {
  const { user, message } = req.body;
  if (!user || !message)
    return res.status(400).json({ error: "Missing user or message" });
  
  console.log("Feedback received:", { user, message });
  res.status(201).json({ success: true, message: "Feedback submitted" });
});

// --- Error Handling ---

// 5. 404 Not Found Handler (must be after all routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// 6. Global Error Handler (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, HOST, () => console.log(`✅ Server running on http://${HOST}:${PORT}`));