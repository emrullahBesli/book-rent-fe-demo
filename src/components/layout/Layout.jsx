import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext.jsx'

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    navigate('/', { replace: true })
    await logout()
  }

  return (
    <div className="app-shell">
      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5">
          <Link to="/" className="font-serif text-xl tracking-tight text-cream">
            Book Rent
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? 'font-medium text-gold' : 'text-cream/65 hover:text-cream'
              }
            >
              Kitaplar
            </NavLink>
            <NavLink
              to="/books/new"
              className={({ isActive }) =>
                isActive ? 'font-medium text-gold' : 'text-cream/65 hover:text-cream'
              }
            >
              Kitap ekle
            </NavLink>
            <span className="hidden text-cream/40 sm:inline">{user?.username}</span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-cream/25 px-3 py-1.5 text-cream/90 hover:border-cream/50"
            >
              Çıkış
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <Outlet />
      </main>
    </div>
  )
}
