import React from 'react'

const DIFF_STYLES = {
  Easy:   { bg: '#0f2e1a', color: '#1D9E75' },
  Medium: { bg: '#2e1f07', color: '#BA7517' },
  Hard:   { bg: '#2e0f0f', color: '#E24B4A' }
}

export function DiffBadge({ diff }) {
  const s = DIFF_STYLES[diff] || DIFF_STYLES.Easy
  return (
    <span style={{
      fontSize: 11,
      padding: '2px 8px',
      borderRadius: 4,
      fontFamily: 'JetBrains Mono, monospace',
      background: s.bg,
      color: s.color
    }}>
      {diff}
    </span>
  )
}

export function ScoreBar({ label, value, color }) {
  return (
    <div style={{
      flex: 1,
      padding: '0.5rem 0.75rem',
      borderRadius: 8,
      background: 'var(--bg3)',
      border: '0.5px solid var(--border)'
    }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text3)', fontFamily: 'JetBrains Mono, monospace' }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2, color }}>
        {value != null ? `${value}/10` : '—'}
      </div>
      <div style={{ height: 3, background: 'var(--bg)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: color,
          borderRadius: 2,
          width: value ? `${value * 10}%` : '0%',
          transition: 'width 0.6s ease'
        }} />
      </div>
    </div>
  )
}

export function FeedbackPanel({ result }) {
  if (!result) return null
  const { feedback, scores, avg } = result

  return (
    <div style={{
      border: '0.5px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      background: 'var(--bg2)'
    }}>
      <div style={{
        padding: '0.75rem 1rem',
        background: 'var(--bg3)',
        borderBottom: '0.5px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#1D9E75" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI Feedback
        </div>
        {avg && (
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            padding: '2px 10px',
            borderRadius: 20,
            border: '0.5px solid var(--border2)',
            color: 'var(--text2)'
          }}>
            {avg}/10
          </span>
        )}
      </div>

      <div style={{
        padding: '1rem',
        fontSize: 14,
        lineHeight: 1.75,
        color: 'var(--text)',
        whiteSpace: 'pre-wrap'
      }}>
        {feedback}
      </div>

      {scores.correctness && (
        <div style={{
          display: 'flex',
          gap: 10,
          padding: '0.75rem 1rem',
          borderTop: '0.5px solid var(--border)'
        }}>
          <ScoreBar label="Correctness" value={scores.correctness} color="#1D9E75" />
          <ScoreBar label="Clarity"     value={scores.clarity}     color="#378ADD" />
          <ScoreBar label="Efficiency"  value={scores.efficiency}  color="#BA7517" />
        </div>
      )}
    </div>
  )
}
