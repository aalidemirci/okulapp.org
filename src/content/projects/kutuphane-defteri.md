---
title: Kütüphane Defteri
description: Okulun kütüphane işlerini — katalog ve etiket, ödünç masası, sınıf kitaplığına teslim, sayım ve ayıklama — tek bilgisayarda yürüten çevrimdışı, yerel masaüstü aracı.
repoUrl: https://github.com/aalidemirci/kutuphane-defteri
language: Python
topics: []
featured: true
order: 5
siteUrl: /kutuphane-defteri/
accent: '#2b5591'
badge: Beta 2026.10.0
---

Kütüphane Defteri, okulun kütüphane işlerini yürüttüğü çevrimdışı, yerel bir
masaüstü aracıdır. Kütüphaneden sorumlu öğretmen ya da kütüphaneci için
yazıldı; ödünç masasında öğrenci görevliler de çalışabilir. Kuralları Okul
Kütüphaneleri Yönetmeliği'nden gelir: on beş günlük ödünç süresi, öğrenciye
üç, öğretmene beş kitap sınırı, ödünç verilmeyen kaynaklar. Program bu
kuralları masada kendisi uygular; süre uzatma, ceza ya da harç yoktur.

Okulların çoğunda hazır bir kitap listesi olmadığı için katalog kitap kitap
kurulur: boş barkod etiketleri basılıp kitaplara yapıştırılır, kitap elde
okutularak kaydedilir. Liste varsa Excel şablonuyla toplu aktarılır; önizleme
hiçbir şey yazmadan sonucu gösterir. Arama ve sıralama Türkçe harflere
duyarlıdır. Ödünç ve iade üye kartı ile barkod okuyucuyla yapılır; sınıf
kitaplığına ve öğretmene toplu teslim, kayıp ve hasar dosyaları, ilişik
belgesi, sayım tutanağı, ayıklama belgeleri ve yıl sonu kütüphane raporu da
programdan çıkar. Resmî taşınır kayıtları Taşınır Kayıt ve Yönetim
Sistemi'nde kalır; program onların yerine geçmez, hazırlık dökümü verir.

Veriler okulun kendi bilgisayarında durur: bulut, hesap ve telemetri yoktur,
program açılışta internete çıkmaz. Kişi adları, okul numaraları ve kart
numaraları zorunlu yönetici parolasına bağlı bir anahtarla şifrelenir; her gün
şifreli yedek alınır. İstenirse okul ağındaki bilgisayarlar ve etkileşimli
tahtalar kataloğu tarayıcıyla, salt okur olarak tarayabilir. Bu Ağ Kataloğu
varsayılan olarak kapalıdır, kişisel veri göstermez ve internete çıkmaz.
Program Bakanlık otomasyon sistemine bağlanmaz, ona veri göndermez; kataloğunu
açık, belgelenmiş bir biçimde dışa aktarabilir.
