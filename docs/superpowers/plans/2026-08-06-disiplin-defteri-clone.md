# Disiplin Defteri Bölümü + Pages Tasarım Dili — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** disiplin-defteri GitHub Pages sitesini `/disiplin-defteri/` bölümü olarak okulapp.org'a taşımak (Drive-asıl indirme ile) ve tüm siteyi aynı tasarım diliyle yeniden üretmek.

**Architecture:** Tek global CSS'e Pages tasarım token'ları (krem/yeşil/amber + koyu varyant) taşınır. `BaseLayout` named slot'larla header/footer değiştirilebilir hâle gelir; `DDLayout` bunun üstüne DD markalı kabuk kurar. İndirme verisi `src/data/dd-release.json`'dan build sırasında okunur, client JS eklenmez.

**Tech Stack:** Astro 5 (statik), @astrojs/sitemap, saf CSS. Test altyapısı yok; her görevin doğrulaması `npm run build` + `dist/` çıktısında grep kontrolüdür.

## Global Constraints

- Node 20 ortamı: `astro@^5.18` kalır, Astro 6'ya YÜKSELTME (Node ≥22.12 ister).
- SSR/adapter yok; `output: 'static'` değişmez. `wrangler deploy` ÇALIŞTIRILMAZ.
- Tailwind ve ağır JS yasak; tek JS, mevcut tema script'leridir.
- Repoya token/gizli anahtar girmez. Site dili Türkçe.
- Drive klasörü (birincil indirme): `https://drive.google.com/drive/folders/1GfvIJdcflLDiRngf_MpaqRNVDSzM3bjU?usp=sharing`
- GitHub Releases (yedek): `https://github.com/aalidemirci/disiplin-defteri-codex/releases`
- Her commit mesajı şu satırla biter: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- Çalışma dizini: `/home/sal/projects/okulapp.org`

---

### Task 1: Global CSS — Pages tasarım token'ları ve bileşen stilleri

**Files:**
- Modify: `src/styles/global.css` (tamamen yeniden yazılır)

**Interfaces:**
- Produces: Sonraki görevlerin kullanacağı sınıflar: `.skip-link`, `.site-header`, `.brand`, `.brand-mark`, `.theme-toggle`, `.hero`, `.hero-copy`, `.hero-actions`, `.hero-panel`, `.eyebrow`, `.lead`, `.privacy-promise`, `.status-line`, `.metric`, `.button`, `.button-primary`, `.button-secondary`, `.button-outline`, `.section`, `.section-heading`, `.two-column-heading`, `.release-summary`, `.feature-grid`, `.card`, `.card-number`, `.project-card`, `.project-meta`, `.tag`, `.section-cta`, `.download-section`, `.drive-card`, `.download-grid`, `.download-card`, `.download-meta`, `.security-note`, `.github-fallback`, `.updates`, `.update-layout`, `.release-title`, `.muted`, `.text-link`, `.contact`, `.warning-card`, `.info-box`, `.document-layout`, `.single-document`, `.document-nav`, `.document`, `.guide-table`, `.document-source`, `.legal-note`, `.page`, `.project-header`, `.project-actions`, `.site-footer`, `.footer-links`

- [ ] **Step 1: `src/styles/global.css` dosyasını aşağıdaki içerikle tamamen değiştir**

