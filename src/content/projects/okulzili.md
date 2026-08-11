---
title: Okul Zili
description: Ders zilini, tatilleri, törenleri ve anonsları çevrimdışı yöneten masaüstü zil programı.
repoUrl: https://github.com/aalidemirci/okulzili
language: Python
topics: []
featured: true
order: 2
siteUrl: /okul-zili/
accent: '#0d6b7b'
badge: Sürüm 0.6.0
---

Okul Zili, okulun ders zilini bir kişinin saate bakıp düğmeye basmasına ya da
kimsenin dokunmaya cesaret edemediği eski bir zaman saatine bırakmamak için
yazıldı. İlk dersin başlangıcını, ders sayısını, ders ve teneffüs sürelerini,
öğle arasının yerini bir kez girersiniz; program günün bütün zil saatlerini
kendisi hesaplar. Hazırladığınız bir günü diğer günlere ya da tüm ders
günlerine tek işlemle kopyalayabilir, gerektiğinde yalnızca tek bir dersin
saatini elle düzeltebilirsiniz. Öğrenci zili isteğe bağlıdır; öğretmen
zilinden kaç dakika önce çalacağı gün bazında ayarlanır.

Her okul tek oturumla çalışmıyor. Günler tekli eğitim ya da sabah/öğleden
sonra biçiminde iki oturumlu kurulabilir; her oturumun başlangıç saati, ders
sayısı, süreleri ve öğrenci zili farkı birbirinden bağımsızdır. Blok ders
uygulayan okullar için `2+2+1+1` gibi bir desen yazmak yeterli: program blok
içindeki gereksiz ara zilleri kaldırır. Blok içindeki ders sınırlarında
öğretmen değişimini duyurmak için beş saniyelik kısa bir zil çalınabilir; bu
zil teneffüs oluşturmaz ve oturum bazında kapatılabilir. Oturumların
çakışması, aynı dakikaya
denk gelen geçiş zilleri ve blok içine düşen öğle arası gibi hatalar
kaydedilmeden önce engellenir.

Zil çalmaması gereken günler de programın doğal parçasıdır. Ders yılı,
dönemler, ara tatiller ve yarıyıl tatili takvim ekranından düzenlenir;
Türkiye'nin sabit resmî tatilleri ile 28 Ekim ve dinî bayram arifelerindeki
yarım gün kuralı uygulama içinde hesaplanır. Hafta sonuna denk gelen telafi
günleri, tören, sınav ve kısaltılmış gün akışları ayrıca tanımlanabilir.
İstiklâl Marşı ve 10 Kasım akışı, AFAD'ın resmî tarifine göre üretilen sarı,
kırmızı ve KBRN ikazları ile okul içi tatbikat sirenleri ana ekrandadır; bu
tür riskli yayınlar başlamadan önce açık onay ister, çalan her ses tek
düğmeyle kesilebilir.

Zil, marş, anons ve ikaz kayıtları kurulum paketinin içinde gelir; program
hiçbir ses dosyasını internetten indirmez. Yönetim ekranındaki tek bir çubuk
öğrenci, öğretmen, teneffüs, tören ve tatbikat yayınlarının ortak ses düzeyini
belirler. Teneffüslerde kamu malı bestelerden hafif müzik çaldırmak
isteğe bağlıdır: varsayılan olarak kapalıdır, ayrı ve düşük bir ses sınırı
vardır, sıradaki zilden bir saniye önce ya da herhangi bir tören yayını
başladığında kendiliğinden susar.

Program okul ortamının hata payını hesaba katarak tasarlandı: her çalmadan
önce ses cihazı ve dosya denetlenir, dosya bozuksa gömülü yedek bip sesi
çalar ve ekranda görünür bir uyarı çıkar; seçili USB cihazı kaybolursa
varsayılan çıkıştan yeniden denenir. Tek oynatma kuyruğu iki sesin üst üste
binmesini engeller, uyku/uyanma sonrası kaçırılan ziller tolerans kuralına
göre değerlendirilir. Yönetici, nöbetçi ve salt görüntüleme profilleri PIN ile
ayrılır; paylaşılabilir yedekler karmayla doğrulanır ve içlerine PIN ile
günlük konmaz.

Teknik tarafta uygulama Python ve Tk ile yazılmıştır; üçüncü taraf test çatısı
kullanmadan `unittest` ile doğrulanır. Windows için kurulum
ve taşınabilir paket, Pardus 23 / Ubuntu 22.04+ için `.deb` paketi üretilir.
Eski tekli eğitim programları yeni sürümlerde olduğu gibi açılır; şema geçişi
veri kaybetmeden yapılır. Bulut hesabı,
telemetri veya çevrimiçi etkinleştirme yoktur; veriler Windows'ta
`%LOCALAPPDATA%\OkulZili`, Linux'ta `~/.local/share/okul-zili` altında kalır.
Ticari olmayan kullanım için ücretsizdir (PolyForm Noncommercial 1.0.0).
