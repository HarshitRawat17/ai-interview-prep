const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const feedbackRoute = require('./routes/feedback')
const historyRoute = require('./routes/history')
const authRoute = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Allowed origins (LOCAL + VERCEL)
const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-interview-prep-liard-three.vercel.app', 
  'https://*.vercel.app'
]

// ✅ CORS config (production-safe)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps / curl)
    if (!origin) return callback(null, true)

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}))

app.use(express.json())

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch((err) => console.error('❌ MongoDB error:', err.message))

// ✅ Routes
app.use('/api/auth', authRoute)
app.use('/api/feedback', feedbackRoute)
app.use('/api/history', historyRoute)

// ✅ Health check
app.get('/', (req, res) => {
  res.json({ message: '🚀 InterviewAI server is running!' })
})

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})