```css
/* okulapp.org — tek global stil dosyası.
   Tasarım dili disiplin-defteri GitHub Pages sitesinden port edildi:
   krem zemin, koyu yeşil paneller, amber vurgular, iri sıkı başlıklar.
   Tema: html[data-theme] head'deki inline script ile ayarlanır; JS kapalıysa
   prefers-color-scheme'deki koyu değerler devreye girer. */

:root {
  --paper: #f5f2e9;
  --surface: #fffdf7;
  --ink: #17221f;
  --muted: #5a6864;
  --doc-text: #35433f;
  --green: #173c34;
  --green-2: #2a6759;
  --link: #2a6759;
  --mint: #d7eee5;
  --amber: #e9b44c;
  --line: #d9ddd4;
  --tint: #e8eee7;
  --warn-bg: #fff7df;
  --code-bg: #e8ebe5;
  --shadow: 0 22px 60px rgba(23, 60, 52, 0.12);
  --radius: 18px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #101b18;
    --surface: #16241f;
    --ink: #e8f0ec;
    --muted: #9db3ab;
    --doc-text: #c7d4ce;
    --link: #7fc7ad;
    --mint: #1f3d34;
    --line: #2a3833;
    --tint: #15211d;
    --warn-bg: #2e2913;
    --code-bg: #22332d;
    --shadow: 0 22px 60px rgba(0, 0, 0, 0.35);
  }
}

html[data-theme='light'] {
  --paper: #f5f2e9;
  --surface: #fffdf7;
  --ink: #17221f;
  --muted: #5a6864;
  --doc-text: #35433f;
  --link: #2a6759;
  --mint: #d7eee5;
  --line: #d9ddd4;
  --tint: #e8eee7;
  --warn-bg: #fff7df;
  --code-bg: #e8ebe5;
  --shadow: 0 22px 60px rgba(23, 60, 52, 0.12);
}

html[data-theme='dark'] {
  --paper: #101b18;
  --surface: #16241f;
  --ink: #e8f0ec;
  --muted: #9db3ab;
  --doc-text: #c7d4ce;
  --link: #7fc7ad;
  --mint: #1f3d34;
  --line: #2a3833;
  --tint: #15211d;
  --warn-bg: #2e2913;
  --code-bg: #22332d;
  --shadow: 0 22px 60px rgba(0, 0, 0, 0.35);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  color-scheme: light dark;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.6;
  background: var(--paper);
  color: var(--ink);
}

a {
  color: var(--link);
  text-underline-offset: 3px;
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--amber);
  outline-offset: 3px;
}

img {
  max-width: 100%;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: -5rem;
  z-index: 20;
  background: var(--surface);
  color: var(--ink);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.skip-link:focus {
  top: 1rem;
}

/* Üst çubuk */
.site-header {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--ink);
  font-weight: 800;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--green);
  color: #fff;
  font-size: 0.83rem;
  letter-spacing: 0.05em;
}

.site-header nav {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  flex-wrap: wrap;
}

.site-header nav a {
  color: var(--ink);
  font-size: 0.94rem;
  font-weight: 650;
  text-decoration: none;
}

.site-header nav a:hover {
  color: var(--link);
}

.theme-toggle {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  border-radius: 50%;
  width: 2.1rem;
  height: 2.1rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

/* Hero */
.hero {
  width: min(1180px, calc(100% - 2rem));
  margin: 1rem auto 0;
  padding: clamp(2.5rem, 6vw, 6rem);
  border-radius: 30px;
  background: var(--green);
  color: #fff;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: center;
  overflow: hidden;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  width: 360px;
  height: 360px;
  border: 70px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  right: -150px;
  top: -180px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
  font-weight: 850;
  color: var(--link);
  margin: 0 0 1rem;
}

.hero .eyebrow {
  color: #b9ddcf;
}

.hero h1 {
  font-size: clamp(2.4rem, 5vw, 4.25rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  margin: 0;
}

.lead {
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  color: #e1eee9;
  max-width: 720px;
  margin: 1.5rem 0;
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.65rem 1.15rem;
  border-radius: 12px;
  font-weight: 800;
  text-decoration: none;
}

.button-primary {
  background: var(--amber);
  color: #2d220c;
}

.button-primary:hover {
  background: #f1c66d;
}

.button-secondary {
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.button-outline {
  border: 1px solid var(--link);
  color: var(--link);
  background: transparent;
}

.privacy-promise {
  color: #c6ddd4;
  font-size: 0.9rem;
  margin: 1rem 0 0;
}

/* Hero yan paneli iki temada da açık kalır (koyu yeşil hero üzerinde kart) */
.hero-panel {
  background: #fffdf7;
  color: #17221f;
  border-radius: 22px;
  padding: 1.4rem;
  box-shadow: var(--shadow);
  position: relative;
  z-index: 1;
}

.status-line {
  font-weight: 750;
  border-bottom: 1px solid #d9ddd4;
  padding-bottom: 1rem;
}

.status-line span {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #31a56f;
  margin-right: 0.4rem;
}

.metric {
  padding: 1.15rem 0;
  border-bottom: 1px solid #d9ddd4;
  display: flex;
  flex-direction: column;
}

.metric:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.metric strong {
  font-size: 1.45rem;
}

.metric span {
  color: #5a6864;
  font-size: 0.9rem;
}

/* Bölümler */
.section {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: clamp(3.5rem, 7vw, 6rem) 0;
  scroll-margin-top: 1rem;
}

.section-heading {
  max-width: 730px;
  margin-bottom: 2.4rem;
}

.section-heading h1,
.section-heading h2 {
  font-size: clamp(1.9rem, 4vw, 3.1rem);
  letter-spacing: -0.035em;
  line-height: 1.08;
  margin: 0;
}

.two-column-heading {
  max-width: none;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: end;
}

.release-summary {
  color: var(--muted);
  max-width: 320px;
  margin: 0;
}

/* Kartlar */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.4rem;
}

.feature-grid .card {
  min-height: 220px;
}

.card-number {
  font-size: 0.8rem;
  color: var(--link);
  font-weight: 850;
}

.card h3 {
  font-size: 1.2rem;
  margin: 2rem 0 0.5rem;
}

.card p {
  color: var(--muted);
  margin: 0;
}

.project-card h3 {
  margin: 0 0 0.4rem;
}

.project-card h3 a {
  text-decoration: none;
}

.project-card p {
  margin: 0 0 0.8rem;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.tag {
  background: var(--mint);
  color: var(--link);
  border-radius: 999px;
  padding: 0.1rem 0.65rem;
  font-weight: 650;
}

.section-cta {
  margin-top: 1.6rem;
}

/* İndirme bölümü */
.download-section {
  width: min(1180px, calc(100% - 2rem));
  background: var(--tint);
  padding: clamp(2rem, 5vw, 4.5rem);
  border-radius: 30px;
}

.drive-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.drive-card h3 {
  margin: 0 0 0.4rem;
}

.drive-card p {
  color: var(--muted);
  margin: 0;
  max-width: 46rem;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.download-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 17px;
  padding: 1.3rem;
}

.download-card h3 {
  margin: 0.2rem 0;
}

.download-meta {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0.2rem 0 1rem;
}

.download-card .button {
  width: 100%;
  background: var(--green);
  color: #fff;
}

.security-note {
  margin-top: 1rem;
  background: var(--green);
  color: #e8f3ee;
  padding: 1.25rem;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 0.3fr 1fr auto;
  align-items: center;
  gap: 1rem;
}

.security-note p {
  margin: 0;
}

.security-note a {
  color: #fff;
}

.github-fallback {
  color: var(--muted);
  margin: 1.25rem 0 0;
}

/* Güncellemeler / iletişim */
.updates {
  border-bottom: 1px solid var(--line);
}

.update-layout {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 3rem;
}

.release-title {
  font-size: 1.5rem;
  font-weight: 850;
  margin: 0;
}

.muted {
  color: var(--muted);
}

.text-link {
  font-weight: 800;
}

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.contact h2 {
  font-size: clamp(1.9rem, 4vw, 3.1rem);
  letter-spacing: -0.035em;
  line-height: 1.08;
  margin: 0;
}

.contact .button {
  margin-top: 1rem;
}

.warning-card,
.info-box {
  border-left: 5px solid var(--amber);
  background: var(--warn-bg);
  padding: 1.25rem;
  border-radius: 0 14px 14px 0;
}

.warning-card p,
.info-box p {
  margin: 0.35rem 0;
}

/* Belge sayfaları (kılavuz, gizlilik, markdown içerik) */
.document-layout {
  width: min(1100px, calc(100% - 2rem));
  margin: 3rem auto 7rem;
  display: grid;
  grid-template-columns: 230px minmax(0, 760px);
  gap: 4rem;
  justify-content: center;
}

.single-document {
  display: block;
}

.single-document .document {
  max-width: 790px;
  margin: auto;
}

.document-nav {
  position: sticky;
  top: 2rem;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border-left: 1px solid var(--line);
  padding-left: 1rem;
}

.document-nav a {
  text-decoration: none;
}

.document h1 {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 2rem;
}

.document h2 {
  font-size: 1.75rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 3.5rem 0 1rem;
  scroll-margin-top: 2rem;
}

.document h3 {
  margin: 2rem 0 0.5rem;
}

.document p,
.document li {
  color: var(--doc-text);
}

.document li + li {
  margin-top: 0.5rem;
}

code {
  background: var(--code-bg);
  padding: 0.12rem 0.35rem;
  border-radius: 4px;
  font-family: ui-monospace, 'Cascadia Code', Menlo, monospace;
  font-size: 0.9em;
}

pre {
  overflow: auto;
  background: var(--green);
  color: #fff;
  padding: 1rem;
  border-radius: 12px;
}

pre code {
  background: transparent;
  padding: 0;
}

.document .warning-card {
  margin: 2rem 0;
}

.guide-table {
  border: 1px solid var(--line);
  border-radius: 15px;
  overflow: hidden;
}

.guide-table > div {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.guide-table > div:last-child {
  border-bottom: 0;
}

.document-source,
.legal-note {
  border-top: 1px solid var(--line);
  padding-top: 1.5rem;
  margin-top: 3rem;
  font-size: 0.92rem;
}

.legal-note {
  background: var(--tint);
  border: 0;
  padding: 1rem;
  border-radius: 10px;
}

/* Dar içerik sayfaları (hakkımda, 404, proje detayı) */
.page {
  width: min(790px, calc(100% - 2rem));
  margin: 2.5rem auto 5rem;
}

.page h1 {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 1.5rem;
}

.project-header .lead {
  color: var(--muted);
  max-width: none;
  margin: 1rem 0;
  font-size: 1.15rem;
}

.project-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin: 1.25rem 0 2rem;
}

/* Alt bilgi */
.site-footer {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2.5rem 0 3.5rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  border-top: 1px solid var(--line);
}

.site-footer p {
  color: var(--muted);
  margin: 0.3rem 0;
}

.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.footer-links a {
  color: var(--ink);
}

@media (max-width: 800px) {
  .site-header {
    align-items: flex-start;
    padding: 1rem 0;
    flex-direction: column;
    gap: 1rem;
  }

  .site-header nav {
    gap: 0.6rem 1rem;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr 1fr;
  }

  .two-column-heading,
  .security-note {
    display: block;
  }

  .security-note > * {
    display: block;
    margin: 0.5rem 0;
  }

  .update-layout,
  .contact {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .document-layout {
    display: block;
    margin-top: 2rem;
  }

  .document-nav {
    position: static;
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .feature-grid,
  .download-grid {
    grid-template-columns: 1fr;
  }

  .feature-grid .card {
    min-height: auto;
  }

  .guide-table > div {
    grid-template-columns: 1fr;
  }

  .document-nav {
    grid-template-columns: 1fr;
  }

  .site-footer {
    flex-direction: column;
  }

  .hero h1 {
    font-size: 2.45rem;
  }
}
```

