import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

const titles = [
  '1984',
  'Hayvan Çiftliği',
  'Suç ve Ceza',
  'Sefiller',
  'Simyacı',
  'Satranç',
  'Dönüşüm',
  'Kürk Mantolu Madonna',
]

const steps = [
  {
    n: '01',
    title: 'Koleksiyonu keşfet',
    text: 'Sayfalı katalogda stok, fiyat ve başlıkları gör. Beğendiğini tek tıkla aç.',
  },
  {
    n: '02',
    title: 'Stoğu olanı kirala',
    text: 'Müsait kitaplar kiralanır, stok bir düşer. Tükenenler rafta bekler.',
  },
  {
    n: '03',
    title: 'Bitince iade et',
    text: 'Okuman bittiğinde iade ile kitap başkasına açılır, stok geri gelir.',
  },
]

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const primaryTo = isAuthenticated ? '/books' : '/login'
  const primaryLabel = isAuthenticated ? 'Kataloğa git' : 'Giriş yap, kirala'

  useEffect(() => {
    document.title = 'Book Rent'
  }, [])

  return (
    <div className="home app-shell">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link to="/" className="font-serif text-xl tracking-tight text-cream">
          Book Rent
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <a href="#nasil" className="hidden text-cream/70 hover:text-cream sm:inline">
            Nasıl çalışır
          </a>
          <Link
            to={primaryTo}
            className="rounded-full bg-gold px-4 py-2 font-medium text-ink hover:bg-gold-light"
          >
            {primaryLabel}
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden px-5 pb-24 pt-8 md:pt-16">
        <div className="pointer-events-none absolute inset-0 home-glow" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10">
            <p className="home-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Şehir kütüphanesi, dijital gişe
            </p>
            <h1 className="home-fade-up home-delay-1 mt-4 font-serif text-4xl leading-[1.08] text-cream sm:text-6xl">
              Raftan al,
              <br />
              <span className="italic text-gold">okuyunca bırak.</span>
            </h1>
            <p className="home-fade-up home-delay-2 mt-6 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg">
              Book Rent, kitapları stoklu kiralaman için sade bir vitrin. Giriş yap, kataloğu gez,
              müsait olanı kirala; iade ettiğinde bir sonraki okur için yer açılır.
            </p>
            <div className="home-fade-up home-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                to={primaryTo}
                className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink hover:bg-white"
              >
                {primaryLabel}
              </Link>
              <a
                href="#nasil"
                className="rounded-full border border-cream/25 px-6 py-3 text-sm text-cream/90 hover:border-cream/50"
              >
                Akışı gör
              </a>
            </div>
            <dl className="home-fade-up home-delay-4 mt-12 grid max-w-md grid-cols-3 gap-4 text-cream">
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/45">Koleksiyon</dt>
                <dd className="mt-1 font-serif text-2xl">Canlı stok</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/45">Kiralama</dt>
                <dd className="mt-1 font-serif text-2xl">Anında</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/45">İade</dt>
                <dd className="mt-1 font-serif text-2xl">Tek dokunuş</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-md lg:h-[440px]">
            <div className="book-orbit">
              <article className="float-book book-a">
                <span>1984</span>
                <small>Orwell</small>
              </article>
              <article className="float-book book-b">
                <span>Suç ve Ceza</span>
                <small>Dostoyevski</small>
              </article>
              <article className="float-book book-c">
                <span>Sefiller</span>
                <small>Hugo</small>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...titles, ...titles].map((title, i) => (
            <span key={`${title}-${i}`}>{title}</span>
          ))}
        </div>
      </div>

      <section id="nasil" className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Nasıl çalışır</p>
        <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">Üç adım, bir raf.</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm"
            >
              <p className="font-serif text-3xl text-gold">{step.n}</p>
              <h3 className="mt-4 font-serif text-xl text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{step.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-gold/15 to-transparent p-8 md:flex md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-serif text-3xl text-cream">Bu akşam hangi cilt?</h2>
            <p className="mt-3 max-w-md text-sm text-cream/70">
              Katalog girişten sonra açılır. Stok bitince kiralama durur; iade edince kitap yeniden
              rafta.
            </p>
          </div>
          <Link
            to={primaryTo}
            className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-light md:mt-0"
          >
            {primaryLabel}
          </Link>
        </div>
      </section>

      <footer className="border-t border-cream/10 px-5 py-8 text-center text-xs text-cream/40">
        Book Rent · in-memory demo · kiralama stoğu canlı tutulur
      </footer>
    </div>
  )
}
