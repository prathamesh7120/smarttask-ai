import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
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
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
      login({ name: res.data.name, email: res.data.email }, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center px-4 py-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">ST</span>
            </div>
            <span className="text-white font-bold text-xl">SmartTask</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start managing tasks smarter with AI</p>
        </div>

        <div className="bg-[#0d1117] border border-[#21262d] rounded-2xl p-8">

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Full name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Confirm password</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••" required
                className="w-full bg-[#161b22] border border-[#21262d] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}