- [ ] **Step 2: Build'in geçtiğini doğrula**

Run: `npm run build 2>&1 | tail -5`
Expected: "Complete!" satırı; hata yok. (Sayfalar hâlâ eski sınıfları kullanıyor; görünüm Task 3'e kadar bozuk kalabilir, bu beklenen bir ara durumdur.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "Tasarım: Pages token'ları ve bileşen stilleri global.css'e taşındı

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: BaseLayout slot refactor'u + ProjectCard yeni kart stili

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (tamamen yeniden yazılır)
- Modify: `src/components/ProjectCard.astro` (tamamen yeniden yazılır)

**Interfaces:**
- Consumes: Task 1'deki sınıflar.
- Produces: `BaseLayout` props: `{ title: string; description: string; ogType?: string; noReferrer?: boolean }`; named slot'lar: `header`, `footer` (varsayılan içerik okulapp kabuğu). Tema düğmesi artık `id` değil `class="theme-toggle"` kullanır; script `querySelectorAll` ile hepsini bağlar. `ProjectCard` props: `{ project: CollectionEntry<'projects'> }`, `<li class="card project-card">` üretir.

- [ ] **Step 1: `src/layouts/BaseLayout.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  /** Open Graph içerik türü; makale benzeri sayfalarda "article" verilebilir. */
  ogType?: string;
  /** Disiplin Defteri sayfaları Pages'taki no-referrer politikasını korur. */
  noReferrer?: boolean;
}

const { title, description, ogType = 'website', noReferrer = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---

<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {noReferrer && <meta name="referrer" content="no-referrer" />}
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="sitemap" href="/sitemap-index.xml" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content="okulapp.org" />
    <meta property="og:locale" content="tr_TR" />
    <meta name="twitter:card" content="summary" />

    <script is:inline>
      // Tema tercihi: localStorage > sistem tercihi. FOUC olmasın diye
      // head içinde, render'dan önce çalışır.
      (() => {
        const saved = localStorage.getItem('theme');
        const system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = saved ?? system;
      })();
    </script>
  </head>
  <body>
    <a class="skip-link" href="#icerik">İçeriğe geç</a>

    <slot name="header">
      <header class="site-header">
        <a class="brand" href="/" aria-label="okulapp.org ana sayfa">
          <span class="brand-mark" aria-hidden="true">oa</span>
          <span>okulapp.org</span>
        </a>
        <nav aria-label="Ana gezinme">
          <a href="/projeler/">Projeler</a>
          <a href="/hakkimda/">Hakkımda</a>
          <button class="theme-toggle" type="button" aria-label="Açık/koyu tema değiştir">◐</button>
        </nav>
      </header>
    </slot>

    <main id="icerik">
      <slot />
    </main>

    <slot name="footer">
      <footer class="site-footer">
        <div>
          <strong>okulapp.org</strong>
          <p>© {new Date().getFullYear()} Ahmet Ali Demirci</p>
        </div>
        <div class="footer-links">
          <a href="/projeler/">Projeler</a>
          <a href="/hakkimda/">Hakkımda</a>
          <a href="https://github.com/aalidemirci" rel="me">GitHub</a>
        </div>
      </footer>
    </slot>

    <script is:inline>
      document.querySelectorAll('.theme-toggle').forEach((button) => {
        button.addEventListener('click', () => {
          const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = next;
          localStorage.setItem('theme', next);
        });
      });
    </script>
  </body>
</html>
```

- [ ] **Step 2: `src/components/ProjectCard.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { title, description, language, topics } = project.data;
---

<li class="card project-card">
  <h3><a href={`/projeler/${project.id}/`}>{title}</a></h3>
  <p>{description}</p>
  <div class="project-meta">
    {language && <span class="tag">{language}</span>}
    {topics.map((topic) => <span class="tag">{topic}</span>)}
  </div>
</li>
```

- [ ] **Step 3: Build'in geçtiğini doğrula**

Run: `npm run build 2>&1 | tail -5`
Expected: "Complete!"; hata yok.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/ProjectCard.astro
git commit -m "BaseLayout: header/footer slot'ları, no-referrer desteği; kart stili

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: okulapp sayfalarının yeni tasarımla yeniden üretimi

**Files:**
- Modify: `src/pages/index.astro` (tamamen yeniden yazılır)
- Modify: `src/pages/projeler/index.astro` (tamamen yeniden yazılır)
- Modify: `src/pages/hakkimda.astro` (tamamen yeniden yazılır)
- Modify: `src/pages/404.astro` (tamamen yeniden yazılır)

**Interfaces:**
- Consumes: Task 1 sınıfları, Task 2 `BaseLayout`/`ProjectCard`.

- [ ] **Step 1: `src/pages/index.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';

const projects = await getCollection('projects');
const featured = projects
  .filter((project) => project.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout
  title="okulapp.org — Ahmet Ali Demirci'nin projeleri"
  description="Eğitim kurumları için geliştirdiğim açık kaynak yazılımlar: okul yönetimi, disiplin süreçleri ve daha fazlası."
>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Açık kaynak · Eğitim odaklı</p>
      <h1>Okulların işini kolaylaştıran yazılımlar.</h1>
      <p class="lead">
        Ben Ahmet Ali Demirci. Eğitim kurumlarının günlük işlerini
        kolaylaştırmayı amaçlayan yazılım projeleri geliştiriyorum. Teknik
        olmayan okuyucular için her projenin sayfasında "bu ne işe yarar,
        kimin için" sorularının yanıtı var; geliştiriciler için depo
        bağlantısı ve mimari özet bulunuyor.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="/projeler/">Projeleri gör</a>
        <a class="button button-secondary" href="/hakkimda/">Hakkımda</a>
      </div>
      <p class="privacy-promise">
        Bu site çerez, reklam ve ziyaretçi analizi kullanmaz.
      </p>
    </div>
    <aside class="hero-panel" aria-label="Site özeti">
      <div class="status-line"><span></span> GitHub'da açık kaynak</div>
      <div class="metric"><strong>{projects.length}</strong><span>public proje</span></div>
      <div class="metric"><strong>Türkçe</strong><span>anlatım ve dokümantasyon</span></div>
      <div class="metric"><strong>Windows + Pardus</strong><span>hedef platformlar</span></div>
    </aside>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Projeler</p>
      <h2>Öne çıkan projeler</h2>
    </div>
    <ul class="feature-grid">
      {featured.map((project) => <ProjectCard project={project} />)}
    </ul>
    <p class="section-cta">
      <a class="text-link" href="/projeler/">Tüm projeleri gör →</a>
    </p>
  </section>
</BaseLayout>
```

- [ ] **Step 2: `src/pages/projeler/index.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';

const projects = (await getCollection('projects')).sort(
  (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'tr'),
);
---

<BaseLayout
  title="Projeler — okulapp.org"
  description="Ahmet Ali Demirci'nin GitHub'daki tüm public projeleri: açıklamalar, kullanılan diller ve depo bağlantıları."
>
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Projeler</p>
      <h1>Tüm projeler</h1>
    </div>
    <ul class="feature-grid">
      {projects.map((project) => <ProjectCard project={project} />)}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 3: `src/pages/hakkimda.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Hakkımda — okulapp.org"
  description="Ahmet Ali Demirci hakkında: kim olduğum, ne üzerine çalıştığım ve bana nasıl ulaşabileceğiniz."
>
  <div class="page document">
    <p class="eyebrow">Hakkımda</p>
    <h1>Hakkımda</h1>

    {/* TODO: Bu sayfanın içeriğini site sahibi yazacak. Aşağıdaki bölümler
        iskelet olarak bırakıldı; doldurup fazlalıkları silebilirsiniz. */}

    <p><em>Bu sayfa henüz hazırlanıyor.</em></p>

    <h2>Kim?</h2>
    <p><!-- TODO: Kısa tanıtım --></p>

    <h2>Ne üzerine çalışıyorum?</h2>
    <p><!-- TODO: İlgi alanları, projelerin ortak teması --></p>

    <h2>İletişim</h2>
    <p>
      GitHub: <a href="https://github.com/aalidemirci" rel="me">@aalidemirci</a>
      <!-- TODO: Eklemek istediğiniz diğer iletişim kanalları -->
    </p>
  </div>
</BaseLayout>
```

- [ ] **Step 4: `src/pages/404.astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Sayfa bulunamadı — okulapp.org"
  description="Aradığınız sayfa bulunamadı. Ana sayfaya veya proje listesine dönebilirsiniz."
>
  <div class="page">
    <p class="eyebrow">404</p>
    <h1>Sayfa bulunamadı</h1>
    <p>Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
    <div class="project-actions">
      <a class="button button-primary" href="/">Ana sayfaya dön</a>
      <a class="button button-outline" href="/projeler/">Projelere göz at</a>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Build + çıktı kontrolü**

Run: `npm run build 2>&1 | tail -5 && grep -c 'class="hero"' dist/index.html`
Expected: build "Complete!"; grep çıktısı `1`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/pages/projeler/index.astro src/pages/hakkimda.astro src/pages/404.astro
git commit -m "Ana sayfa ve içerik sayfaları Pages tasarım diliyle yeniden üretildi

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: İçerik şemasına siteUrl + proje detay sayfası yenileme

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/pages/projeler/[slug].astro` (tamamen yeniden yazılır)
- Modify: `src/content/projects/disiplin-defteri-codex.md` (yalnız frontmatter'a bir satır)

**Interfaces:**
- Consumes: Task 1 sınıfları, Task 2 `BaseLayout`.
- Produces: Şemada `siteUrl: z.string().optional()`; `/disiplin-defteri/` değeri Task 6'daki sayfaya işaret eder.

- [ ] **Step 1: `src/content.config.ts` içinde şemaya `siteUrl` ekle**

`order: z.number().default(99),` satırından sonra (schema objesi içine) şu satırı ekle:

```ts
    /** Projenin okulapp.org içindeki veya harici tanıtım sitesi (opsiyonel). */
    siteUrl: z.string().optional(),
```

- [ ] **Step 2: `src/pages/projeler/[slug].astro` dosyasını aşağıdaki içerikle değiştir**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { title, description, repoUrl, language, topics, siteUrl } = project.data;
const { Content } = await render(project);
---

<BaseLayout title={`${title} — okulapp.org`} description={description} ogType="article">
  <article class="page">
    <header class="project-header">
      <p class="eyebrow">Proje</p>
      <h1>{title}</h1>
      <p class="lead">{description}</p>
      <div class="project-meta">
        {language && <span class="tag">{language}</span>}
        {topics.map((topic) => <span class="tag">{topic}</span>)}
      </div>
      <div class="project-actions">
        {siteUrl && <a class="button button-primary" href={siteUrl}>Proje sitesi →</a>}
        <a class="button button-outline" href={repoUrl}>Kaynak kodu GitHub'da</a>
      </div>
    </header>
    <div class="document">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: `src/content/projects/disiplin-defteri-codex.md` frontmatter'ına satır ekle**

`order: 1` satırından sonra:

```yaml
siteUrl: /disiplin-defteri/
```

- [ ] **Step 4: Build + çıktı kontrolü**

Run: `npm run build 2>&1 | tail -3 && grep -c 'Proje sitesi' dist/projeler/disiplin-defteri-codex/index.html`
Expected: build "Complete!"; grep çıktısı `1`.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/pages/projeler/[slug].astro src/content/projects/disiplin-defteri-codex.md
git commit -m "Proje şemasına siteUrl alanı; detay sayfası yeni tasarımla

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: dd-release.json + DDLayout

**Files:**
- Create: `src/data/dd-release.json`
- Create: `src/layouts/DDLayout.astro`

**Interfaces:**
- Consumes: Task 2 `BaseLayout` (named slot'lar, `noReferrer`).
- Produces: `DDLayout` props: `{ title: string; description: string }`. `dd-release.json` alanları: `available: boolean`, `version: string`, `name: string`, `published_at: string`, `prerelease: boolean`, `driveUrl: string`, `releaseUrl: string`, `assets: {kind: string; url: string; size?: number}[]`.

- [ ] **Step 1: `src/data/dd-release.json` dosyasını oluştur**

```json
{
  "available": false,
  "version": "",
  "name": "",
  "published_at": "",
  "prerelease": true,
  "driveUrl": "https://drive.google.com/drive/folders/1GfvIJdcflLDiRngf_MpaqRNVDSzM3bjU?usp=sharing",
  "releaseUrl": "https://github.com/aalidemirci/disiplin-defteri-codex/releases",
  "assets": []
}
```

- [ ] **Step 2: `src/layouts/DDLayout.astro` dosyasını oluştur**

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description} noReferrer>
  <Fragment slot="header">
    <header class="site-header">
      <a class="brand" href="/disiplin-defteri/" aria-label="Disiplin Defteri ana sayfa">
        <span class="brand-mark" aria-hidden="true">DD</span>
        <span>Disiplin Defteri</span>
      </a>
      <nav aria-label="Disiplin Defteri menüsü">
        <a href="/disiplin-defteri/#ozellikler">Özellikler</a>
        <a href="/disiplin-defteri/#indir">İndir</a>
        <a href="/disiplin-defteri/kilavuz/">Kılavuz</a>
        <a href="/disiplin-defteri/gizlilik/">Gizlilik</a>
        <button class="theme-toggle" type="button" aria-label="Açık/koyu tema değiştir">◐</button>
      </nav>
    </header>
  </Fragment>

  <slot />

  <Fragment slot="footer">
    <footer class="site-footer">
      <div>
        <strong>Disiplin Defteri</strong>
        <p>Ticari olmayan kullanım için ücretsiz masaüstü uygulaması.</p>
      </div>
      <div class="footer-links">
        <a href="/disiplin-defteri/kilavuz/">Kılavuz</a>
        <a href="/disiplin-defteri/gizlilik/">Gizlilik ve KVKK</a>
        <a href="https://github.com/aalidemirci/disiplin-defteri-codex/blob/main/LICENSE" rel="noopener">Lisans</a>
        <a href="https://github.com/aalidemirci/disiplin-defteri-codex" rel="noopener">GitHub</a>
        <a href="/">okulapp.org'a dön</a>
      </div>
    </footer>
  </Fragment>
</BaseLayout>
```

- [ ] **Step 3: Build'in geçtiğini doğrula**

Run: `npm run build 2>&1 | tail -3`
Expected: "Complete!" (yeni dosyalar henüz hiçbir sayfada kullanılmıyor; bu ara durum normaldir).

- [ ] **Step 4: Commit**

```bash
git add src/data/dd-release.json src/layouts/DDLayout.astro
git commit -m "Disiplin Defteri: sürüm verisi JSON'u ve DD layout kabuğu

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: /disiplin-defteri/ ana sayfası

**Files:**
- Create: `src/pages/disiplin-defteri/index.astro`

**Interfaces:**
- Consumes: Task 5 `DDLayout` ve `dd-release.json`, Task 1 sınıfları.

- [ ] **Step 1: `src/pages/disiplin-defteri/index.astro` dosyasını oluştur**

```astro
---
import DDLayout from '../../layouts/DDLayout.astro';
import release from '../../data/dd-release.json';

const packageLabels: Record<string, [string, string]> = {
  windows_installer: ['Windows kurulum', 'Önerilen · Yönetici parolası gerekmez'],
  windows_portable: ['Windows taşınabilir', "Kurulum yapmadan veya USB'den kullanım"],
  linux_deb: ['Pardus / Debian', '.deb paketi · Yönetici parolası gerekir'],
  linux_archive: ['Pardus / Linux taşınabilir', 'Yönetici parolası olmadan kurulum'],
  checksums: ['SHA-256 özetleri', 'İndirilen dosyaları doğrulamak için'],
};

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index > 1 ? 1 : 0)} ${units[index]}`;
}

const releaseAssets = release.assets as { kind: string; url: string; size?: number }[];
const assets = release.available ? releaseAssets.filter((asset) => packageLabels[asset.kind]) : [];
const releaseDate =
  release.available && release.published_at
    ? new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long' }).format(new Date(release.published_at))
    : '';
---

<DDLayout
  title="Disiplin Defteri — Okullar için güvenli ve çevrimdışı"
  description="Disiplin Defteri; ortaöğretim kurumlarının disiplin, onur ve ödül süreçlerini çevrimdışı yöneten ücretsiz masaüstü uygulamasıdır."
>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Okul bilgisayarında çalışır · Veri buluta gitmez</p>
      <h1>Disiplin süreçleri düzenli, süreler görünür, veriler okulda kalır.</h1>
      <p class="lead">
        Ortaöğretim kurumları için disiplin, onur ve ödül süreçlerini tek yerde yöneten;
        resmî evrakları hazırlayan, çevrimdışı masaüstü uygulaması.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="#indir">Uygulamayı indir</a>
        <a class="button button-secondary" href="/disiplin-defteri/kilavuz/">Kullanım kılavuzu</a>
      </div>
      <p class="privacy-promise">
        Öğrenci ve personel kayıtları cihazınızdan çıkmaz. Site; çerez, reklam ve ziyaretçi
        analizi kullanmaz.
      </p>
    </div>
    <aside class="hero-panel" aria-label="Program özeti">
      <div class="status-line"><span></span> Çevrimdışı çalışma</div>
      <div class="metric"><strong>25</strong><span>resmî evrak şablonu</span></div>
      <div class="metric"><strong>157–206</strong><span>yönetmelik maddelerine dayalı süreçler</span></div>
      <div class="metric"><strong>Windows + Pardus</strong><span>kurulum seçenekleri</span></div>
    </aside>
  </section>

  <section class="section" id="ozellikler">
    <div class="section-heading">
      <p class="eyebrow">Neler sunuyor?</p>
      <h2>Kurul işlerini baştan sona takip edin</h2>
    </div>
    <div class="feature-grid">
      <article class="card"><span class="card-number">01</span><h3>Süreç takibi</h3><p>Dilekçe ve ihbardan kurul kararına, itirazdan kapanışa kadar tüm adımlar tek akışta.</p></article>
      <article class="card"><span class="card-number">02</span><h3>Yasal süreler</h3><p>İş günü temelli tebliğ, itiraz, kurul kararı ve tedbir süreleri otomatik hesaplanır.</p></article>
      <article class="card"><span class="card-number">03</span><h3>Hazır evraklar</h3><p>Disiplin belgeleri, dizi pusulası, karar defteri ve onur/ödül belgeleri PDF olarak hazırlanır.</p></article>
      <article class="card"><span class="card-number">04</span><h3>Kolay veri aktarımı</h3><p>Öğrenci ve personel bilgileri e-Okul Excel çıktısından veya panodan içe alınabilir.</p></article>
      <article class="card"><span class="card-number">05</span><h3>Şifreli yedek</h3><p>Veritabanı yedeği cihazda şifrelenir; buluta otomatik yükleme yapılmaz.</p></article>
      <article class="card"><span class="card-number">06</span><h3>Çevrimdışı kullanım</h3><p>Kurulumdan sonra internet gerekmez; uygulama yalnızca okul bilgisayarında çalışır.</p></article>
    </div>
  </section>

  <section class="section download-section" id="indir">
    <div class="section-heading two-column-heading">
      <div>
        <p class="eyebrow">Güvenli indirme</p>
        <h2>Uygulamayı indirin</h2>
      </div>
      <p class="release-summary">
        {release.available
          ? `${release.prerelease ? 'Beta sürüm' : 'En yeni sürüm'}: ${release.version}`
          : 'İlk indirilebilir sürüm hazırlık aşamasında.'}
      </p>
    </div>

    <div class="drive-card">
      <div>
        <h3>Google Drive'dan indirin</h3>
        <p>
          Kurulum dosyaları resmî Google Drive klasöründe yayımlanır. MEB ağı gibi
          GitHub'ın engelli olduğu ağlardan da erişilebilir.
        </p>
      </div>
      <a class="button button-primary" href={release.driveUrl} rel="noopener">Google Drive'dan indir</a>
    </div>

    {assets.length > 0 && (
      <div class="download-grid">
        {assets.map((asset) => (
          <article class="download-card">
            <h3>{packageLabels[asset.kind][0]}</h3>
            <p class="download-meta">
              {packageLabels[asset.kind][1]}{asset.size ? ` · ${formatBytes(asset.size)}` : ''}
            </p>
            <a class="button" href={asset.url} rel="noopener" aria-label={`${packageLabels[asset.kind][0]} paketini GitHub'dan indir`}>
              GitHub'dan indir
            </a>
          </article>
        ))}
      </div>
    )}

    <div class="security-note">
      <strong>Dosya güvenliği</strong>
      <p>
        Dosyalar yalnızca resmî Google Drive klasöründen ve projenin resmî GitHub Releases
        alanından sunulur. İndirdikten sonra yayımlanan SHA-256 özetiyle doğrulamanız önerilir.
      </p>
      <a href="/disiplin-defteri/kilavuz/#dosya-dogrulama">Dosya doğrulama adımları →</a>
    </div>

    <p class="github-fallback">
      GitHub'a erişebiliyorsanız paketleri
      <a href={release.releaseUrl} rel="noopener">GitHub Releases</a> sayfasından da indirebilirsiniz.
    </p>
  </section>

  <section class="section updates" id="guncellemeler">
    <div class="section-heading">
      <p class="eyebrow">Güncellemeler</p>
      <h2>Her sürümün ne getirdiğini görün</h2>
    </div>
    <div class="update-layout">
      <div>
        <p class="release-title">
          {release.available
            ? release.name || `Disiplin Defteri ${release.version}`
            : 'İndirilebilir sürüm henüz yayımlanmadı'}
        </p>
        <p class="muted">
          {release.available && releaseDate
            ? releaseDate
            : 'Paketler güvenlik kontrollerinden sonra burada görünür.'}
        </p>
      </div>
      <div>
        <p>Yeni özellikler, düzeltmeler ve bilinen sorunlar sürüm sayfasında açıkça yayımlanır.</p>
        <a class="text-link" href={release.releaseUrl} rel="noopener">Tüm sürüm notlarını görüntüle →</a>
      </div>
    </div>
  </section>

  <section class="section contact" id="iletisim">
    <div>
      <p class="eyebrow">İletişim</p>
      <h2>Bir sorun veya öneriniz mi var?</h2>
      <p>Teknik destek, öneri ve hata bildirimleri için e-posta gönderebilirsiniz.</p>
      <a class="button button-primary" href="mailto:aalidemirci@gmail.com?subject=Disiplin%20Defteri%20hakkında">E-posta gönder</a>
    </div>
    <aside class="warning-card">
      <strong>Kişisel veri göndermeyin</strong>
      <p>
        E-postaya veya herkese açık GitHub kayıtlarına öğrenci/personel adı, T.C. kimlik
        numarası, telefon, adres, disiplin dosyası, ekran görüntüsü, yedek ya da günlük
        dosyası eklemeyin.
      </p>
      <a href="/disiplin-defteri/gizlilik/">Gizlilik ve KVKK bilgilendirmesi →</a>
    </aside>
  </section>
