const express = require('express')
const cors = require('cors')
require('dotenv').config()

const feedbackRoute = require('./routes/feedback')

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // allow only our React app
  methods: ['GET', 'POST'],
}))
app.use(express.json()) // parse incoming JSON requests

// Routes
app.use('/api/feedback', feedbackRoute)

// Health check route — to test if server is running
app.get('/', (req, res) => {
  res.json({ message: 'InterviewAI server is running!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
