---
title: Disiplin Defteri
description: Ortaöğretim kurumları için çevrimdışı çalışan disiplin süreçleri ile Ödül ve Disiplin Kurulu ve Onur Kurulu masaüstü uygulaması.
repoUrl: https://github.com/aalidemirci/disiplin-defteri-codex
language: Python
topics: []
featured: true
order: 1
siteUrl: /disiplin-defteri/
accent: '#2a6759'
badge: Beta 2026.10.0
---

Disiplin Defteri, bir lisenin disiplin kurulu işlerini kâğıt ve dağınık Word
şablonları yerine tek bir masaüstü programında yürütmek için yazıldı. Dilekçe
ya da ihbarla başlayan süreci rehberlik aşaması, müdür kararı, gerekirse kurul
görüşmesi, itiraz ve kapanışa kadar adım adım takip eder; her adımda gereken
resmî evrakı (çağrı ve savunma belgeleri, EK-1 kurul kararı, tebliğler, müdür
uyarısı, dizi pusulası, karar defteri ve onur belgesi tutanakları) kendisi
üretir. Ortaöğretim Kurumları Yönetmeliği'nin 157-206. maddelerindeki iş günü
tabanlı yasal süreleri de otomatik hesaplayıp hatırlatır.

Ödül ve Disiplin Kurulu ile Onur Kurulu programda ayrı bölümlerdir ve
yönetmelikteki işleyişi izler: kurul toplanır, teklifler gündeme alınır, karar
toplantıda madde madde verilir ve karar defterine yazılır. Ödül ve Disiplin
Kurulunda yeter sayı sağlanmadan karar verilemez; onur belgesi teklifi önce
Onur Kurulunun uygun görüşünden, sonra Ödül ve Disiplin Kurulunun kararından ve
müdür onayından geçer.

Program okul müdürü, müdür yardımcısı veya disiplin kurulu başkanı gibi tek bir
sorumlunun bilgisayarında, internetsiz çalışacak şekilde tasarlandı; veri
okulun kendi makinesinde durur. İsteğe bağlı parola konursa hassas alanlar
veritabanında da şifreli tutulur. Öğrenci ve personel listeleri e-Okul
ihracından ya da Excel'den içe aktarılır. Veritabanının şifreli yedeği
(`X25519 + AES-256-GCM` ile, `.ddbak` biçiminde) alınır; program hiçbir bulut
hesabına bağlanmaz, yedeği nereye kopyalayacağına kullanıcı karar verir.

Teknik tarafta backend Django + DRF ve SQLite ile yalnızca `127.0.0.1`
üzerinde çalışır; arayüz React + TypeScript + Vite ile yazılmıştır ve
`pywebview` kabuğu ikisini tek masaüstü penceresinde birleştirir. Windows için
PyInstaller + Inno Setup, Pardus/Linux için `.deb` paketi üretilir. Proje
sürüm `2026.10.0-beta.1` seviyesindedir; kod tabanı çalışır durumda olmakla
birlikte bazı senaryoların gerçek masaüstü ortamında saha doğrulaması sürüyor.
Ticari olmayan kullanım için ücretsizdir (PolyForm Noncommercial 1.0.0).
