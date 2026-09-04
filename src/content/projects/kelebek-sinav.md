---
title: Kelebek Sınav
description: Ortak yazılı sınavların takvimini kuran, öğrencileri kelebek düzeniyle salonlara dağıtan ve salon evrakını hazırlayan çevrimdışı masaüstü uygulaması.
repoUrl: https://github.com/aalidemirci/kelebek-sinav
language: Python
topics: []
featured: true
order: 4
siteUrl: /kelebek-sinav/
accent: '#0a6c70'
badge: Beta 2026.9.0
---

Kelebek Sınav, ortak yazılı sınavlarda iki işi birden yapmak için yazıldı:
sınav takvimini kurmak ve öğrencileri salonlara oturtmak. "Kelebek düzen",
aynı sınava giren öğrencilerin yan yana düşmediği oturma planıdır; elle
kurulduğunda bir salonun planı yarım saat alır, hata payı da yüksektir.
Program bunu deterministik bir dağıtım motoruyla yapar: aynı girdiyle her
zaman aynı planı üretir, ürettiği planı bağımsız bir doğrulayıcıdan geçirir
ve tek bir ihlal kalırsa oturumu onaylamaz.

Takvim tarafı mevzuatı bilir. Sınav pencerelerini Ölçme ve Değerlendirme
Yönetmeliğinin öngördüğü aylara göre hesaplar; havuzdaki sınavları hafta içi
günlere ve okulun sınav saatlerine kendisi dağıtır. Dağıtırken aynı öğrenciye
günde ikiden fazla sınav düşürmez, kapsamı kesişen iki sınavı aynı saate
koymaz, Bakanlık ya da millî eğitim müdürlüğü sınavı olan güne okul sınavı
yazmaz. Bir sınavı belli bir güne siz koyduysanız sabitler ve sonraki
dağıtımlarda yerinden oynatmaz; yerleştiremediklerini gerekçesiyle listeler.
Kural motoru tektir — uyarı verdiği her yerde dayandığı madde de yazılıdır,
"zorunlu hâl" takdiri okul müdürlüğünde kalır.

Sınav günü ihtiyaç duyulan kâğıtları da program üretir: salon başına oturma
planı krokisi, yoklama listesi, evrak sayım ve teslim çizelgesi tek yaprakta
birleşiktir; ayrıca şube duyurusu, ihlal tutanağı, görevlendirme yazısı ve
öğrenciye özel soru kitapçıkları çıkar. Ders havuzu, okul türünüzün yürürlükteki
haftalık ders çizelgesinden türetilir; seçmeli dersi hangi şubelerin aldığını
bir kez tanımlarsınız, takvimler o bilgiyi kullanır. Öğrenci ve personel
listeleri e-Okul raporundan içe aktarılır. Veriler tek bir yerel dosyada durur,
buluta gitmez; isterseniz uygulama parolasıyla ad alanlarını diskte şifreler.
