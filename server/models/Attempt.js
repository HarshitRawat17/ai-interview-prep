const mongoose = require('mongoose')

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: Number,
  title: String,
  answer: String,
  feedback: String,
  scores: Object,
  avg: Number,

  // ✅ NEW FIELD
  timeTaken: Number   // in seconds

}, { timestamps: true })

module.exports = mongoose.model('Attempt', attemptSchema)