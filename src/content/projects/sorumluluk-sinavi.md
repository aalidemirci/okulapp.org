---
title: Sorumluluk Sınavı
description: Ortaöğretim kurumlarında sorumluluk sınavı planını, görevlendirmeyi ve sınav evrakını çevrimdışı hazırlayan masaüstü uygulaması.
repoUrl: https://github.com/aalidemirci/sorumluluk-sinavi
language: Python
topics: []
featured: true
order: 3
siteUrl: /sorumluluk-sinavi/
accent: '#9a2f4a'
badge: Sürüm 0.5.0
---

Sorumluluk Sınavı, yılda üç kez tekrarlanan ve her seferinde birkaç günü yiyen
bir işi — sınav çizelgesini kurup komisyonları görevlendirmeyi — tek bir
masaüstü programına taşımak için yazıldı. e-Okul'dan alınan iki raporu içe
aktarırsınız: personel listesi ve sorumluluk sınavına girecek öğrenci listesi.
Gerisini program yapar; sınav oturumlarını günlere ve saatlere yerleştirir,
her oturuma komisyon ve gözcü atar, ortaya çıkan planı sürükle-bırakla
düzeltmenize izin verir ve müdür onayıyla kesinleştirir.

İşin zor tarafı sınavı bir güne koymak değil, o saatte komisyonu
kurabilmektir. Program bu ikisini ayrı adımlar olarak değil tek problem
olarak çözer; böylece aynı saatte birden fazla sınav yapılabilir ve çizelge
az sayıda güne sığar. Gün sayısını da kendisi seçer: öğrencilerin
çoğunluğunun sığdığı en kısa program denenir, pencereye sığmayan tek tük
öğrencinin günlük sınav sınırı gereken en düşük değere çıkarılır ve bu
rapor edilir. Plan üretilemiyorsa hangi kısıtın bağladığı yazılır — salon
sayısı mı, görevli kapasitesi mi, branş arzı mı.

Program sekiz belge üretir: iki nüsha hâlinde sınav programı, komisyon bazlı
görevlendirme çizelgesi (arkasında tebliğ-tebellüğ tablosuyla), öğretmen görev
sayacı, okul web sayfasında yayımlanacak üç ilan belgesi ve plan dışı
bırakılanlar tutanağı. Belgeler şablon dosyasından değil koddan üretilir, her
birinin altında dayanağı yazar. İlan çıktıları KVKK gözetilerek tasarlanmıştır:
sınav takviminde hiçbir kişisel veri geçmez, öğrenci çizelgesinde ad ve soyadı
hiçbir seçenekte açık yazılmaz — okul numarası ve maskelenmiş ad gösterilir.
Sınavdan sonra komisyondan geri alınacak evrak da oturum başına izlenir;
süresinde gelmeyen evrak çizelgede kırmızı görünür.

Uygulamanın kural katmanı ayrı tutulur: 18 kural tek dosyada tanımlanır ve
her birinin hangi maddeye dayandığı kodda ve testinde yazılıdır (OKY md.58,
ÖDY md.5, ek ders kararı md.12). Mevzuat değil okul kararı olan kurallar —
salon başına bir gözcü sayılması, gözcünün sınav branşından farklı seçilmesi,
müdür ve rehber öğretmene görev verilmemesi — böyle etiketlenir. Motorun
ürettiği plan da elle düzenlenen plan da aynı doğrulayıcıdan geçer. Görev
sayaçları Eylül, Şubat ve Haziran dönemleri arasında taşınır; ilk dönemde çok
görev almış öğretmen sonrakinde geri plana düşer.

Teknik tarafta uygulama Python ve Tkinter ile yazılmıştır, veritabanı
SQLite'tır ve şema değişiklikleri göç dosyalarıyla ilerler. Kural katmanı
veritabanını hiç görmez; bu sayede kurallar veritabanı olmadan test edilebilir.
Belgeler `.docx` olarak üretilir. Windows için PyInstaller + Inno Setup ile
kullanıcı başına kurulan, yönetici parolası istemeyen bir paket çıkarılır.
Program hiçbir ağ isteği yapmaz: bulut, telemetri, çevrimiçi güncelleme yoktur
ve T.C. kimlik numarası okunmaz. Ticari olmayan kullanım için ücretsizdir
(PolyForm Noncommercial 1.0.0).
