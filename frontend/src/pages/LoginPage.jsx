import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/auth/login', {
        email: form.email,
        password: form.password
      })
      login({ name: res.data.name, email: res.data.email }, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">ST</span>
            </div>
            <span className="text-white font-bold text-xl">SmartTask</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your workspace</p>
        </div>

        <div className="bg-[#0d1117] border border-[#21262d] rounded-2xl p-8">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-400 text-sm font-medium">Password</label>
                <a href="#" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">Forgot password?</a>
              </div>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#21262d]" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-[#21262d]" />
          </div>

          <button className="w-full border border-[#21262d] hover:border-gray-500 text-gray-300 font-medium py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}