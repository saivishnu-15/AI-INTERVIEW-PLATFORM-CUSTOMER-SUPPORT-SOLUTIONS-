const express = require("express");
const router = express.Router();

const Interview = require("./models/Interview");
const {
  generateQuestionAI,
  evaluateAnswerAI,
} = require("./aiServices");

// Generate Question
router.post("/question", async (req, res) => {
  try {
    const { role } = req.body;

    const question = await generateQuestionAI(role);

    res.json({ question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit Answer
router.post("/answer", async (req, res) => {
  try {
    const { role, question, answer } = req.body;

    const feedback = await evaluateAnswerAI(question, answer);

    const interview = new Interview({
      role,
      question,
      answer,
      feedback,
    });

    await interview.save();

    res.json({
      role,
      question,
      answer,
      feedback,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History
router.get("/history", async (req, res) => {
  try {
    const data = await Interview.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;