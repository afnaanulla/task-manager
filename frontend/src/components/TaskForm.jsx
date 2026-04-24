import { useState } from "react";
import api from "../api/axios";

const TaskForm = ({ onTaskCreated, onError }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await api.post("/tasks", { title, body });
      setTitle("");
      setBody("");
      onTaskCreated();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create task";
      onError?.(message);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">New Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="w-full bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 mb-3 disabled:opacity-50"
        disabled={submitting}
      />

      <textarea
        placeholder="Task description (optional)"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={2}
        className="w-full bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 mb-4 resize-none disabled:opacity-50"
        disabled={submitting}
      />

      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Task
          </>
        )}
      </button>
    </form>
  );
};

export default TaskForm;