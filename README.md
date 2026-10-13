# Book Rent Web

Kitap kiralama önyüzü (React + Vite + Tailwind) ve Netlify Functions üzerinde çalışan Express API.

Netlify klasik Node sunucusu çalıştırmaz. Statik `dist/` yayına alınır; `/api/v1` istekleri `netlify/functions/api.js` içindeki `serverless-http` sarmalına yönlenir.

Bellek içi veri demo içindir: Function soğuk açılışında kitaplar seed’e döner. JWT yalnızca imza ile doğrulanır; logout istemcide token siler.

## Kurulum

```bash
cd book-rent-web
npm install
cp .env.example .env
npm run dev
```

Tarayıcı: `http://localhost:5173`  
Yerel API: `http://127.0.0.1:3001/api/v1` (Vite `/api` proxy)

Demo giriş: `admin` / `admin123`

## Klasörler

```text
api/                     Express (listen yok; local.js sadece geliştirme)
netlify/functions/api.js serverless-http sarmalı
src/app/                 router
src/components/          layout
src/features/auth|books|rentals
src/lib/                 fetch + localStorage
```

## Netlify

1. Bu repoyu GitHub’a alın ve Netlify’de import edin.
2. Build: `npm run build` · Publish: `dist`
3. Site env: `JWT_SECRET` (zorunlu önerilir), isteğe `JWT_EXPIRES_IN`
4. `netlify.toml` `/api/*` isteklerini Function’a, diğer yolları SPA’ya verir.

Yerelde Function’ları denemek için: `npx netlify-cli dev` (port 8888).

## Kapsam

Login, kitap listesi (sayfalama), detay, ekleme, düzenleme, silme, kiralama ve iade.
