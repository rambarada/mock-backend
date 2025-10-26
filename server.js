// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to ${process.env.APP_NAME}!`,
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

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
