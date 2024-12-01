const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory task storage (for simplicity; replace with a database in production)
let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ message: "Task is required" });
  }

  tasks.push({ task });
  res.status(201).json({ message: "Task added successfully" });
});

// Delete a task by index (optional feature)
app.delete("/tasks/:index", (req, res) => {
  const { index } = req.params;

  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