</DDLayout>
```

- [ ] **Step 2: Build + çıktı kontrolü**

Run: `npm run build 2>&1 | tail -3 && grep -c 'drive.google.com' dist/disiplin-defteri/index.html && grep -c 'Süreç takibi' dist/disiplin-defteri/index.html`
Expected: build "Complete!"; her iki grep çıktısı `1`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/disiplin-defteri/index.astro
git commit -m "Disiplin Defteri tanıtım sayfası: Drive-asıl indirme ile Pages portu

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Kılavuz ve Gizlilik sayfaları

**Files:**
- Create: `src/pages/disiplin-defteri/kilavuz.astro`
- Create: `src/pages/disiplin-defteri/gizlilik.astro`

**Interfaces:**
- Consumes: Task 5 `DDLayout`.
- Not: İçerik Pages'tan birebir; yalnız spec'teki uyarlamalar uygulanır
  (Drive ifadesi, Cloudflare barındırma, güncelleme tarihi).

- [ ] **Step 1: `src/pages/disiplin-defteri/kilavuz.astro` dosyasını oluştur**

```astro
---
import DDLayout from '../../layouts/DDLayout.astro';
---

<DDLayout
  title="Kullanım Kılavuzu — Disiplin Defteri"
  description="Disiplin Defteri kurulum, ilk kullanım, yedekleme ve sorun giderme kılavuzu."
