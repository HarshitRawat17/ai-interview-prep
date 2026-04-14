# InterviewAI 🤖

> AI-powered interview preparation tool for software engineering placements.  
> Practice DSA, HR, and System Design questions with real-time feedback powered by Groq AI.

![Made with React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![Powered by Groq](https://img.shields.io/badge/Groq-LLaMA3-orange?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 What is this?

A web app where you practice real interview questions and get **instant AI feedback** on your answers — scored on Correctness, Clarity, and Efficiency. Built for BTech CSE 2026 placement preparation.

---

## ✨ Features

- 12+ curated interview questions (DSA, HR, System Design)
- Real-time AI feedback powered by Groq (LLaMA 3)
- Scores on Correctness, Clarity, and Efficiency
- Practice history with local persistence
- Difficulty badges (Easy / Medium / Hard)
- Hints for each question
- Dark mode UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | CSS Variables (no framework) |
| AI | Groq API (llama-3.3-70b-versatile) |
| Storage | localStorage |
| Fonts | Syne + JetBrains Mono |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/interview-ai.git
cd interview-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key
```bash
cp .env.example .env
```
Open `.env` and add your Groq API key:
```
VITE_GROQ_API_KEY=gsk_your_key_here
```
Get your **free** key at: https://console.groq.com  
No credit card required — 14,400 free requests/day!

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:5173

---

## 📁 Project Structure

```
interview-ai/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Question navigation
│   │   ├── FeedbackPanel.jsx # AI feedback display
│   │   └── HistoryView.jsx   # Past attempts
│   ├── hooks/
│   │   ├── useAI.js          # Groq API integration
│   │   └── useHistory.js     # localStorage history
│   ├── data/
│   │   └── questions.js      # Question bank
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── index.html
├── vite.config.js
└── .env.example
```

---

## 🗺️ Roadmap

- [ ] Code editor with syntax highlighting (CodeMirror)
- [ ] Timer mode (simulate real interview pressure)
- [ ] Topic-wise progress charts
- [ ] Export practice report as PDF
- [ ] Mock interview mode (full session)
- [ ] More questions (expand to 30+)

---

## 💡 Why I Built This

As a BTech CSE 2026 placement student, I wanted a tool that gives honest, instant feedback on interview answers — not just marks right/wrong, but explains *why* an answer is good or bad.

I chose Groq API because it's completely free, extremely fast, and powered by LLaMA 3 — one of the best open source models available. This project taught me React state management, API integration, component architecture, and prompt engineering.

---

## 📸 Screenshots

*Coming soon — will add after UI polish*

---

## 🤝 Contributing

Pull requests are welcome! If you want to add more questions or features, feel free to fork and contribute.

---

## 📄 License

MIT