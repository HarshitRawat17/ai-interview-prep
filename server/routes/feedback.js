const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

// POST /api/feedback
// Takes question + answer, calls Groq, returns structured feedback
router.post('/', async (req, res) => {
  const { question, answer } = req.body

  // Validate input
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' })
  }

  if (answer.trim().length < 3) {
    return res.status(400).json({ error: 'Answer is too short' })
  }

  // Build the prompt
  const prompt = `You are a senior software engineer interviewer at a top tech company. A BTech CSE student answered the following interview question:

Question: ${question}

Their answer: "${answer}"

Give structured feedback in EXACTLY this format:

FEEDBACK:
[2-4 sentences: what they got right, key gaps, and one specific improvement tip]

SCORES:
Correctness: X/10
Clarity: X/10
Efficiency: X/10

Keep it encouraging but honest. For HR questions, judge structure, authenticity and communication — not code.`

  try {
    // Call Groq API from backend (API key is safe here)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!groqResponse.ok) {
      const errData = await groqResponse.json()
      console.error('Groq error:', errData)
      return res.status(500).json({ error: 'AI service error. Try again.' })
    }

    const groqData = await groqResponse.json()
    const text = groqData.choices?.[0]?.message?.content || ''

    // Parse the structured response
    const feedbackMatch = text.match(/FEEDBACK:\n([\s\S]*?)(?=\nSCORES:|$)/)
    const correctMatch = text.match(/Correctness:\s*(\d+)/)
    const clarityMatch = text.match(/Clarity:\s*(\d+)/)
    const efficiencyMatch = text.match(/Efficiency:\s*(\d+)/)

    const feedback = feedbackMatch ? feedbackMatch[1].trim() : text
    const scores = {
      correctness: correctMatch ? parseInt(correctMatch[1]) : null,
      clarity: clarityMatch ? parseInt(clarityMatch[1]) : null,
      efficiency: efficiencyMatch ? parseInt(efficiencyMatch[1]) : null,
    }

    const avg = scores.correctness && scores.clarity && scores.efficiency
      ? Math.round((scores.correctness + scores.clarity + scores.efficiency) / 3)
      : null

    // Send structured response back to frontend
    return res.status(200).json({ feedback, scores, avg })

  } catch (err) {
    console.error('Server error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router