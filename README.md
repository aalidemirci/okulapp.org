# okulapp.org

[okulapp.org](https://okulapp.org) için Astro ile yazılmış, tamamen statik
kişisel proje sitesi. GitHub'daki public projeleri tanıtır; Cloudflare
Workers Static Assets üzerinde yayınlanır.

## Nasıl çalışır?

- Repo metadatası **build sırasında API'den çekilmez.** Her proje,
  `src/content/projects/<repo-adi>.md` dosyasında frontmatter + Türkçe anlatım
  olarak git'te durur ve elle düzenlenebilir.
- Astro content collections (`src/content.config.ts`) frontmatter'ı şemayla
  doğrular: `title`, `description`, `repoUrl`, `language`, `topics`,
  `featured`, `order`.
- Tasarım tek global CSS dosyasındadır (`src/styles/global.css`); Tailwind ve
  ağır JavaScript yoktur. Açık/koyu tema sistem tercihine uyar, sağ üstteki
  düğmeyle elle de değiştirilebilir.
- Worker script'i yoktur: `wrangler.jsonc` yalnızca `assets` tanımlar. İleride
  dinamik rota gerekirse aynı Worker'a `main` + `assets.binding` eklenebilir.

## Lokal çalıştırma

Gereksinim: Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # statik çıktı -> dist/
npm run preview    # build çıktısını lokal sunar
```

## Yeni proje ekleme

1. `npm run sync` çalıştırın (gereksinim: `gh` CLI, `gh auth login` yapılmış).
   Script, dosyası olmayan her public repo için
   `src/content/projects/<repo-adi>.md` taslağı oluşturur; **mevcut dosyaları
   asla ezmez.**
2. Taslaktaki `TODO`ları doldurun: 2-3 paragraflık Türkçe anlatım yazın
   ("ne işe yarar, kimin için, nasıl çalışır"). README kopyalamayın; gerçek
   kişi verisi (öğrenci adı, numara, e-posta, telefon) siteye taşımayın.
3. Ana sayfada görünmesi için `featured: true`, sıralama için `order` verin.
4. `npm run build` ile doğrulayın.

## Deploy

Deploy'u Cloudflare kendisi yapar (Git entegrasyonu): push sonrası
`astro build` çalışır ve `wrangler.jsonc`'deki `assets.directory` (`./dist`)
Workers Static Assets olarak yayınlanır. Lokalden `wrangler deploy`
çalıştırmaya gerek yoktur.

- Build komutu: `npm run build`
- Çıktı: `dist/`
- 404: `dist/404.html` (`not_found_handling: "404-page"`)
- Bu repoda hiçbir token veya gizli anahtar bulunmaz.
