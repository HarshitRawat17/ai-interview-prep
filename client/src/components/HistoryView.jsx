import React from 'react'

export default function HistoryView({ history, onClear }) {
  if (history.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 10,
        color: 'var(--text3)'
      }}>
        <div style={{ fontSize: 32 }}>📋</div>
        <div style={{ fontSize: 14 }}>No attempts yet</div>
        <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
          Practice a question to see your history
        </div>
      </div>
    )
  }

  const avgScore = history.filter(h => h.avg).reduce((acc, h) => acc + h.avg, 0) / history.filter(h => h.avg).length

  return (
    <div style={{ padding: '1.5rem 2rem', overflowY: 'auto', height: '100%' }}>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
        {[
          { label: 'Attempts', value: history.length },
          { label: 'Avg Score', value: avgScore ? `${Math.round(avgScore)}/10` : '—' },
          { label: 'This Week', value: history.filter(h => {
            const d = new Date(h.date)
            const now = new Date()
            return (now - d) < 7 * 24 * 60 * 60 * 1000
          }).length }
        ].map(s => (
          <div key={s.label} style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: 8,
            background: 'var(--bg2)',
            border: '0.5px solid var(--border)'
          }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
          </div>
        ))}
        <button
          onClick={onClear}
          style={{
            padding: '0 1rem',
            borderRadius: 8,
            border: '0.5px solid var(--border)',
            background: 'transparent',
            color: 'var(--text3)',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: 'Syne, sans-serif'
          }}
        >
          Clear
        </button>
      </div>

      {/* History list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {history.map(entry => (
          <div key={entry.id} style={{
            border: '0.5px solid var(--border)',
            borderRadius: 10,
            padding: '0.85rem 1rem',
            background: 'var(--bg2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{entry.questionTitle}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {entry.avg && (
                  <span style={{
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'var(--bg3)',
                    color: entry.avg >= 7 ? '#1D9E75' : entry.avg >= 5 ? '#BA7517' : '#E24B4A'
                  }}>
                    {entry.avg}/10
                  </span>
                )}
                <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
              {entry.feedback?.slice(0, 120)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
