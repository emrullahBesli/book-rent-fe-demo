import { api } from '../../lib/api.js'

export const rentalsApi = {
  rent: (bookId) => api.post('/rentals', { bookId }),
  returnRental: (id) => api.post(`/rentals/${id}/return`),
}
