import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/history";

export function useHistory(getToken, user) {
  const [history, setHistory] = useState([]);

  async function fetchHistory() {
    try {
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  }

  useEffect(() => {
    if (user) fetchHistory();
    else setHistory([]);
  }, [user]);

  async function addEntry(questionId, title, answer, feedback, scores, avg, timeTaken) {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          questionId,
          title,
          answer,
          feedback,
          scores,
          avg,
          timeTaken   // ✅ NEW
        })
      });

      const data = await res.json();
      setHistory(prev => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  }

  async function clearHistory() {
    try {
      await fetch(API, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  }

  return { history, addEntry, clearHistory };
}