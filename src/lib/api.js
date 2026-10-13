import { storage } from './storage.js'

const BASE = '/api/v1'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  const token = storage.getToken()
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  })

  const json = await res.json().catch(() => ({}))

  if (res.status === 401) {
    storage.clearSession()
    if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
      window.location.assign('/login')
    }
  }

  if (!res.ok || json.success === false) {
    throw new ApiError(json.message || 'İstek başarısız', res.status)
  }

  return json
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
}
