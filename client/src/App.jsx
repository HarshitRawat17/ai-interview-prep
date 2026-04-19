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

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'

const getEditorTemplate = (question) => {
  if (!question) return '// Write your solution here...'

  const title = question.title?.toLowerCase() || ''

  if (title.includes('two sum')) {
    return `// Write your solution here...
// Example:
function twoSum(nums, target) {
  // your code
}`
  }

  if (title.includes('reverse linked list')) {
    return `// Write your solution here...
function reverseList(head) {
  // your code
}`
  }

  if (title.includes('binary search')) {
    return `// Write your solution here...
function binarySearch(nums, target) {
  // your code
}`
  }

  return `// Write your solution here...
// Explain your approach or add code below...`
}

export default function App() {
  const auth = useAuth()

  const [currentId, setCurrentId] = useState(1)
  const [result, setResult] = useState(null)
  const [view, setView] = useState('practice')
  const [time, setTime] = useState(0)
  const [theme, setTheme] = useState(() => localStorage.getItem('interviewai_theme') || 'dark')

  const question = questions?.find(q => q.id === currentId)
  const [answer, setAnswer] = useState(getEditorTemplate(question))

  const resultRef = useRef(null)
  const centerScrollRef = useRef(null)

  const { getFeedback, loading } = useClaude()
  const { history, addEntry, clearHistory } = useHistory(auth.getToken, auth.user)

  useEffect(() => {
    localStorage.setItem('interviewai_theme', theme)

    if (theme === 'light') {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
  }, [theme])

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [currentId])

  useEffect(() => {
    setTime(0)
  }, [currentId])

  useEffect(() => {
    if (question) {
      setAnswer(getEditorTemplate(question))
      setResult(null)
    }
  }, [currentId])

  useEffect(() => {
    if (resultRef.current && centerScrollRef.current) {
      const container = centerScrollRef.current
      const target = resultRef.current

      container.scrollTo({
        top: target.offsetTop - 10,
        behavior: 'smooth'
      })
    }
  }, [result])

  if (!auth.user) return <AuthPage auth={auth} />
  if (!question) return <div>Loading...</div>

  const isDark = theme === 'dark'

  const pageBg = isDark
    ? 'bg-[#020617] text-white'
    : 'bg-slate-100 text-slate-900'

  const shellBg = isDark ? 'bg-white/5 border-slate-800' : 'bg-white/80 border-slate-200'
  const panelBg = isDark ? 'bg-black/40 border-slate-700' : 'bg-slate-50 border-slate-200'
  const subText = isDark ? 'text-gray-300' : 'text-slate-700'
  const mutedText = isDark ? 'text-gray-400' : 'text-slate-500'
  const headerBorder = isDark ? 'border-slate-800' : 'border-slate-200'
  const tabIdle = isDark
    ? 'text-gray-400 hover:text-white'
    : 'text-slate-500 hover:text-slate-900'
  const boxBg = isDark ? 'bg-white/5' : 'bg-white'
  const editorBorder = isDark ? 'border-slate-800' : 'border-slate-200'

  function handleSelect(id) {
    setCurrentId(id)
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
    <div className={`h-screen overflow-hidden flex flex-col ${pageBg}`}>
      {/* FULL-WIDTH HEADER */}
      <header
        className={`h-14 shrink-0 border-b flex items-center justify-between px-4 sm:px-5 lg:px-6 backdrop-blur-xl ${
          isDark ? 'bg-white/5' : 'bg-white/70'
        } ${headerBorder}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex h-5 w-5 items-center justify-center shrink-0">
            <div className="absolute h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="h-5 w-5 rounded-full border border-emerald-500/30" />
          </div>

          <span className="font-semibold tracking-wide text-base sm:text-lg bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            InterviewAI
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className={`px-3 sm:px-4 py-1.5 rounded-lg border backdrop-blur whitespace-nowrap ${boxBg} ${headerBorder} ${mutedText}`}>
            {history.length} attempts
          </div>

          <div className={`px-3 sm:px-4 py-1.5 rounded-lg border backdrop-blur whitespace-nowrap ${boxBg} ${headerBorder} text-green-500 font-medium`}>
            ⏱ {String(Math.floor(time / 60)).padStart(2, '0')}:
            {String(time % 60).padStart(2, '0')}
          </div>

          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg border backdrop-blur whitespace-nowrap transition ${boxBg} ${headerBorder}`}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div
          className={`w-72 sm:w-80 lg:w-60 border-r backdrop-blur-xl shrink-0 ${
            isDark ? 'bg-white/5' : 'bg-white/70'
          } ${headerBorder}`}
        >
          <Sidebar
            currentId={currentId}
            onSelect={handleSelect}
            view={view}
            onViewChange={setView}
            questions={questions}
            onLogout={auth.logout}
            theme={theme}
          />
        </div>

        {/* MAIN */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 h-full max-w-[1600px] mx-auto">
            {/* CENTER */}
            <div
              ref={centerScrollRef}
              className="flex-1 min-w-0 order-2 xl:order-1 overflow-y-auto custom-scroll pr-2"
            >
              <div className="space-y-4 lg:space-y-5 pb-6">
                {/* TABS */}
                <div className={`flex flex-wrap gap-2 p-1 rounded-xl backdrop-blur border w-fit max-w-full ${shellBg}`}>
                  {['practice', 'history', 'analytics'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setView(tab)}
                      className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm capitalize transition-all ${
                        view === tab
                          ? 'bg-indigo-600 text-white shadow-md'
                          : tabIdle
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* PRACTICE */}
                {view === 'practice' && (
                  <>
                    <div className={`p-4 sm:p-5 lg:p-6 rounded-2xl border backdrop-blur-xl shadow-lg ${shellBg}`}>
                      <DiffBadge diff={question.difficulty} />

                      <h2 className="text-lg sm:text-xl mt-3 font-semibold break-words">
                        {question.title}
                      </h2>

                      <p className={`mt-3 leading-relaxed text-sm sm:text-base ${subText}`}>
                        {question.text}
                      </p>

                      {(question.input || question.output) && (
                        <div className="mt-5">
                          <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${mutedText}`}>
                            Example 1
                          </div>
                        </div>
                      )}

                      {question.input && (
                        <div className={`mt-2 p-3 rounded-lg border-l-4 border-indigo-500 border overflow-x-auto text-sm ${panelBg}`}>
                          <span className={`${mutedText} font-medium`}>Input</span>
                          <pre className={`mt-1 whitespace-pre-wrap break-words ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                            {question.input}
                          </pre>
                        </div>
                      )}

                      {question.output && (
                        <div className={`mt-3 p-3 rounded-lg border-l-4 border-purple-500 border overflow-x-auto text-sm ${panelBg}`}>
                          <span className={`${mutedText} font-medium`}>Output</span>
                          <pre className={`mt-1 whitespace-pre-wrap break-words ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                            {question.output}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className={`rounded-xl overflow-hidden border shadow-lg ${editorBorder}`}>
                      <CodeMirror
                        value={answer}
                        height="240px"
                        theme={dracula}
                        extensions={[javascript()]}
                        onChange={setAnswer}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
                          loading
                            ? 'bg-gray-600 cursor-not-allowed text-white'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-md text-white'
                        }`}
                      >
                        {loading ? 'Analyzing...' : 'Get AI Feedback'}
                      </button>

                      <button
                        onClick={() => {
                          setAnswer(getEditorTemplate(question))
                          setResult(null)
                        }}
                        className={`px-4 py-2.5 rounded-xl border transition ${editorBorder} ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
                      >
                        Reset
                      </button>
                    </div>

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
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full xl:w-[300px] shrink-0 order-1 xl:order-2 space-y-4">
              <CameraPanel theme={theme} />

              <div className={`p-4 rounded-xl border backdrop-blur shadow-lg ${shellBg}`}>
                <h4 className={`text-sm ${mutedText} mb-2`}>Confidence</h4>

                {result ? (
                  <>
                    <div className="text-2xl text-green-400 font-semibold">
                      {result.avg * 10}%
                    </div>

                    <div className={`mt-3 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${result.avg * 10}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className={`${mutedText} text-sm`}>No data yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}