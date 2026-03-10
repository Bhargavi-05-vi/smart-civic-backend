const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  severity: {
    type: Number,
    required: true
  },
  priorityScore: {
    type: Number
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
  type: String
}

});

// Auto-calculate priority before saving
complaintSchema.pre("save", function () {
  this.priorityScore = this.severity * 10;
});

module.exports = mongoose.model("Complaint", complaintSchema);
