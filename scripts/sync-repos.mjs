#!/usr/bin/env node
// GitHub'daki public repoları tarar; src/content/projects/ altında dosyası
// OLMAYAN her repo için taslak markdown oluşturur.
//
// Mevcut dosyalara ASLA dokunmaz — elle yazılmış anlatımlar güvendedir.
// Kimlik doğrulama `gh` CLI üzerindendir (gh auth login); bu repoda token yok.
//
// Kullanım: npm run sync

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const GITHUB_USER = 'aalidemirci';
const projectsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'projects');

function fetchPublicRepos() {
  const json = execFileSync(
    'gh',
    [
      'repo', 'list', GITHUB_USER,
      '--visibility', 'public',
      '--limit', '100',
      '--json', 'name,description,url,primaryLanguage,repositoryTopics',
    ],
    { encoding: 'utf8' },
  );
  return JSON.parse(json);
}

// YAML frontmatter'da tek tırnaklı string kaçışı.
const yamlStr = (value) => `'${String(value ?? '').replace(/'/g, "''")}'`;

function draftMarkdown(repo) {
  const topics = (repo.repositoryTopics ?? []).map((t) => t.name ?? t);
  return `---
title: ${yamlStr(repo.name)}
description: ${yamlStr(repo.description || 'TODO: Kısa açıklama yazın.')}
repoUrl: ${yamlStr(repo.url)}
language: ${yamlStr(repo.primaryLanguage?.name ?? '')}
topics: [${topics.map(yamlStr).join(', ')}]
featured: false
order: 99
---

TODO: Bu proje ne işe yarar, kimin için ve nasıl çalışır? 2-3 paragraflık
Türkçe bir anlatım yazın. README'yi kopyalamayın; gerçek kişi verisi
(öğrenci adı, numara, e-posta, telefon) varsa siteye taşımayın.
`;
}

function main() {
  mkdirSync(projectsDir, { recursive: true });
  const repos = fetchPublicRepos();
  let created = 0;

  for (const repo of repos) {
    const file = join(projectsDir, `${repo.name}.md`);
    if (existsSync(file)) {
      console.log(`atlandı (zaten var): ${repo.name}`);
      continue;
    }
    writeFileSync(file, draftMarkdown(repo), { flag: 'wx' });
    console.log(`taslak oluşturuldu:   ${repo.name}`);
    created += 1;
  }

  console.log(created === 0
    ? 'Yeni repo yok; hiçbir dosya değişmedi.'
    : `${created} taslak oluşturuldu. İçlerindeki TODO'ları doldurmayı unutmayın.`);
}

main();
