import { createContext, useContext, useMemo, useState } from 'react'
import { authApi } from './auth.api.js'
import { storage } from '../../lib/storage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => storage.getToken())
  const [user, setUser] = useState(() => storage.getUser())

  const value = useMemo(() => {
    const login = async (username, password) => {
      const json = await authApi.login(username, password)
      storage.setSession(json.data.token, json.data.user)
      setToken(json.data.token)
      setUser(json.data.user)
      return json.data.user
    }

    const logout = async () => {
      try {
        if (storage.getToken()) {
          await authApi.logout()
        }
      } catch {
        // Token already invalid; still clear locally.
      }
      storage.clearSession()
      setToken(null)
      setUser(null)
    }

    return {
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }
  }, [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