>
  <div class="document-layout">
    <aside class="document-nav" aria-label="Kılavuz içindekiler">
      <strong>İçindekiler</strong>
      <a href="#paket-secimi">Paket seçimi</a>
      <a href="#windows">Windows kurulumu</a>
      <a href="#pardus">Pardus / Linux</a>
      <a href="#ilk-acilis">İlk açılış</a>
      <a href="#yedekleme">Yedekleme</a>
      <a href="#dosya-dogrulama">Dosya doğrulama</a>
      <a href="#sorun-giderme">Sorun giderme</a>
    </aside>
    <article class="document">
      <p class="eyebrow">Kullanım kılavuzu</p>
      <h1>Kurulumdan ilk dosyanıza kadar</h1>
      <div class="info-box">
        <strong>İnternet bağlantısı gerekmez.</strong>
        <p>Program kurulduktan sonra kayıtlar yalnızca kullandığınız bilgisayarda tutulur.</p>
      </div>

      <h2 id="paket-secimi">Hangi paketi seçmeliyim?</h2>
      <div class="guide-table" role="table" aria-label="Kurulum paketi seçenekleri">
        <div role="row"><strong role="cell">Windows kurulum</strong><span role="cell">Normal kullanım için önerilen seçenek; yönetici parolası gerekmez.</span></div>
        <div role="row"><strong role="cell">Windows taşınabilir</strong><span role="cell">Kurulumun engellendiği bilgisayarlar veya USB kullanımı için.</span></div>
        <div role="row"><strong role="cell">Pardus / Debian paketi</strong><span role="cell">Normal Linux kurulumu; yönetici parolası gerekir.</span></div>
        <div role="row"><strong role="cell">Linux arşivi</strong><span role="cell">Yönetici parolası olmadan kullanıcı hesabına kurulum için.</span></div>
      </div>

      <h2 id="windows">Windows kurulumu</h2>
      <ol>
        <li>İndirdiğiniz <code>win64-setup.exe</code> dosyasına çift tıklayın.</li>
        <li>Windows koruma uyarısı gösterirse dosyayı yalnızca bu sitenin yönlendirdiği resmî Google Drive klasöründen veya resmî GitHub sürümünden indirdiğinizi doğrulayın.</li>
        <li>Kurulum sihirbazında ilerleyin ve Başlat menüsünden uygulamayı açın.</li>
      </ol>

      <h2 id="pardus">Pardus / Linux kurulumu</h2>
      <p>
        <code>.deb</code> dosyasına çift tıklayıp yazılım yükleyicisinde <strong>Kur</strong>
        seçeneğini kullanın. Yönetici erişiminiz yoksa Linux taşınabilir arşivini indirip
        içindeki açıklamaları izleyin.
      </p>

      <h2 id="ilk-acilis">İlk açılış</h2>
      <ol>
        <li>Okul adı, il/ilçe ve yönetici bilgilerini girin.</li>
        <li>Ders yılını ve başlangıç/bitiş tarihlerini belirleyin.</li>
        <li>Resmî ve idari tatilleri girin. Ara tatilleri iş günü hesabından çıkarmayın.</li>
        <li>Öğrenci ve personel listesini e-Okul Excel çıktısından veya panodan aktarın.</li>
      </ol>
      <div class="warning-card">
        <strong>Gerçek verileri destek talebine eklemeyin</strong>
        <p>
          İçe aktardığınız öğrenci/personel dosyalarını, oluşturulan evrakları, uygulama
          yedeğini veya ekran görüntülerini e-posta ve GitHub üzerinden paylaşmayın.
        </p>
      </div>

      <h2 id="yedekleme">Yedekleme</h2>
      <p>
        Ayarlar → Güvenlik ekranından şifreli <code>.ddbak</code> yedeği oluşturun. Yedek
        cihazda şifrelenir ve herhangi bir bulut hesabına otomatik gönderilmez. Disk
        arızasına karşı yedeği kurumunuzun onayladığı güvenli bir ortama ayrıca kopyalayın.
      </p>

      <h2 id="dosya-dogrulama">İndirilen dosyayı doğrulama</h2>
      <p>
        Sürümle birlikte yayımlanan <code>SHA256SUMS.txt</code> dosyasındaki değer ile
        indirdiğiniz dosyanın özetini karşılaştırın.
      </p>
      <h3>Windows PowerShell</h3>
      <pre><code>Get-FileHash .\disiplin-defteri-&lt;sürüm&gt;-win64-setup.exe -Algorithm SHA256</code></pre>
      <h3>Pardus / Linux</h3>
      <pre><code>sha256sum -c SHA256SUMS.txt</code></pre>

      <h2 id="sorun-giderme">Sık karşılaşılan sorunlar</h2>
      <h3>WebView2 bulunamadı</h3>
      <p>
        Windows 10 kullanılan bazı bilgisayarlarda Microsoft Edge WebView2 bileşeninin kurum
        bilişim sorumlusu tarafından kurulması gerekebilir.
      </p>
      <h3>Program zaten çalışıyor</h3>
      <p>
        Aynı anda yalnızca bir kopya çalışır. Görev çubuğundaki açık pencereyi bulun veya
        bilgisayarı yeniden başlatın.
      </p>
      <h3>Veritabanı bozuk uyarısı</h3>
      <p>
        Programı kapatın ve en son sağlam şifreli yedekten dönün. Bozuk veritabanını veya
        yedeği destek talebine eklemeyin.
      </p>

      <p class="document-source">
        Ayrıntılı teknik kılavuz için
        <a href="https://github.com/aalidemirci/disiplin-defteri-codex/blob/main/docs/kurulum.md" rel="noopener">depodaki güncel kurulum belgesine</a>
        bakabilirsiniz.
      </p>
    </article>
  </div>
