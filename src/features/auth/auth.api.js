import { api } from '../../lib/api.js'

export const authApi = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  logout: () => api.post('/auth/logout'),
}
