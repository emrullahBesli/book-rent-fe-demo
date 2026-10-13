import { api } from '../../lib/api.js'

export const booksApi = {
  list: (page = 1, limit = 8) => api.get(`/books?page=${page}&limit=${limit}`),
  get: (id) => api.get(`/books/${id}`),
  create: (payload) => api.post('/books', payload),
  update: (id, payload) => api.put(`/books/${id}`, payload),
  remove: (id) => api.del(`/books/${id}`),
}
