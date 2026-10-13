import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { booksApi } from './books.api.js'
import { rentalsApi } from '../rentals/rentals.api.js'
import { storage } from '../../lib/storage.js'
import { ApiError } from '../../lib/api.js'

export function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    booksApi.get(id).then((json) => setBook(json.data))

  useEffect(() => {
    load().catch((err) => {
      setError(err instanceof ApiError ? err.message : 'Kitap yüklenemedi')
    })
  }, [id])

  const rental = storage.getRentals().find((r) => r.bookId === Number(id) && !r.returnedAt)

  const onDelete = async () => {
    if (!window.confirm('Bu kitabı silmek istiyor musun?')) return
    setBusy(true)
    try {
      await booksApi.remove(id)
      navigate('/books')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Silinemedi')
    } finally {
      setBusy(false)
    }
  }

  const onRent = async () => {
    setBusy(true)
    setError('')
    try {
      const json = await rentalsApi.rent(Number(id))
      storage.saveRental(json.data)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kiralama başarısız')
    } finally {
      setBusy(false)
    }
  }

  const onReturn = async () => {
    setBusy(true)
    setError('')
    try {
      await rentalsApi.returnRental(rental.id)
      storage.markReturned(rental.id)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'İade başarısız')
    } finally {
      setBusy(false)
    }
  }

  if (!book && !error) {
    return <p className="text-cream/50">Yükleniyor…</p>
  }

  if (!book) {
    return <p className="text-red-200">{error}</p>
  }

  return (
    <article className="max-w-lg rounded-3xl border border-cream/10 bg-cream/[0.04] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Cilt</p>
      <h1 className="mt-2 font-serif text-3xl text-cream">{book.name}</h1>
      <p className="mt-2 text-cream/60">
        {book.price} ₺ · stok {book.stock}
      </p>
      {error ? (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-2">
        {rental ? (
          <button
            type="button"
            disabled={busy}
            onClick={onReturn}
            className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream hover:border-cream/50"
          >
            İade et
          </button>
        ) : (
          <button
            type="button"
            disabled={busy || book.stock < 1}
            onClick={onRent}
            className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-light disabled:opacity-50"
          >
            Kirala
          </button>
        )}
        <Link
          to={`/books/${book.id}/edit`}
          className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream/80 hover:border-cream/50"
        >
          Düzenle
        </Link>
        <button
          type="button"
          disabled={busy}
          onClick={onDelete}
          className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:bg-red-950/40"
        >
          Sil
        </button>
      </div>
    </article>
  )
}
