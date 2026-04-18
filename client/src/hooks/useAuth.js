import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api/auth'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load user from localStorage on app start
  useEffect(() => {
    const saved = localStorage.getItem('interviewai_user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
  }, [])

  async function register(name, email, password) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      localStorage.setItem('interviewai_token', data.token)
      localStorage.setItem('interviewai_user', JSON.stringify(data.user))

      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      localStorage.setItem('interviewai_token', data.token)
      localStorage.setItem('interviewai_user', JSON.stringify(data.user))

      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('interviewai_token')
    localStorage.removeItem('interviewai_user')
    setUser(null)
  }

  function getToken() {
    return localStorage.getItem('interviewai_token')
  }

  return { user, loading, error, register, login, logout, getToken }
}