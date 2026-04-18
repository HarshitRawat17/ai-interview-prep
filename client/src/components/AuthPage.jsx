import React, { useState } from 'react'

export default function AuthPage({ auth }) {
  const [mode, setMode] = useState('login') // login | signup | forgot
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (mode === 'login') {
        const res = await auth.login(email, password)
        if (!res.success) setMessage(res.message)
      }

      if (mode === 'signup') {
        const res = await auth.register(email, password)
        if (!res.success) setMessage(res.message)
      }

      if (mode === 'forgot') {
        // simple UX improvement instead of fake backend
        setMessage('Check your email for reset instructions (demo)')
      }
    } catch {
      setMessage('Server error')
    }

    setLoading(false)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="w-[380px] p-6 rounded-2xl border border-slate-800 bg-white/5 backdrop-blur-xl shadow-xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold">
            AI
          </div>
          <h2 className="mt-3 text-lg font-semibold">InterviewAI</h2>
          <p className="text-xs text-gray-400">Crack interviews with AI</p>
        </div>

        {/* TOGGLE */}
        {mode !== 'forgot' && (
          <div className="flex bg-white/5 p-1 rounded-xl mb-5 border border-slate-800">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-sm ${
                mode === 'login' ? 'bg-indigo-600' : 'text-gray-400'
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 rounded-lg text-sm ${
                mode === 'signup' ? 'bg-indigo-600' : 'text-gray-400'
              }`}
            >
              Signup
            </button>
          </div>
        )}

        {/* TITLE */}
        <h3 className="text-center text-sm text-gray-300 mb-4">
          {mode === 'login' && 'Welcome back'}
          {mode === 'signup' && 'Create your account'}
          {mode === 'forgot' && 'Reset your password'}
        </h3>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
          />

          {mode !== 'forgot' && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
            />
          )}

          {message && (
            <div className="text-xs text-center text-red-400">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-sm font-medium transition
              ${
                loading
                  ? 'bg-gray-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90'
              }`}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Login'
              : mode === 'signup'
              ? 'Create Account'
              : 'Send Reset Link'}
          </button>

        </form>

        {/* LINKS */}
        <div className="text-center mt-4 text-xs text-gray-400">

          {mode === 'login' && (
            <button onClick={() => setMode('forgot')}>
              Forgot password?
            </button>
          )}

          {mode === 'forgot' && (
            <button onClick={() => setMode('login')}>
              Back to login
            </button>
          )}

        </div>

      </div>
    </div>
  )
}