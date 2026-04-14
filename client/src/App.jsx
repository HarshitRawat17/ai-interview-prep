import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import HistoryView from './components/HistoryView'
import { FeedbackPanel, DiffBadge } from './components/FeedbackPanel'
import { useClaude } from './hooks/useAI'
import { useHistory } from './hooks/useHistory'
import { questions } from './data/questions'

export default function App() {
  const [currentId, setCurrentId] = useState(1)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [view, setView] = useState('practice')

  const { getFeedback, loading } = useClaude()
  const { history, addEntry, clearHistory } = useHistory()

  const question = questions.find(q => q.id === currentId)

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
      addEntry(question.id, question.title, answer, res.feedback, res.scores, res.avg)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.5rem',
        borderBottom: '0.5px solid var(--border)',
        background: 'var(--bg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>
          <div style={{
            width: 10, height: 10,
            background: '#1D9E75',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          InterviewAI
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.85)} }`}</style>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
            {history.length} attempts
          </span>
          <span style={{
            fontSize: 11,
            padding: '3px 10px',
            borderRadius: 20,
            background: 'var(--bg3)',
            border: '0.5px solid var(--border)',
            color: 'var(--text2)',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            AI-powered
          </span>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          currentId={currentId}
          onSelect={handleSelect}
          view={view}
          onViewChange={setView}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {view === 'history' ? (
            <HistoryView history={history} onClear={clearHistory} />
          ) : (
            <>
              {/* Question */}
              <div style={{
                padding: '1.5rem 2rem 1rem',
                borderBottom: '0.5px solid var(--border)',
                background: 'var(--bg)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
                  <DiffBadge diff={question.difficulty} />
                  <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {question.category} · {question.tag}
                  </span>
                </div>
                <div
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: question.text }}
                />
                {question.hint && (
                  <div style={{
                    marginTop: '0.75rem',
                    fontSize: 12,
                    color: 'var(--text3)',
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: '0.4rem 0.75rem',
                    borderLeft: '2px solid var(--border2)',
                    background: 'var(--bg3)',
                    borderRadius: '0 6px 6px 0'
                  }}>
                    💡 Hint: {question.hint}
                  </div>
                )}
              </div>

              {/* Answer + Feedback area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: 'JetBrains Mono, monospace' }}>
                  Your Answer
                </div>

                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your solution, approach, or explanation here..."
                  style={{
                    width: '100%',
                    minHeight: 150,
                    resize: 'vertical',
                    padding: '0.85rem 1rem',
                    borderRadius: 8,
                    border: '0.5px solid var(--border2)',
                    background: 'var(--bg2)',
                    color: 'var(--text)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 13,
                    lineHeight: 1.7,
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !answer.trim()}
                    style={{
                      padding: '0.55rem 1.25rem',
                      background: 'var(--text)',
                      color: 'var(--bg)',
                      border: 'none',
                      borderRadius: 8,
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: loading || !answer.trim() ? 'not-allowed' : 'pointer',
                      opacity: loading || !answer.trim() ? 0.4 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{
                          width: 13, height: 13,
                          border: '2px solid rgba(0,0,0,0.3)',
                          borderTopColor: '#000',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin 0.7s linear infinite'
                        }} />
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                        Analyzing...
                      </>
                    ) : 'Get AI Feedback'}
                  </button>

                  <button
                    onClick={() => { setAnswer(''); setResult(null) }}
                    style={{
                      padding: '0.55rem 1rem',
                      background: 'transparent',
                      color: 'var(--text2)',
                      border: '0.5px solid var(--border)',
                      borderRadius: 8,
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 14,
                      cursor: 'pointer'
                    }}
                  >
                    Clear
                  </button>
                </div>

                {result ? (
                  <FeedbackPanel result={result} />
                ) : (
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', flex: 1, gap: 8,
                    color: 'var(--text3)', fontSize: 13
                  }}>
                    <div style={{
                      width: 38, height: 38,
                      border: '0.5px solid var(--border)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16
                    }}>✦</div>
                    Write your answer and get AI feedback
                    <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>
                      Scored on Correctness · Clarity · Efficiency
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
