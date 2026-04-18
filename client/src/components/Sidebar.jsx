import { useState } from "react"

export default function Sidebar({
  currentId,
  onSelect,
  questions,
  onLogout
}) {

  const categories = ["DSA", "HR", "System Design", "CS Fundamentals"]
  const [activeCategory, setActiveCategory] = useState("DSA")

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "text-green-400"
    if (diff === "Medium") return "text-yellow-400"
    if (diff === "Hard") return "text-red-400"
    return "text-gray-400"
  }

  const filtered = questions.filter(q => q.category === activeCategory)

  return (
    <div className="h-full flex flex-col">

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto custom-scroll px-4 py-4">

        {/* CATEGORY SECTION */}
        <div className="mb-6">
          <h3 className="text-xs text-gray-500 uppercase mb-2 tracking-wider">
            Category
          </h3>

          <div className="space-y-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`block text-sm px-3 py-2 rounded-lg w-full text-left transition
                  ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* QUESTIONS SECTION */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase mb-2 tracking-wider">
            Questions
          </h3>

          <div className="space-y-1">

            {filtered.map(q => (
              <button
                key={q.id}
                onClick={() => onSelect(q.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
                  ${
                    currentId === q.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <div className="flex justify-between items-center gap-2">
                  
                  <span className="truncate">
                    {q.title}
                  </span>

                  <span className={`text-xs ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty}
                  </span>

                </div>
              </button>
            ))}

          </div>
        </div>

      </div>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-slate-800">
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