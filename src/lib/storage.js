const TOKEN_KEY = 'book-rent-token'
const USER_KEY = 'book-rent-user'
const RENTALS_KEY = 'book-rent-rentals'

export const storage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  getUser() {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  },
  clearSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
  getRentals() {
    const raw = localStorage.getItem(RENTALS_KEY)
    if (!raw) return []
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  },
  saveRental(rental) {
    const list = storage.getRentals()
    list.unshift(rental)
    localStorage.setItem(RENTALS_KEY, JSON.stringify(list))
  },
  markReturned(rentalId) {
    const list = storage.getRentals().map((item) =>
      item.id === rentalId
        ? { ...item, returnedAt: new Date().toISOString() }
        : item,
    )
    localStorage.setItem(RENTALS_KEY, JSON.stringify(list))
  },
}
