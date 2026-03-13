import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const PRIORITY_COLORS = {
  HIGH:   'text-red-400 bg-red-400/10 border-red-400/20',
  MEDIUM: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  LOW:    'text-green-400 bg-green-400/10 border-green-400/20',
}

const STATUS_COLORS = {
  TODO:        'text-gray-400 bg-gray-400/10 border-gray-400/20',
  IN_PROGRESS: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  DONE:        'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', priority: 'MEDIUM' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks')
      setTasks(res.data)
    } catch (err) {
      console.error('Failed to fetch tasks', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await api.post('/api/tasks', form)
      setTasks([res.data, ...tasks])
      setForm({ title: '', description: '', priority: 'MEDIUM' })
      setShowForm(false)
    } catch (err) {
      console.error('Failed to create task', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await api.put(`/api/tasks/${taskId}`, { status: newStatus })
      setTasks(tasks.map(t => t.id === taskId ? res.data : t))
    } catch (err) {
      console.error('Failed to update task', err)
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`)
      setTasks(tasks.filter(t => t.id !== taskId))
    } catch (err) {
      console.error('Failed to delete task', err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const todoTasks       = tasks.filter(t => t.status === 'TODO')
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS')
  const doneTasks       = tasks.filter(t => t.status === 'DONE')

  return (
    <div className="min-h-screen bg-[#050810]">

      {/* Navbar */}
      <nav className="border-b border-[#21262d] bg-[#0d1117] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xs">ST</span>
            </div>
            <span className="text-white font-bold">SmartTask</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={() => setShowForm(true)}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all"
            >
              + New Task
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">
            Good day, {user?.name} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {tasks.length} tasks total · {doneTasks.length} completed
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'To Do',       count: todoTasks.length,       color: 'border-gray-600' },
            { label: 'In Progress', count: inProgressTasks.length, color: 'border-blue-500' },
            { label: 'Done',        count: doneTasks.length,       color: 'border-cyan-400' },
          ].map(stat => (
            <div key={stat.label} className={`bg-[#0d1117] border border-[#21262d] border-t-2 ${stat.color} rounded-xl p-4`}>
              <div className="text-2xl font-bold text-white">{stat.count}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Task list */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500 mb-4">No tasks yet. Create your first one.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-6 py-2 rounded-lg text-sm transition-all"
            >
              + Create Task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id}
                className="bg-[#0d1117] border border-[#21262d] rounded-xl p-5 flex items-start justify-between gap-4 hover:border-gray-600 transition-all group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${PRIORITY_COLORS[task.priority]}`}>
                      {task.priority}
                    </span>
                    {task.aiSuggested && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded border text-purple-400 bg-purple-400/10 border-purple-400/20">
                        AI
                      </span>
                    )}
                  </div>
                  <h3 className={`text-white font-medium mt-1 ${task.status === 'DONE' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mt-1 truncate">{task.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`text-xs font-mono px-2 py-1 rounded border bg-transparent cursor-pointer outline-none ${STATUS_COLORS[task.status]}`}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#0d1117] border border-[#21262d] rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">New Task</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Task title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="What needs to be done?"
                  required
                  className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description (optional)</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Add details..."
                  rows={3}
                  className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all placeholder-gray-600 resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Priority</label>
                <select
                  value={form.priority}
                  onChange={e => setForm({ ...form, priority: e.target.value })}
                  className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-all"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-[#21262d] text-gray-400 py-3 rounded-lg text-sm hover:border-gray-500 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-lg text-sm transition-all disabled:opacity-60">
                  {submitting ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}