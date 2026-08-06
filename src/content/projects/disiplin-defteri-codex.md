---
title: Disiplin Defteri
description: Ortaöğretim kurumları için çevrimdışı çalışan disiplin, onur ve ödül süreçleri masaüstü uygulaması.
repoUrl: https://github.com/aalidemirci/disiplin-defteri-codex
language: Python
topics: []
featured: true
order: 1
siteUrl: /disiplin-defteri/
---

Disiplin Defteri, bir lisenin disiplin kurulu işlerini kâğıt ve dağınık Word
şablonları yerine tek bir masaüstü programında yürütmek için yazıldı. Dilekçe
ya da ihbarla başlayan süreci rehberlik aşaması, müdür kararı, gerekirse kurul
görüşmesi, itiraz ve kapanışa kadar adım adım takip eder; her adımda gereken
resmî evrakı (16 disiplin belge türü, dizi pusulası, karar defteri, müdür
uyarı formları ve 3 onur/ödül PDF'i) kendisi üretir. Ortaöğretim Kurumları
Yönetmeliği'nin 157-206. maddelerindeki iş günü tabanlı yasal süreleri de
otomatik hesaplayıp hatırlatır.

Program okul müdürü, müdür yardımcısı veya disiplin kurulu başkanı gibi tek bir
sorumlunun bilgisayarında, internetsiz çalışacak şekilde tasarlandı: giriş ve
şifre ekranı yok, veri okulun kendi makinesinde durur. Öğrenci ve personel
listeleri e-Okul ihracından ya da Excel'den içe aktarılır. Veritabanının
şifreli yedeği (`X25519 + AES-256-GCM` ile, `.ddbak` biçiminde) tek tıkla
alınabilir; program hiçbir bulut hesabına bağlanmaz, yedeği nereye
kopyalayacağına kullanıcı karar verir.

Teknik tarafta backend Django + DRF ve SQLite ile yalnızca `127.0.0.1`
üzerinde çalışır; arayüz React + TypeScript + Vite ile yazılmıştır ve
`pywebview` kabuğu ikisini tek masaüstü penceresinde birleştirir. Windows için
PyInstaller + Inno Setup, Pardus/Linux için `.deb` paketi üretilir. Proje
sürüm `2026.7.0-beta.1` seviyesindedir; kod tabanı çalışır durumda olmakla
birlikte bazı senaryoların gerçek masaüstü ortamında saha doğrulaması sürüyor.
Ticari olmayan kullanım için ücretsizdir (PolyForm Noncommercial 1.0.0).
