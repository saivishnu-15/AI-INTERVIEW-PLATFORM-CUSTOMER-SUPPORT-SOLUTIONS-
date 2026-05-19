require("dotenv").config(); // MUST be on top

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// DEBUG: check env variables
console.log("Mongo URI Loaded:", !!process.env.MONGODB_URI);


// Routes
app.use("/api", routes);

// Error handler (important for debugging)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
