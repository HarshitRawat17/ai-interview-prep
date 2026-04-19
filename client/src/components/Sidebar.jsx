import { useState } from "react"

export default function Sidebar({
  currentId,
  onSelect,
  questions,
  onLogout,
  theme = 'dark'
}) {
  const categories = ["DSA", "HR", "System Design", "CS Fundamentals"]
  const [activeCategory, setActiveCategory] = useState("DSA")

  const isDark = theme === 'dark'

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "text-green-400"
    if (diff === "Medium") return "text-yellow-400"
    if (diff === "Hard") return "text-red-400"
    return "text-gray-400"
  }

  const filtered = questions.filter(q => q.category === activeCategory)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scroll px-4 py-4">
        <div className="mb-6">
          <h3 className={`text-xs uppercase mb-2 tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
            Category
          </h3>

          <div className="space-y-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`block text-sm px-3 py-2 rounded-lg w-full text-left transition ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : isDark
                    ? 'text-gray-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-xs uppercase mb-2 tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
            Questions
          </h3>

          <div className="space-y-1">
            {filtered.map(q => (
              <button
                key={q.id}
                onClick={() => onSelect(q.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  currentId === q.id
                    ? 'bg-indigo-600 text-white'
                    : isDark
                    ? 'text-gray-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="truncate pr-2">{q.title}</span>
                  <span className={`text-xs shrink-0 ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  )
}