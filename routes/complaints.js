const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");
const path = require("path");


const calculatePriority = (severity) => severity * 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// ==================================================
// GET all complaints (with optional status filter)
// Example: /complaints?status=Pending
// ==================================================
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const complaints = await Complaint.find(filter)
      .sort({ priorityScore: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ==================================================
// GET single complaint by ID
// ==================================================
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// ==================================================
// POST new complaint
// ==================================================
router.post("/", upload.single("image"), async (req, res) => {

  try {
    const { title, description, location, severity } = req.body;

    if (!title || !description || !location || severity === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newComplaint = await Complaint.create({
  title,
  description,
  location,
  severity,
  image: req.file ? req.file.filename : null
    });

    res.status(201).json(newComplaint);

  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ==================================================
// UPDATE complaint status
// ==================================================
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({ error: "Cannot modify resolved complaint" });
    }

    complaint.status = status;
    await complaint.save();

    res.json(complaint);

  } catch (error) {
    res.status(400).json({ error: "Invalid update" });
  }
});

// ==================================================
// DELETE complaint
// ==================================================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json({
      message: "Complaint deleted successfully",
      deleted
    });

  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

module.exports = router;