</DDLayout>
```

- [ ] **Step 2: `src/pages/disiplin-defteri/gizlilik.astro` dosyasını oluştur**

```astro
---
import DDLayout from '../../layouts/DDLayout.astro';
---

<DDLayout
  title="Gizlilik ve KVKK — Disiplin Defteri"
  description="Disiplin Defteri web sitesi gizlilik ve KVKK bilgilendirmesi."
>
  <div class="document-layout single-document">
    <article class="document">
      <p class="eyebrow">Son güncelleme: 6 Ağustos 2026</p>
      <h1>Gizlilik ve KVKK bilgilendirmesi</h1>
      <div class="info-box">
        <strong>Kısa özet</strong>
        <p>
          Bu sitede üyelik, iletişim formu, reklam, analiz aracı veya pazarlama çerezi
          yoktur. Uygulamadaki öğrenci ve personel verileri siteye gönderilmez.
        </p>
      </div>

      <h2>1. Veri sorumlusu</h2>
      <p>
        Site ve proje bakımından veri sorumlusu Ahmet Ali Demirci'dir. KVKK kapsamındaki
        soru ve başvurularınızı
        <a href="mailto:aalidemirci@gmail.com">aalidemirci@gmail.com</a> adresine
        iletebilirsiniz.
      </p>

      <h2>2. Site ziyareti</h2>
      <p>
        Proje sahibi ziyaretçi analizi yapmaz, reklam ağı kullanmaz ve tarayıcınıza takip
        amaçlı çerez bırakmaz. Tarayıcının yerel depolamasında yalnızca seçtiğiniz açık/koyu
        tema tercihi tutulur; bu bilgi siteden dışarı gönderilmez. Site Cloudflare üzerinde
        barındırılır. Sayfaya erişirken IP adresi, tarih-saat, tarayıcı bilgisi ve istenen
        adres gibi teknik bağlantı kayıtları Cloudflare tarafından hizmetin sunulması ve
        güvenliğinin sağlanması amacıyla işlenebilir. Bu işlem Cloudflare'in kendi altyapısı
        ve gizlilik koşulları kapsamında gerçekleşir.
      </p>

      <h2>3. E-posta ile iletişim</h2>
      <p>
        E-posta gönderirseniz adınız, e-posta adresiniz ve ileti içeriğiniz; talebinizi
        yanıtlamak, teknik sorunu incelemek ve gerektiğinde bir hakkın kurulması,
        kullanılması veya korunması amaçlarıyla işlenir. Veriler e-posta yoluyla doğrudan
        sizden elde edilir. İşleme; talebin niteliğine göre sözleşmenin kurulması veya ifası
        için gerekli olma, bir hakkın tesisi/kullanılması/korunması ya da temel haklarınıza
        zarar vermemek kaydıyla veri sorumlusunun meşru menfaati hukuki sebeplerine dayanır.
      </p>

      <h2>4. Aktarım ve yurt dışı hizmetler</h2>
      <p>
        Site Cloudflare, indirme dosyaları Google Drive ve GitHub, e-posta iletişimi ise
        Gmail altyapısından yararlanır. Bu hizmetler kapsamında teknik bağlantı kayıtları ve
        gönderdiğiniz e-posta içeriği, hizmet sağlayıcıların yurt dışındaki sistemlerinde
        işlenebilir. İndirme bağlantısına tıkladığınızda Google Drive'ın veya GitHub'ın
        kendi altyapısı ve gizlilik koşulları geçerli olur. Proje sahibi bunun dışında
        verilerinizi reklam, pazarlama veya veri ticareti amacıyla üçüncü kişilere aktarmaz.
        Kanunen yetkili makamların usulüne uygun talepleri saklıdır.
      </p>

      <h2>5. Saklama</h2>
      <p>
        Destek yazışmaları talebin sonuçlandırılması ve olası uyuşmazlıkların takibi için
        gerekli olan süreyle sınırlı tutulur; saklanmasını gerektiren bir neden kalmadığında
        silinir. Site sahibi Cloudflare'in hizmet güvenliği amacıyla tuttuğu teknik
        kayıtların saklama sürelerini belirlemez.
      </p>

      <h2>6. Haklarınız</h2>
      <p>
        6698 sayılı Kanun'un 11. maddesi kapsamındaki haklarınıza ilişkin başvurunuzu
        yukarıdaki e-posta adresine gönderebilirsiniz. Başvuruda talebinizi açıklayın;
        kimlik belgesi, öğrenci/personel kaydı veya disiplin evrakı göndermeyin. Kimliğin
        doğrulanması zorunlu hâle gelirse yalnızca gerekli ve güvenli yöntem ayrıca
        bildirilecektir.
      </p>

      <h2>7. Özellikle paylaşmamanız gerekenler</h2>
      <ul>
        <li>Öğrenci, veli veya personel adı ve iletişim bilgileri</li>
        <li>T.C. kimlik numarası, adres, sağlık veya engellilik bilgisi</li>
        <li>Disiplin/onur kurulu dosyaları ve alınan kararlar</li>
        <li>Uygulama ekran görüntüleri, Excel içe aktarma dosyaları</li>
        <li><code>.ddbak</code> yedekleri, veritabanı ve günlük dosyaları</li>
      </ul>
      <div class="warning-card">
        <strong>GitHub Issues herkese açık olabilir</strong>
        <p>
          Hata bildirirken yalnızca genel adımları ve kişisel veri içermeyen örnekleri
          kullanın. Gerçek kurum verisini gizleseniz bile dosya veya ekran görüntüsü
          yüklemeyin.
        </p>
      </div>

      <p class="document-source">
        Resmî kaynak:
        <a href="https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-" rel="noopener">Kişisel Verileri Koruma Kurumu — Aydınlatma Yükümlülüğü</a>.
        Barındırma için
        <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener">Cloudflare Gizlilik Politikası</a>,
        indirme hizmetleri için
        <a href="https://policies.google.com/privacy" rel="noopener">Google Gizlilik Politikası</a>
        ve
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Gizlilik Bildirimi</a>.
      </p>
      <p class="legal-note">
        Bu metin sitenin mevcut, veri toplamayı en aza indiren yapısını açıklar. İletişim
        yöntemi, barındırma altyapısı veya veri işleme faaliyeti değişirse yayımdan önce
        yeniden değerlendirilmelidir.
      </p>
    </article>
  </div>
