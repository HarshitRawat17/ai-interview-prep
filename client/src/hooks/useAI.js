import { useState } from 'react'

// Now calls OUR backend instead of Groq directly
// API key is safe on the server — never exposed to browser

export function useClaude() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getFeedback(question, answer) {
    setLoading(true)
    setError(null)

    try {
      // Call our own backend
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Server error')
      }

      // Backend already parsed the AI response for us
      const data = await res.json()
      return data

    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getFeedback, loading, error }
}
