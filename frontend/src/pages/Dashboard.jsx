import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-black font-black text-2xl">ST</span>
        </div>
        <h1 className="text-white text-3xl font-bold mb-2">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mb-8">
          You are logged in as <span className="text-cyan-400">{user?.email}</span>
        </p>
        <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-6 mb-6 text-left max-w-sm mx-auto">
          <p className="text-gray-500 text-xs font-mono mb-2">// COMING NEXT</p>
          <p className="text-gray-400 text-sm">Task board, AI features, Kanban view...</p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-[#21262d] hover:border-red-500 text-gray-400 hover:text-red-400 px-6 py-2 rounded-lg text-sm transition-all"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}