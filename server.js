const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./back/src/config/database");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve Static Files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "front")));

// Define Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "front/pages", "welcome.html"))
);

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
