# InterviewAI 🤖

<div align="center">

![InterviewAI Banner](https://img.shields.io/badge/InterviewAI-BTech%20CSE%202026-6C63FF?style=for-the-badge&logo=react)

**AI-powered interview preparation tool for software engineering placements**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA3-F55036?style=flat-square)](https://groq.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/HarshitRawat17/interview-ai/issues) · [Request Feature](https://github.com/HarshitRawat17/interview-ai/issues)

</div>

---

## 📸 Screenshots

| Practice | History | Analytics |
|----------|---------|-----------|
| ![Practice](https://via.placeholder.com/300x180/1a1a2e/6C63FF?text=Practice+View) | ![History](https://via.placeholder.com/300x180/1a1a2e/1D9E75?text=History+View) | ![Analytics](https://via.placeholder.com/300x180/1a1a2e/BA7517?text=Analytics+View) |

---

## 🎯 What is InterviewAI?

InterviewAI is a full-stack web application that helps BTech CSE students prepare for placement interviews. Practice real interview questions and get **instant AI feedback** scored on Correctness, Clarity, and Efficiency — powered by LLaMA 3 via Groq API.

### Why I built this
As a BTech CSE 2026 placement student, I needed a tool that gives honest, actionable feedback on interview answers — not just right/wrong, but *why* an answer is good or bad. I also wanted to simulate real interview pressure, which led to the camera confidence tracking feature.

---

## ✨ Features

- **AI Feedback** — Real-time evaluation of your answers scored on Correctness, Clarity and Efficiency
- **35+ Questions** — DSA, HR, System Design and CS Fundamentals (OS, DBMS, CN)
- **Code Editor** — Syntax-highlighted editor with line numbers for DSA questions
- **Camera Confidence Monitor** — Uses device camera to track confidence during practice
- **Performance Analytics** — Visual charts showing your progress over time
- **Practice History** — Every attempt saved to MongoDB with score and time taken
- **JWT Authentication** — Secure login/register, each user sees only their own history
- **Timer** — Countdown timer to simulate real interview pressure
- **Dark/Light Mode** — Toggle between themes
- **Difficulty Badges** — Easy / Medium / Hard labels on every question

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + Vite | UI framework and build tool |
| CodeMirror | Syntax-highlighted code editor |
| Recharts | Performance analytics charts |
| CSS Variables | Theming (dark/light mode) |
| WebRTC | Camera access for confidence monitoring |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database for users and attempts |
| JWT + bcryptjs | Authentication and password hashing |
| Groq API (LLaMA 3) | AI feedback generation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Groq API key (free at console.groq.com)

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/HarshitRawat17/interview-ai.git
cd interview-ai
```

**2. Setup Backend**
```bash
cd server
npm install
cp .env.example .env
```

Add your keys to `server/.env`:
```env
GROQ_API_KEY=gsk_your_key_here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-ai
JWT_SECRET=your_secret_key
PORT=5000
```

**3. Setup Frontend**
```bash
cd client
npm install
```

**4. Run the app**

Terminal 1 (backend):
```bash
cd server
npm run dev
```

Terminal 2 (frontend):
```bash
cd client
npm run dev
```

Open **http://localhost:5173** 🎉

---

## 📁 Project Structure

```
interview-ai/
├── client/                      # React Frontend
│   └── src/
│       ├── components/
│       │   ├── AuthPage.jsx     # Login/Register UI
│       │   ├── FeedbackPanel.jsx
│       │   ├── HistoryView.jsx
│       │   └── Sidebar.jsx
│       ├── hooks/
│       │   ├── useAI.js         # Groq API calls
│       │   ├── useAuth.js       # JWT auth logic
│       │   └── useHistory.js    # Attempt history
│       ├── data/questions.js    # 35+ question bank
│       └── App.jsx
│
└── server/                      # Node.js Backend
    ├── middleware/auth.js        # JWT middleware
    ├── models/
    │   ├── User.js              # User schema
    │   └── Attempt.js           # Attempt schema
    ├── routes/
    │   ├── auth.js              # Register/Login
    │   ├── feedback.js          # AI feedback
    │   └── history.js           # CRUD attempts
    └── index.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | ❌ |
| POST | `/api/auth/login` | Login + get JWT | ❌ |
| POST | `/api/feedback` | Get AI feedback | ✅ |
| GET | `/api/history` | Get user's attempts | ✅ |
| POST | `/api/history` | Save attempt | ✅ |
| DELETE | `/api/history` | Clear history | ✅ |

---

## 📊 Question Bank

| Category | Count | Topics |
|----------|-------|--------|
| DSA | 15 | Arrays, DP, Trees, Graphs, LinkedList, Stack, Heap |
| HR | 8 | Introduction, Behavioral, Motivation |
| System Design | 5 | URL Shortener, Chat App, Netflix, Rate Limiter |
| CS Fundamentals | 7 | OS, DBMS, Computer Networks |
| **Total** | **35** | |

---

## 🗺️ Roadmap

- [x] React frontend with AI feedback
- [x] Node.js + Express backend
- [x] MongoDB database integration
- [x] JWT authentication
- [x] Code editor with syntax highlighting
- [x] Camera confidence monitor
- [x] Performance analytics charts
- [x] Practice history with time tracking
- [x] Dark/Light mode
- [ ] Deploy to Vercel + Render

---

## 🧠 Key Technical Decisions

**Why Groq over OpenAI?**
Groq's LLaMA 3 model is completely free (14,400 requests/day), extremely fast, and gives high quality structured feedback. I evaluated both and chose Groq for the free tier without compromising on output quality.

**Why JWT over sessions?**
JWT is stateless — the server doesn't need to store session data. This makes the API scalable and easier to deploy. Each token contains the user's id and name, verified on every protected request.

**Why separate frontend and backend repos?**
They are deployed independently — frontend on Vercel, backend on Render. Separating them follows industry standard practices and allows independent scaling.

---

## 👨‍💻 Author

**Harshit Rawat**
- GitHub: [@HarshitRawat17](https://github.com/HarshitRawat17)
- BTech CSE 2026

---

## 📄 License

MIT License — feel free to use this project for learning and inspiration.

---

<div align="center">
  <b>Built with ❤️ for BTech CSE 2026 placements</b><br/>
  If this helped you, consider giving it a ⭐
</div>