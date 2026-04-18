const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const feedbackRoute = require('./routes/feedback')
const historyRoute = require('./routes/history')
const authRoute = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
}))
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err.message))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/feedback', feedbackRoute)
app.use('/api/history', historyRoute)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'InterviewAI server is running!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
