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
- **Renk kümeleri:** Tasarım dili her yerde aynıdır; yalnızca renk token'ları
  `html[data-palette]` ile değişir. `BaseLayout`'un `palette` prop'u üç değer
  alır: `site` (varsayılan — okulapp.org kabuğu: mürekkep moru + mercan),
  `dd` (Disiplin Defteri: koyu yeşil + amber), `oz` (Okul Zili: derin lacivert
  + turkuaz). Yeni bir proje bölümü eklerken `global.css` içindeki üç blokta
  (açık tema, `prefers-color-scheme: dark`, `data-theme='dark'`) yeni bir
  `data-palette` değeri tanımlayın.
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

## Disiplin Defteri bölümü

`/disiplin-defteri/` altındaki tanıtım, kılavuz ve gizlilik sayfaları,
projenin GitHub Pages sitesinin Astro'ya taşınmış hâlidir (MEB ağında GitHub
engelli olduğu için erişilebilir kopya). İndirme verisi
`src/data/dd-release.json` dosyasında elle tutulur:

- `driveUrl`: resmî Google Drive klasörü (birincil indirme kaynağı).
- Yeni GitHub sürümü çıktığında `available: true` yapın; `version`, `name`,
  `published_at`, `prerelease` ve `assets` alanlarını doldurun
  (`kind` değerleri: `windows_installer`, `windows_portable`, `linux_deb`,
  `linux_archive`, `checksums`). Paket kartları otomatik görünür.

## Okul Zili bölümü

`/okul-zili/` altındaki tanıtım, kılavuz ve gizlilik sayfaları, projenin
GitHub Pages sitesinin (`okulzili/website/`) Astro'ya taşınmış hâlidir; MEB
ağında GitHub engelli olduğu için erişilebilir kopya buradadır. İndirme verisi
`src/data/oz-release.json` dosyasında elle tutulur; alanlar Disiplin Defteri
ile aynıdır (`driveUrl` opsiyoneldir, tanımlıysa Drive kartı eklenebilir).

Yeni sürüm çıktığında `version`, `name`, `published_at`, `prerelease` ve
`assets` alanlarını güncelleyin. Depodaki `website/` klasörü ile bu bölümün
metinleri ayrı yaşar: sürüm notu veya özellik değiştiğinde iki taraf da elle
güncellenir.

## Yeni proje ekleme

1. `npm run sync` çalıştırın (gereksinim: `gh` CLI, `gh auth login` yapılmış).
   Script, dosyası olmayan her public repo için
   `src/content/projects/<repo-adi>.md` taslağı oluşturur; **mevcut dosyaları
   asla ezmez.**
2. Taslaktaki `TODO`ları doldurun: 2-3 paragraflık Türkçe anlatım yazın
   ("ne işe yarar, kimin için, nasıl çalışır"). README kopyalamayın; gerçek
   kişi verisi (öğrenci adı, numara, e-posta, telefon) siteye taşımayın.
3. Ana sayfada görünmesi için `featured: true`, sıralama için `order` verin.
   Vitrin kartının üst şeridi için `accent` (projenin kendi renginden bir hex
   değeri, tırnak içinde) ve kısa durum etiketi için `badge` verilebilir;
   ikisi de opsiyoneldir.
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
