import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { booksApi } from './books.api.js'
import { rentalsApi } from '../rentals/rentals.api.js'
import { storage } from '../../lib/storage.js'
import { ApiError } from '../../lib/api.js'

export function BooksPage() {
  const [page, setPage] = useState(1)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)
  const [notice, setNotice] = useState('')

  const load = async (nextPage = page) => {
    setError('')
    const json = await booksApi.list(nextPage, 8)
    setResult(json)
  }

  useEffect(() => {
    load(page).catch((err) => {
      setError(err instanceof ApiError ? err.message : 'Liste alınamadı')
    })
  }, [page])

  const activeRentalFor = (bookId) =>
    storage.getRentals().find((r) => r.bookId === bookId && !r.returnedAt)

  const onRent = async (bookId) => {
    setBusyId(bookId)
    setNotice('')
    setError('')
    try {
      const json = await rentalsApi.rent(bookId)
      storage.saveRental(json.data)
      setNotice(`${json.data.id} kimliğiyle kiralandı.`)
      await load(page)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kiralama başarısız')
    } finally {
      setBusyId(null)
    }
  }

  const onReturn = async (rental) => {
    setBusyId(rental.bookId)
    setNotice('')
    setError('')
    try {
      await rentalsApi.returnRental(rental.id)
      storage.markReturned(rental.id)
      setNotice('Kitap iade edildi.')
      await load(page)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'İade başarısız')
    } finally {
      setBusyId(null)
    }
  }

  if (!result && !error) {
    return <p className="text-cream/50">Yükleniyor…</p>
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Katalog</p>
          <h1 className="mt-2 font-serif text-3xl text-cream sm:text-4xl">Kitaplar</h1>
          <p className="mt-1 text-sm text-cream/50">
            {result ? `${result.total} kayıt · sayfa ${result.page}/${result.totalPages}` : null}
          </p>
        </div>
        <Link
          to="/books/new"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light"
        >
          Yeni kitap
        </Link>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="mt-4 rounded-xl border border-gold/25 bg-gold/10 px-3 py-2 text-sm text-gold-light">
          {notice}
        </p>
      ) : null}

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {result?.data.map((book) => {
          const rental = activeRentalFor(book.id)
          return (
            <li
              key={book.id}
              className="flex flex-col rounded-3xl border border-cream/10 bg-cream/[0.04] p-5"
            >
              <Link
                to={`/books/${book.id}`}
                className="font-serif text-xl text-cream hover:text-gold"
              >
                {book.name}
              </Link>
              <p className="mt-1 text-sm text-cream/50">
                {book.price} ₺ · stok {book.stock}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {rental ? (
                  <button
                    type="button"
                    disabled={busyId === book.id}
                    onClick={() => onReturn(rental)}
                    className="rounded-full border border-cream/25 px-3 py-1.5 text-sm text-cream hover:border-cream/50 disabled:opacity-60"
                  >
                    İade et
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={book.stock < 1 || busyId === book.id}
                    onClick={() => onRent(book.id)}
                    className="rounded-full bg-gold px-3 py-1.5 text-sm font-medium text-ink hover:bg-gold-light disabled:opacity-50"
                  >
                    {book.stock < 1 ? 'Stok yok' : 'Kirala'}
                  </button>
                )}
                <Link
                  to={`/books/${book.id}/edit`}
                  className="rounded-full border border-cream/25 px-3 py-1.5 text-sm text-cream/80 hover:border-cream/50"
                >
                  Düzenle
                </Link>
              </div>
            </li>
          )
        })}
      </ul>

      {result && result.totalPages > 1 ? (
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border border-cream/25 px-4 py-1.5 text-sm text-cream disabled:opacity-40"
          >
            Önceki
          </button>
          <button
            type="button"
            disabled={page >= result.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-cream/25 px-4 py-1.5 text-sm text-cream disabled:opacity-40"
          >
            Sonraki
          </button>
        </div>
      ) : null}
    </section>
  )
}
