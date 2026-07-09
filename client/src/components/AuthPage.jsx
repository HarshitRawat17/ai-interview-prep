import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthPage({ auth, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (mode === 'signup') {
      const ok = await auth.register(name, email, password)
      if (ok && onClose) onClose()
      else if (!ok) setMessage(auth.error || 'Signup failed')
      return
    }

    if (mode === 'login') {
      const ok = await auth.login(email, password)
      if (ok && onClose) onClose()
      else if (!ok) setMessage(auth.error || 'Login failed')
      return
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm text-white flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose()
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#020617] shadow-2xl p-8 relative">

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition text-xl leading-none"
          >
            ✕
          </button>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold shadow-lg">
            AI
          </div>

          <h1 className="mt-4 text-3xl font-semibold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            InterviewAI
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Crack interviews with AI
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 border border-slate-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => {
              setMode('login')
              setShowPassword(false)
            }}
            className={`flex-1 py-2 rounded-lg ${
              mode === 'login'
                ? 'bg-indigo-600'
                : 'text-slate-400'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setMode('signup')
              setShowPassword(false)
            }}
            className={`flex-1 py-2 rounded-lg ${
              mode === 'signup'
                ? 'bg-indigo-600'
                : 'text-slate-400'
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-slate-700 focus:border-indigo-500 outline-none"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-slate-700 focus:border-indigo-500 outline-none"
            required
          />

          {/* Password Field with Icon */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-black/30 border border-slate-700 focus:border-indigo-500 outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {message && (
            <p className="text-red-400 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={auth.loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
          >
            {auth.loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Login'
              : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}