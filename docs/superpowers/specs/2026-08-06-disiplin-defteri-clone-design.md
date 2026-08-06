# Tasarım: Disiplin Defteri bölümü + site geneli Pages tasarım dili

Tarih: 2026-08-06 · Durum: Onaylandı (sohbet içinde)

## Amaç

1. `disiplin-defteri-codex` reposunun GitHub Pages sitesini
   (https://aalidemirci.github.io/disiplin-defteri-codex/) okulapp.org altına
   `/disiplin-defteri/` bölümü olarak taşımak. Gerekçe: MEB ağında GitHub
   engelli; okulapp.org erişilebilir bir alternatif sunacak.
2. İndirmeleri Google Drive klasöründen (asıl) ve GitHub Releases'tan (yedek)
   vermek.
3. okulapp.org'un tamamını (ana sayfa öncelikli) Pages sitesinin tasarım
   diliyle yeniden üretmek; koyu tema uyarlaması dahil.

## Kararlar (kullanıcı onaylı)

- Klon `/disiplin-defteri/` altında ayrı bölüm; mevcut
  `/projeler/disiplin-defteri-codex/` detay sayfası kalır ve oraya link verir.
- İndirmede **Drive asıl, GitHub yedek**. Drive klasörü:
  `https://drive.google.com/drive/folders/1GfvIJdcflLDiRngf_MpaqRNVDSzM3bjU?usp=sharing`
- Koyu tema kaldırılmaz; Pages paleti koyu varyanta uyarlanır, düğme kalır.
- Uygulama biçimi: birebir dosya kopyası değil, **Astro'ya port** (tek tasarım
  sistemi, sitemap/OG/koyu tema desteği).

## Sayfa yapısı

| URL | İçerik | Layout |
|---|---|---|
| `/disiplin-defteri/` | Pages index portu: hero, 6 özellik kartı, indirme, güncellemeler, iletişim | `DDLayout` |
| `/disiplin-defteri/kilavuz/` | kilavuz.html içeriği birebir (uyarlamalar aşağıda) | `DDLayout` |
| `/disiplin-defteri/gizlilik/` | gizlilik.html içeriği birebir (uyarlamalar aşağıda) | `DDLayout` |

- `DDLayout.astro`: Pages'taki markalı header ("DD" logosu + Özellikler /
  İndir / Kılavuz / Güncellemeler / İletişim menüsü), skip-link, kendi
  footer'ı + "okulapp.org'a dön" linki. `BaseLayout`'un head/SEO yapısını
  yeniden kullanır (title, description, canonical, OG, sitemap).
- İçerik şemasına opsiyonel `siteUrl` alanı eklenir
  (`src/content.config.ts`); proje detay sayfasında dolu ise "Proje
  sitesi →" butonu gösterilir. `disiplin-defteri-codex.md`'ye
  `siteUrl: /disiplin-defteri/` yazılır.

## Tasarım sistemi

`global.css` Pages token'larıyla yeniden yazılır; tüm sayfalar (ana sayfa,
/projeler, /hakkimda, 404, DD bölümü) aynı token'ları kullanır.

Açık tema (Pages ile aynı): `--paper:#f5f2e9`, `--surface:#fffdf7`,
`--ink:#17221f`, `--muted:#5a6864`, `--green:#173c34`, `--green-2:#2a6759`,
`--mint:#d7eee5`, `--amber:#e9b44c`, `--line:#d9ddd4`.

Koyu tema uyarlaması: zemin `#101b18` civarı, yüzeyler koyu yeşil
(`#16241f`), metin açık, `--amber` aynen (koyu zeminde yeterli kontrast),
hero paneli iki temada da koyu yeşil kalır. Mevcut `data-theme` mekanizması
ve FOUC önleyici inline script değişmez.

Tipografi/biçim dili: iri başlıklar (`clamp` + `letter-spacing:-0.04em`
civarı), eyebrow etiketleri, 18-30px yuvarlak köşeler, kart deseni, amber
birincil buton, koyu yeşil hero paneli.

Ana sayfa yeniden üretimi: eyebrow + iri başlıklı koyu yeşil hero, amber
"Projeleri gör" CTA'sı, öne çıkan projeler Pages kart stiliyle. /projeler,
/hakkimda ve 404 aynı dile hafif dokunuşlarla uyarlanır.

## İndirme bölümü

- Veri: `src/data/dd-release.json`, elle düzenlenir; alanlar:
  `available`, `version`, `name`, `published_at`, `prerelease`,
  `driveUrl`, `releaseUrl`, `assets[{kind, url, size}]`.
- Sayfa bu JSON'u **build sırasında** import eder; Pages'taki client-side
  fetch/JS kaldırılır, bölüm tamamen statik üretilir.
- Görünüm:
  - Birincil buton: "Google Drive'dan indir" + "MEB ağından erişilebilir"
    notu. Her zaman görünür.
  - İkincil link: GitHub Releases.
  - `available:true` olduğunda paket kartları (Windows kurulum/taşınabilir,
    Pardus .deb, Linux arşiv, SHA-256) statik render edilir; şimdilik
    `available:false` ve "İlk sürüm hazırlık aşamasında" durumu gösterilir.
  - SHA-256 doğrulama notu korunur.

## İçerik uyarlamaları

Metinler birebir taşınır; yalnız şu uyarlamalar yapılır:

1. KVKK (`gizlilik`): "Site GitHub Pages üzerinde barındırılır" →
   Cloudflare barındırmasına uyarlanır; indirme dosyalarının Google Drive
   klasöründen sunulduğu ve Drive'ın Google altyapısında çalıştığı bilgisi
   eklenir. **Hukuki metin: yayın öncesi kullanıcı okuyup onaylayacak.**
2. Kılavuz + indirme güvenlik notu: "yalnızca resmî GitHub sürümünden" →
   "resmî GitHub sürümü veya resmî Google Drive klasöründen".
3. Kılavuzdaki depo-içi `docs/kurulum.md` linki mevcut haliyle korunur
   (GitHub'a gider; MEB ağında açılmayabilir, bu kabul edilir).
4. CSP meta etiketi taşınmaz (Cloudflare tarafında gerekirse header ile
   yönetilir); `meta name="referrer" content="no-referrer"` DD sayfalarında
   korunur.

## Doğrulama

- `npm run build` temiz geçer; `dist/disiplin-defteri/index.html`,
  `.../kilavuz/index.html`, `.../gizlilik/index.html` üretilir.
- Sitemap yeni sayfaları içerir.
- `npm run preview` ile açık ve koyu temada ekran görüntüsü alınıp
  kullanıcıya gösterilir.
- İç linkler (nav, footer, detay sayfası ↔ DD bölümü) kontrol edilir.

## Kapsam dışı

- GitHub Releases yayını, Drive klasörünün içeriği ve dosya yükleme.
- `dd-release.json`'u otomatik güncelleyen CI/script (JSON elle
  düzenlenecek; ihtiyaç olursa ayrı iş).
- kilavuz/gizlilik içeriklerinin yeniden yazımı.
