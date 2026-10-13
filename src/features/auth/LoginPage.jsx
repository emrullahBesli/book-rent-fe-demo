import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import { ApiError } from '../../lib/api.js'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/books" replace />
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      const to = location.state?.from?.pathname || '/books'
      navigate(to, { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Giriş başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-cream/10 bg-cream/[0.04] p-8"
      >
        <Link to="/" className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Book Rent
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-cream">Giriş yap</h1>
        <p className="mt-2 text-sm text-cream/55">
          Demo: <span className="text-cream/80">admin / admin123</span>
        </p>

        <label className="mt-6 block text-sm text-cream/70">
          Kullanıcı adı
          <input
            className="mt-1 w-full rounded-xl border border-cream/15 bg-ink/40 px-3 py-2 text-cream outline-none focus:border-gold"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="mt-4 block text-sm text-cream/70">
          Şifre
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-cream/15 bg-ink/40 px-3 py-2 text-cream outline-none focus:border-gold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? 'Giriş yapılıyor…' : 'Giriş'}
        </button>
      </form>
    </main>
  )
}
