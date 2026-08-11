#!/usr/bin/env node
// src/data/*-release.json dosyalarındaki sürümü, ilgili GitHub deposundaki en
// yeni sürümle karşılaştırır.
//
// Bu dosyalar ELLE tutulur: proje bölümlerindeki indirme kartları buradan
// üretilir. Uygulama deposunda yeni sürüm çıktığında burası güncellenmezse
// site eski paketi göstermeye devam eder.
//
// Kullanım:
//   node scripts/check-releases.mjs              → bayat sürüm varsa hata verir
//   node scripts/check-releases.mjs --warn-only  → yalnızca uyarır (build öncesi)
//
// --warn-only kipi ASLA hata döndürmez: ağın kapalı olduğu bir ortamda
// (çevrimdışı geliştirme, kısıtlı CI) derlemenin durmaması gerekir.

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const warnOnly = process.argv.includes('--warn-only');
const dataDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const TIMEOUT_MS = 8000;

/** releaseUrl içinden "sahip/depo" çıkarır. */
function repoFromUrl(releaseUrl) {
  const match = String(releaseUrl ?? '').match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

const normalize = (value) => String(value ?? '').replace(/^v/, '').trim();

async function latestRelease(repo) {
  // /releases/latest ön sürümleri atlar; ön sürümde olan projeleri de
  // yakalayabilmek için tüm listeyi alıp taslak olmayan ilkini kullanıyoruz.
  const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'okulapp.org-check-releases' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const releases = await response.json();
  return releases.find((release) => !release.draft) ?? null;
}

const files = (await readdir(dataDir)).filter((name) => name.endsWith('-release.json')).sort();
let stale = 0;
let unchecked = 0;

for (const file of files) {
  const local = JSON.parse(await readFile(join(dataDir, file), 'utf8'));
  const repo = repoFromUrl(local.releaseUrl);

  if (!repo) {
    console.warn(`?  ${file}: releaseUrl bir GitHub deposunu göstermiyor, atlandı.`);
    unchecked += 1;
    continue;
  }

  let remote;
  try {
    remote = await latestRelease(repo);
  } catch (error) {
    console.warn(`?  ${file}: ${repo} sorgulanamadı (${error.message}), atlandı.`);
    unchecked += 1;
    continue;
  }

  if (!remote) {
    console.log(`-  ${file}: ${repo} deposunda yayımlanmış sürüm yok.`);
    continue;
  }

  const remoteVersion = normalize(remote.tag_name);
  const localVersion = normalize(local.version);

  if (localVersion === remoteVersion) {
    console.log(`OK ${file}: ${localVersion} (${repo})`);
    continue;
  }

  stale += 1;
  const assets = (remote.assets ?? []).map((asset) => `${asset.name} (${asset.size} B)`);
  console.error(
    [
      `!  ${file}: sitede ${localVersion || '(boş)'}, ${repo} deposunda ${remoteVersion}.`,
      `   Sürüm sayfası: ${remote.html_url}`,
      `   Yayım: ${remote.published_at}${remote.prerelease ? ' (ön sürüm)' : ''}`,
      assets.length ? `   Paketler: ${assets.join(', ')}` : '   Paket yok.',
      `   ${file} içindeki version, name, published_at, prerelease ve assets alanlarını güncelleyin.`,
    ].join('\n'),
  );
}

if (stale > 0) {
  const summary = `${stale} sürüm dosyası güncel değil.`;
  if (warnOnly) {
    console.warn(`\nUYARI: ${summary} Derleme sürdürülüyor.`);
    process.exit(0);
  }
  console.error(`\n${summary}`);
  process.exit(1);
}

// Denetlenemeyen dosya için "güncel" demeyin: hiçbir şey sorgulanamadığında
// bu cümle yanlış güven verir.
if (unchecked === files.length) {
  console.warn(`\nHiçbir sürüm dosyası denetlenemedi (${unchecked} dosya); güncellik bilinmiyor.`);
} else if (unchecked > 0) {
  console.log(`\nDenetlenen sürüm dosyaları güncel; ${unchecked} dosya denetlenemedi.`);
} else {
  console.log('\nTüm sürüm dosyaları güncel.');
}
