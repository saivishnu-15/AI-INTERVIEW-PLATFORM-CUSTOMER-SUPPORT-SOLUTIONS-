const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ Your working model
const MODEL = "models/gemini-2.0-flash";

/* ---------------- Fallback (IMPORTANT for hackathon) ---------------- */
const fallbackQuestion = (role) => {
  const questions = [
    "How would you debug a slow-loading web application?",
    "Explain how you would handle a production bug reported by users.",
    "Design a simple login system for a web app.",
    "How do you optimize frontend performance in a React app?",
    "How would you handle API failures in a frontend application?"
  ];

  return questions[Math.floor(Math.random() * questions.length)];
};

const fallbackAnswer = () => {
  return "Good answer. Score: 7/10. Improve structure, add real-world examples, and explain your thought process more clearly.";
};

/* ---------------- Gemini Call ---------------- */
const callGemini = async (prompt) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    return (
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      null
    );
  } catch (err) {
    console.log("🔥 GEMINI ERROR:");
    console.log(JSON.stringify(err.response?.data, null, 2));
    console.log(err.message);

    return null; // important for fallback
  }
};

/* ---------------- Generate Question ---------------- */
const generateQuestionAI = async (role) => {
  const prompt = `
You are an expert technical interviewer.

Generate ONE UNIQUE interview question for a ${role}.

Rules:
- Must be scenario-based (real-world)
- Must NOT be a common textbook question
- Focus on debugging, system thinking, or real problems
- Make it different every time
- Avoid repeating patterns

Random seed: ${Math.random()}

Return ONLY the question.
`;

  const result = await callGemini(prompt);

  // fallback if Gemini fails (quota / error)
  return result || fallbackQuestion(role);
};

/* ---------------- Evaluate Answer ---------------- */
const evaluateAnswerAI = async (question, answer) => {
  const prompt = `
You are an AI interview evaluator.

Question: ${question}
Answer: ${answer}

Give:
- Score out of 10
- Short feedback
- One improvement tip

Be strict but helpful.
`;

  const result = await callGemini(prompt);

  // fallback if AI fails
  return result || fallbackAnswer();
};

module.exports = {
  generateQuestionAI,
  evaluateAnswerAI,
};