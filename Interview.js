const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    role: String,
    question: String,
    answer: String,
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);