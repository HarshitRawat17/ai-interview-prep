import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import HistoryView from './components/HistoryView'
import Analytics from './components/Analytics'
import { FeedbackPanel, DiffBadge } from './components/FeedbackPanel'
import { useClaude } from './hooks/useAI'
import { useHistory } from './hooks/useHistory'
import { questions } from './data/questions'
import CameraPanel from './components/CameraPanel'

import useAuth from './hooks/useAuth'
import AuthPage from './components/AuthPage'

// CodeMirror
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'

export default function App() {

  const auth = useAuth()

  const [currentId, setCurrentId] = useState(1)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [view, setView] = useState('practice')
  const [time, setTime] = useState(0)

  const resultRef = useRef(null)

  const { getFeedback, loading } = useClaude()
  const { history, addEntry, clearHistory } = useHistory(auth.getToken, auth.user)

  const question = questions?.find(q => q.id === currentId)

  // TIMER
  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [currentId])

  useEffect(() => setTime(0), [currentId])

  // AUTO SCROLL
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [result])

  if (!auth.user) return <AuthPage auth={auth} />
  if (!question) return <div>Loading...</div>

  function handleSelect(id) {
    setCurrentId(id)
    setAnswer('')
    setResult(null)
    setView('practice')
  }

  async function handleSubmit() {
    if (!answer.trim() || loading) return

    const res = await getFeedback(question.plain, answer)

    if (res) {
      setResult(res)
      addEntry(
        question.id,
        question.title,
        answer,
        res.feedback,
        res.scores,
        res.avg,
        time
      )
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">

      {/* SIDEBAR */}
      <div className="w-60 border-r border-slate-800 backdrop-blur-xl bg-white/5">
        <Sidebar
          currentId={currentId}
          onSelect={handleSelect}
          view={view}
          onViewChange={setView}
          questions={questions}
          onLogout={auth.logout}
        />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 backdrop-blur-xl bg-white/5">

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold tracking-wide text-sm">
              InterviewAI
            </span>
          </div>

          <div className="flex gap-3 text-sm">

            <div className="px-4 py-1.5 rounded-lg border border-slate-700 bg-white/5 backdrop-blur">
              {history.length} attempts
            </div>

            <div className="px-4 py-1.5 rounded-lg border border-slate-700 bg-white/5 backdrop-blur text-green-400 font-medium">
              ⏱ {String(Math.floor(time / 60)).padStart(2, '0')}:
              {String(time % 60).padStart(2, '0')}
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="flex gap-6 p-6 justify-center overflow-y-auto">

          {/* CENTER */}
          <div className="w-[720px] space-y-5 max-h-[calc(100vh-80px)] overflow-y-auto pr-2 custom-scroll">

            {/* TABS */}
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl backdrop-blur border border-slate-800 w-fit">

              {['practice', 'history', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setView(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-all
                    ${
                      view === tab
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}

            </div>

            {/* PRACTICE */}
            {view === 'practice' && (
              <>
                {/* QUESTION CARD */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-white/5 backdrop-blur-xl shadow-lg">

                  <DiffBadge diff={question.difficulty} />

                  <h2 className="text-xl mt-3 font-semibold">
                    {question.title}
                  </h2>

                  <p className="text-gray-300 mt-3 leading-relaxed">
                    {question.text}
                  </p>

                  {question.input && (
                    <div className="mt-4 p-3 rounded-lg bg-black/40 border border-slate-700 text-sm">
                      <span className="text-gray-400">Input:</span>
                      <pre className="mt-1 text-gray-200">{question.input}</pre>
                    </div>
                  )}

                  {question.output && (
                    <div className="mt-3 p-3 rounded-lg bg-black/40 border border-slate-700 text-sm">
                      <span className="text-gray-400">Output:</span>
                      <pre className="mt-1 text-gray-200">{question.output}</pre>
                    </div>
                  )}

                </div>

                {/* EDITOR */}
                <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                  <CodeMirror
                    value={answer}
                    height="240px"
                    theme={dracula}
                    extensions={[javascript()]}
                    onChange={setAnswer}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`flex-1 py-2.5 rounded-xl font-medium transition-all
                      ${
                        loading
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-md'
                      }`}
                  >
                    {loading ? 'Analyzing...' : 'Get AI Feedback'}
                  </button>

                  <button
                    onClick={() => {
                      setAnswer('')
                      setResult(null)
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-white/5 transition"
                  >
                    Clear
                  </button>

                </div>

                {/* RESULT */}
                {result && (
                  <div ref={resultRef} className="mt-4">
                    <FeedbackPanel result={result} />
                  </div>
                )}
              </>
            )}

            {view === 'history' && (
              <HistoryView history={history} onClear={clearHistory} />
            )}

            {view === 'analytics' && (
              <Analytics history={history} />
            )}

          </div>

          {/* RIGHT PANEL */}
          <div className="w-[300px] space-y-4">

            <CameraPanel />

            <div className="p-4 rounded-xl border border-slate-800 bg-white/5 backdrop-blur shadow-lg">
              <h4 className="text-sm text-gray-400">Confidence</h4>
              <p className="text-2xl text-green-400 mt-2 font-semibold">
                {result ? `${result.avg * 10}%` : '--'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}