const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// ✅ BEST MODEL FROM YOUR LIST
const MODEL = "llama-3.1-8b-instant";

/* ---------------- GROQ CALL ---------------- */
const callAI = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.log("🔥 GROQ ERROR:", err.response?.data || err.message);
    return null;
  }
};

/* ---------------- QUESTION GENERATION ---------------- */
const generateQuestionAI = async (role) => {
  const prompt = `
You are an expert technical interviewer.

Generate ONE real-world interview question for a ${role}.
Make it scenario-based, practical, and job-related.
Return ONLY the question.
`;

  const result = await callAI(prompt);

  // 🔥 SMART FALLBACK (ONLY IF AI FAILS)
  const fallbackQuestions = {
    "Frontend Developer": [
      "Explain React virtual DOM.",
      "How do you optimize React performance?",
      "Difference between state and props?",
    ],
    "Backend Developer": [
      "Design a REST API for task management system.",
      "What is middleware in Express?",
      "Explain authentication in Node.js.",
    ],
    "Python Developer": [
      "What are Python decorators?",
      "Explain list vs tuple.",
      "What is exception handling?",
    ],
    "Java Developer": [
      "Explain OOP concepts in Java.",
      "Difference between JVM, JRE, JDK?",
      "What is Spring Boot used for?",
    ],
  };

  if (result) return result;

  const list = fallbackQuestions[role] || fallbackQuestions["Backend Developer"];
  return list[Math.floor(Math.random() * list.length)];
};
