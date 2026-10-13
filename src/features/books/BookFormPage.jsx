import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { booksApi } from './books.api.js'
import { ApiError } from '../../lib/api.js'

const empty = { name: '', price: '', stock: '' }

export function BookFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    booksApi
      .get(id)
      .then((json) => {
        setForm({
          name: json.data.name,
          price: String(json.data.price),
          stock: String(json.data.stock),
        })
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : 'Kitap yüklenemedi')
      })
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    }
    try {
      if (isEdit) {
        await booksApi.update(id, payload)
        navigate(`/books/${id}`)
      } else {
        const json = await booksApi.create(payload)
        navigate(`/books/${json.data.id}`)
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kaydedilemedi')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-cream/50">Yükleniyor…</p>
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-lg rounded-3xl border border-cream/10 bg-cream/[0.04] p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        {isEdit ? 'Düzenle' : 'Yeni cilt'}
      </p>
      <h1 className="mt-2 font-serif text-3xl text-cream">
        {isEdit ? 'Kitabı düzenle' : 'Yeni kitap'}
      </h1>

      <label className="mt-6 block text-sm text-cream/70">
        Ad
        <input
          className="mt-1 w-full rounded-xl border border-cream/15 bg-ink/40 px-3 py-2 text-cream outline-none focus:border-gold"
          value={form.name}
          onChange={onChange('name')}
          required
        />
      </label>
      <label className="mt-4 block text-sm text-cream/70">
        Fiyat
        <input
          type="number"
          min="0"
          step="1"
          className="mt-1 w-full rounded-xl border border-cream/15 bg-ink/40 px-3 py-2 text-cream outline-none focus:border-gold"
          value={form.price}
          onChange={onChange('price')}
          required
        />
      </label>
      <label className="mt-4 block text-sm text-cream/70">
        Stok
        <input
          type="number"
          min="0"
          step="1"
          className="mt-1 w-full rounded-xl border border-cream/15 bg-ink/40 px-3 py-2 text-cream outline-none focus:border-gold"
          value={form.stock}
          onChange={onChange('stock')}
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
        disabled={saving}
        className="mt-6 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink hover:bg-gold-light disabled:opacity-60"
      >
        {saving ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </form>
  )
}
