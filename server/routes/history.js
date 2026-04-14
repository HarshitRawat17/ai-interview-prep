const express = require('express')
const Attempt = require('../models/Attempt')
const router = express.Router()

// POST /api/history — save a new attempt to MongoDB
router.post('/', async (req, res) => {
  const { questionId, questionTitle, answer, feedback, scores, avg } = req.body

  if (!questionId || !questionTitle || !answer || !feedback) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const attempt = new Attempt({
      questionId,
      questionTitle,
      answer,
      feedback,
      scores,
      avg
    })

    await attempt.save()
    return res.status(201).json({ message: 'Attempt saved!', attempt })

  } catch (err) {
    console.error('Error saving attempt:', err.message)
    return res.status(500).json({ error: 'Failed to save attempt' })
  }
})

// GET /api/history — fetch all past attempts from MongoDB
router.get('/', async (req, res) => {
  try {
    const attempts = await Attempt.find()
      .sort({ createdAt: -1 })
      .limit(50)

    return res.status(200).json(attempts)

  } catch (err) {
    console.error('Error fetching history:', err.message)
    return res.status(500).json({ error: 'Failed to fetch history' })
  }
})

// DELETE /api/history — clear all attempts
router.delete('/', async (req, res) => {
  try {
    await Attempt.deleteMany({})
    return res.status(200).json({ message: 'History cleared!' })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to clear history' })
  }
})

module.exports = router