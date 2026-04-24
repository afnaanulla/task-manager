import { useState } from "react";
import api from "../api/axios";

const TaskList = ({ tasks, refresh, onError }) => {
  const [actionId, setActionId] = useState(null);

  const toggleStatus = async (task) => {
    setActionId(task.id);
    try {
      const newStatus = task.status === "PENDING" ? "COMPLETED" : "PENDING";
      await api.patch(`/tasks/${task.id}`, { title: task.title, status: newStatus });
      refresh();
    } catch (error) {
      onError?.(error.response?.data?.message || "Failed to update task");
      console.error(error);
    } finally {
      setActionId(null);
    }
  };

  const deleteTask = async (id) => {
    setActionId(id);
    try {
      await api.delete(`/tasks/${id}`);
      refresh();
    } catch (error) {
      onError?.(error.response?.data?.message || "Failed to delete task");
      console.error(error);
    } finally {
      setActionId(null);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 mb-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <p className="text-gray-400 font-medium">No tasks yet</p>
        <p className="text-gray-600 text-sm mt-1">Create your first task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Tasks</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group bg-gray-900/60 border rounded-2xl p-4 flex items-start justify-between gap-4 transition-all duration-200 hover:border-gray-700 ${
            task.status === "COMPLETED"
              ? "border-gray-800/50 opacity-60"
              : "border-gray-800"
          }`}
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.status === "COMPLETED"
                ? "bg-emerald-500 border-emerald-500"
                : "border-gray-600"
            }`}>
              {task.status === "COMPLETED" && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>

            <div className="min-w-0">
              <h3 className={`font-medium text-sm leading-snug ${
                task.status === "COMPLETED" ? "line-through text-gray-500" : "text-white"
              }`}>
                {task.title}
              </h3>
              {task.body && (
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.body}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => toggleStatus(task)}
              disabled={actionId === task.id}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                task.status === "PENDING"
                  ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {actionId === task.id ? "..." : task.status === "PENDING" ? "Complete" : "Undo"}
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              disabled={actionId === task.id}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionId === task.id ? "..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;