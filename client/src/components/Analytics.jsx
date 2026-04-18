import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function Analytics({ history }) {

  // ✅ transform data for chart
  const data = history.map((item, index) => ({
    attempt: index + 1,
    score: item.avg || 0,
    time: item.timeTaken || 0
  }))

  if (history.length === 0) {
    return <p style={{ padding: '1rem' }}>No data to show</p>
  }

  return (
    <div style={{ padding: '1.5rem' }}>

      <h3 style={{ marginBottom: '1rem' }}>
        📊 Performance Analytics
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="attempt" />
          <YAxis />

          <Tooltip />

          {/* ✅ SCORE LINE */}
          <Line
            type="monotone"
            dataKey="score"
            stroke="#22c55e"
            strokeWidth={2}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}