# AI-INTERVIEW-PLATFORM-CUSTOMER-SUPPORT-SOLUTIONS-

# 🤖 AI Interview Preparation Platform

A full-stack AI-powered interview training system that generates technical questions and evaluates answers using GROQ API.

---

## 🚀 Features

- 🎯 Role-based interview questions (Frontend, Backend, etc.)
- 🤖 AI-generated questions using GROQ API
- 🧠 AI answer evaluation with feedback + scoring
- 📊 Interview history tracking (MongoDB)
- 🔁 Fallback system (works even if AI API fails)
- 💬 Simple and clean UI

---

## 🛠️ Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express.js
- Database: MongoDB
- AI: Google Gemini API
- Styling: CSS

client/ → React frontend
server/ → Node backend

## ⚙️ Setup Instructions
### 1️⃣ Clone repository
```bash
git clone <https://github.com/saivishnu-15/AI-INTERVIEW-PLATFORM-CUSTOMER-SUPPORT-SOLUTIONS->
OR <YOUR GITHUB LINK>

Backend setup
cd server
npm install

Create .env file:

GROQ_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri

Run backend:
node server.js

Frontend setup
cd client
npm install
npm run dev

API Endpoints
POST /api/question → Generate interview question
POST /api/answer → Evaluate answer
GET /api/history → Get past interviews

📌 How it works
Select role
Click “Generate Question”
Write answer
Get AI feedback + score
View history

Note
Requires valid GROQ API key
MongoDB must be connecteD

## 📁 Project Structure

AI-Interview-Platform/
│
├── client/                     # React Frontend
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/                     # Node Backend
│   │
│   ├── models/
│   │   └── Interview.js
│   │
│   ├── routes/
│   │   └── interviewRoutes.js
│   │
│   ├── services/
│   │   └── aiServices.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── README.md
└── .env
