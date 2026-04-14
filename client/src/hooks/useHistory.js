import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api/history'

export function useHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  async function fetchHistory() {
    try {
      const res = await fetch(API)
      const data = await res.json()
      setHistory(data)
    } catch (err) {
      console.error('Failed to fetch history:', err.message)
    }
  }

  async function addEntry(questionId, questionTitle, answer, feedback, scores, avg) {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, questionTitle, answer, feedback, scores, avg })
      })
      const data = await res.json()
      setHistory(prev => [data.attempt, ...prev])
    } catch (err) {
      console.error('Failed to save attempt:', err.message)
    }
  }

  async function clearHistory() {
    try {
      await fetch(API, { method: 'DELETE' })
      setHistory([])
    } catch (err) {
      console.error('Failed to clear history:', err.message)
    }
  }

  return { history, addEntry, clearHistory }
}