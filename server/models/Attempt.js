const mongoose = require('mongoose')

// This defines the structure of each attempt saved in MongoDB
const attemptSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true
  },
  questionTitle: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  scores: {
    correctness: Number,
    clarity: Number,
    efficiency: Number
  },
  avg: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Attempt', attemptSchema)
