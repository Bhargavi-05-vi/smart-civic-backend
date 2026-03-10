const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const complaintRoutes = require("./routes/complaints");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/civicportal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Complaint Routes
app.use("/complaints", complaintRoutes);

// Start Server
// app.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
