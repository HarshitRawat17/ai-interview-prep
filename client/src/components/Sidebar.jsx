import React from 'react'
import { questions } from '../data/questions'

const TAG_COLORS = {
  DSA: { bg: '#0c2a4a', color: '#378ADD' },
  HR: { bg: '#0a2e20', color: '#1D9E75' },
  'System Design': { bg: '#2e1f07', color: '#BA7517' }
}

export default function Sidebar({ currentId, onSelect, view, onViewChange }) {
  const categories = ['DSA', 'HR', 'System Design']

  return (
    <aside style={{
      width: 230,
      minWidth: 230,
      borderRight: '0.5px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      background: 'var(--bg)'
    }}>
      {/* View toggle */}
      <div style={{ padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: 6 }}>
        {['practice', 'history'].map(v => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            style={{
              flex: 1,
              padding: '0.4rem',
              borderRadius: 6,
              border: '0.5px solid var(--border)',
              background: view === v ? 'var(--bg3)' : 'transparent',
              color: view === v ? 'var(--text)' : 'var(--text2)',
              fontFamily: 'Syne, sans-serif',
              fontSize: 12,
              fontWeight: view === v ? 500 : 400,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {v === 'practice' ? '⌨ Practice' : '📋 History'}
          </button>
        ))}
      </div>

      {/* Question list */}
      <div style={{ padding: '0.75rem 0.75rem', flex: 1 }}>
        {categories.map(cat => {
          const catQs = questions.filter(q => q.category === cat)
          return (
            <div key={cat}>
              <div style={{
                fontSize: 10,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                color: 'var(--text3)',
                padding: '0.5rem 0.5rem 0.25rem',
                marginTop: '0.5rem'
              }}>
                {cat}
              </div>
              {catQs.map(q => (
                <button
                  key={q.id}
                  onClick={() => onSelect(q.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: currentId === q.id ? 'var(--bg3)' : 'transparent',
                    border: '0.5px solid ' + (currentId === q.id ? 'var(--border2)' : 'transparent'),
                    borderRadius: 8,
                    padding: '0.5rem 0.6rem',
                    cursor: 'pointer',
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    fontSize: 10,
                    padding: '1px 6px',
                    borderRadius: 4,
                    fontFamily: 'JetBrains Mono, monospace',
                    background: TAG_COLORS[cat].bg,
                    color: TAG_COLORS[cat].color
                  }}>
                    {q.tag}
                  </span>
                  <span style={{
                    fontSize: 13,
                    color: currentId === q.id ? 'var(--text)' : 'var(--text2)',
                    fontWeight: currentId === q.id ? 500 : 400,
                    lineHeight: 1.3
                  }}>
                    {q.title}
                  </span>
                </button>
              ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
