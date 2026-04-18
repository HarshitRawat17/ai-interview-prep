import React from 'react'

export default function HistoryView({ history, onClear }) {

  // ✅ format seconds → mm:ss
  function formatTime(sec) {
    if (!sec) return "0s"

    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60

    return `${minutes}m ${seconds}s`
  }

  return (
    <div style={{ padding: '1.5rem' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <h3>Attempts</h3>

        <button onClick={onClear}>
          Clear
        </button>
      </div>

      {history.length === 0 ? (
        <p>No attempts yet</p>
      ) : (
        history.map((item, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: 8
          }}>

            <h4>{item.title}</h4>

            {/* ✅ SCORE */}
            <p>
              Score: <b>{item.avg}/10</b>
            </p>

            {/* ✅ TIME */}
            <p>
              ⏱ Time Taken: <b>{formatTime(item.timeTaken)}</b>
            </p>

            {/* ✅ DATE */}
            <p style={{ fontSize: 12, color: '#666' }}>
              {new Date(item.createdAt).toLocaleString()}
            </p>

            {/* FEEDBACK */}
            <p style={{ marginTop: 8 }}>
              {item.feedback?.slice(0, 120)}...
            </p>

          </div>
        ))
      )}

    </div>
  )
}