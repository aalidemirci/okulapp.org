# okulapp.org

Astro ile yazılmış, tamamen statik kişisel proje sitesi. Cloudflare Workers
Static Assets üzerinde yayınlanır; deploy'u Cloudflare'in Git entegrasyonu
yapar (main'e push → otomatik derleme ve yayın).

Kurulum, geliştirme ve yeni proje ekleme adımları için `README.md`. Bu dosya,
kolay fark edilmeyen ve yanlış yapıldığında canlı siteyi bozan kuralları
toplar.

## Komutlar

```bash
npm install
npm run dev             # http://localhost:4321
npm run build           # prebuild olarak check-releases --warn-only çalışır
npm run check-releases  # sürüm verileri güncel mi (bayatsa hata verir)
npm run sync            # dosyası olmayan public repolar için taslak üretir
```

Node 20+ gerekir (yerelde 24 kurulu).

## Kardeş depolar

Site içeriği uygulama depolarından beslenir; bu depolar yan yana durur:

```
.claude/apps/okulapp.org/          bu depo
.claude/apps/okulzili/             Okul Zili uygulaması
.claude/apps/disiplin-defteri-codex/  Disiplin Defteri uygulaması
```

Bir projenin özelliği veya kılavuzu değiştiyse kaynağı `../<depo>` içindeki
`SURUM-NOTLARI.md` ve `KULLANIM.md` dosyalarıdır. Site metnini oradan
doğrulamadan güncellemeyin.

## Renk kümeleri (data-palette)

Tasarım dili ve bileşenler tüm sitede ortaktır; yalnızca renk token'ları
`html[data-palette]` ile değişir. `BaseLayout`'un `palette` prop'u:

| Değer | Nerede | Renk |
|---|---|---|
| `site` (varsayılan) | ana sayfa, projeler, hakkımda, 404 | mürekkep moru + mercan |
| `dd` | `/disiplin-defteri/**` | koyu yeşil + amber |
| `oz` | `/okul-zili/**` | derin lacivert + turkuaz |

**Yeni bir renk kümesi eklerken `src/styles/global.css` içinde ÜÇ ayrı yerde
tanımlamalısınız:** açık tema bloğu, `@media (prefers-color-scheme: dark)`
bloğu ve `:root[data-theme='dark']` bloğu. Yalnızca birine eklerseniz sistem
teması koyu olan ziyaretçilerde renkler karışır.

Token'lar semantiktir, renk adı taşımaz: `--deep` (koyu blok zemini),
`--accent` (birincil düğme), `--on-deep-*` (koyu blok üzerindeki metin),
`--panel-*` (koyu blok üzerindeki açık kart). Doğrudan hex yazmayın.

## Proje bölümleri MEB ağı için erişilebilir kopyadır

`/disiplin-defteri/` ve `/okul-zili/` altındaki tanıtım, kılavuz ve gizlilik
sayfaları, uygulamaların GitHub Pages sitelerinin taşınmış hâlidir. Sebep:
MEB ağında GitHub engelli; okuldaki kullanıcı bu sayfalara ancak buradan
erişebiliyor. Okul Zili'nin `website/` klasörü artık yalnızca buraya
yönlendirir, yani **bu sayfalar tek kaynaktır** — içerik eskirse başka bir
yerde güncel kopyası yoktur.

## Sürüm verisi ELLE tutulur

`src/data/oz-release.json` ve `src/data/dd-release.json` indirme kartlarını
üretir. Uygulama deposunda yeni sürüm çıktığında bu dosyalar güncellenmezse
site eski paketi göstermeye devam eder — pratikte en sık yapılan hata budur.

`npm run check-releases` bunu denetler ve eksik alanları ekrana yazar.
`npm run build` öncesinde de `--warn-only` kipinde çalışır: bayatsa uyarır
ama derlemeyi durdurmaz (ağ kapalıyken sessizce geçer).

Sürüm bumplarken `src/content/projects/<proje>.md` içindeki `badge` alanını da
güncelleyin. Yeni sürüm bir özellik getiriyorsa tanıtım kartlarını ve kılavuzu
da elden geçirin; yalnızca hata düzeltmesiyse sürüm verisi yeter.

## wrangler.jsonc: custom domain listesinden silme yapmayın

`routes` alanındaki `okulapp.org` ve `www.okulapp.org` custom domain olarak
tanımlıdır; DNS kayıtlarını Cloudflare deploy sırasında oluşturur. Apex kaydı
bu yüzden var. Listeden bir girdi çıkarmak alan adını Worker'dan koparabilir.
Yeni alan adı eklerken mevcutları koruyup üzerine ekleyin.

`astro.config.mjs` içindeki `site` değeri apex'tir (`https://okulapp.org`);
canonical URL'ler ve sitemap buradan üretilir.

## İçerik kuralları

- Tüm site Türkçedir. Proje anlatımları README kopyası değildir: "bu ne işe
  yarar, kimin için, nasıl çalışır" sorularını teknik olmayan bir okuyucuya
  anlatır.
- **Gerçek kişi verisi siteye girmez:** öğrenci/personel adı, T.C. kimlik
  numarası, e-posta, telefon, okul adı, gerçek zil çizelgesi, ekran görüntüsü.
- Site çerez, reklam ve ziyaretçi analizi kullanmaz. Tarayıcı yerel
  depolamasında yalnızca açık/koyu tema tercihi tutulur; bu güvence gizlilik
  sayfalarında yazılıdır, yeni bir bağımlılık eklemeden önce okuyun.
- Harici kaynak (CDN, font, analytics) eklemeyin; sayfalar kendi kendine
  yeter.

## Değişiklik sonrası doğrulama

1. `npm run build` — hata ve uyarı olmamalı.
2. `dist/` içindeki iç bağlantıları ve `#id` çapalarını tarayın (bir sayfa
   taşındığında sessizce kırılırlar).
3. Renk veya tema değiştiyse üç renk kümesini açık/koyu temada kontrast
   açısından ölçün (hedef: WCAG AA, en az 4.5).
4. Mobil (375px) ve masaüstü (1280px) düzende yatay taşma olmamalı.
