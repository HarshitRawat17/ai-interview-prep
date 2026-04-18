const express = require('express')
const router = express.Router()

const Attempt = require('../models/Attempt')
const auth = require('../middleware/auth')

// GET history
router.get('/', auth, async (req, res) => {
  try {
    const attempts = await Attempt.find({
      user: req.userId
    }).sort({ createdAt: -1 })

    res.json(attempts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST attempt
router.post('/', auth, async (req, res) => {
  try {
    const attempt = await Attempt.create({
      user: req.userId,
      ...req.body
    })

    res.json(attempt)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE history
router.delete('/', auth, async (req, res) => {
  try {
    await Attempt.deleteMany({
      user: req.userId
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router