</DDLayout>
```

- [ ] **Step 3: Build + çıktı kontrolü**

Run: `npm run build 2>&1 | tail -3 && grep -c 'dosya-dogrulama' dist/disiplin-defteri/kilavuz/index.html && grep -c 'Cloudflare' dist/disiplin-defteri/gizlilik/index.html`
Expected: build "Complete!"; ilk grep ≥ 1, ikinci grep ≥ 3.

- [ ] **Step 4: Commit**

```bash
git add src/pages/disiplin-defteri/kilavuz.astro src/pages/disiplin-defteri/gizlilik.astro
git commit -m "Disiplin Defteri kılavuz ve KVKK sayfaları (Cloudflare/Drive uyarlamalı)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Son doğrulama, README güncellemesi ve yayın

**Files:**
- Modify: `README.md` ("Nasıl çalışır?" bölümüne madde + yeni bölüm)

**Interfaces:**
- Consumes: Önceki tüm görevler.

- [ ] **Step 1: README.md'ye Disiplin Defteri bölümü ekle**

"## Yeni proje ekleme" başlığından ÖNCE şu bölümü ekle:

```markdown
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
```

- [ ] **Step 2: Tam build + sitemap ve link kontrolü**

Run:
```bash
npm run build 2>&1 | tail -3
grep -o 'disiplin-defteri[^<]*' dist/sitemap-0.xml
grep -c 'href="/disiplin-defteri/"' dist/projeler/disiplin-defteri-codex/index.html
ls dist/disiplin-defteri dist/disiplin-defteri/kilavuz dist/disiplin-defteri/gizlilik
```
Expected: build "Complete!"; sitemap'te `disiplin-defteri/`, `disiplin-defteri/kilavuz/`, `disiplin-defteri/gizlilik/` görünür; grep `1`; üç dizinde de `index.html` var.

- [ ] **Step 3: Commit ve push**

```bash
git add README.md docs/superpowers/plans/2026-08-06-disiplin-defteri-clone.md
git commit -m "README: Disiplin Defteri bölümü ve sürüm verisi talimatları

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push
```

- [ ] **Step 4: Kullanıcı incelemesi iste**

Kullanıcıya şunları ilet:
- KVKK sayfası (`/disiplin-defteri/gizlilik/`) hukuki metin olduğu için yayın
  öncesi okunmalı (Cloudflare/Drive uyarlamaları yapıldı, tarih güncellendi).
- Görsel kontrol: `npm run preview` ile açık/koyu temada sayfalara bakılmalı
  (veya kullanıcı Cloudflare preview URL'inde kontrol eder).
```
