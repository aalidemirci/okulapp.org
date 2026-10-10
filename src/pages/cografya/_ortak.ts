// Coğrafya sayfalarının ortak yardımcıları. Alt çizgiyle başlayan dosya Astro'da sayfa üretmez.
// Veri kaynağı: evrakmotoru → `python arac/gnl_ders_yayin.py --site ../okulapp.org`
// (src/data/cografya.json ÜRETİLİR, elle düzenlenmez; bkz. CLAUDE.md "Ortak çalışma düzeni").
import veri from '../../data/cografya.json';

export type Sinif = (typeof veri.siniflar)[number];
export type Unite = Sinif['uniteler'][number];
export type Bolum = Unite['bolumler'][number];
export type Dosya = Bolum['dosyalar'][number];

/** Takvim satırı: ders/OTP/sosyal haftası ya da tatil. Alanlar türe göre isteğe bağlıdır. */
export interface TakvimSatiri {
  hafta?: number;
  bas: string;
  son: string;
  tarih: string;
  tur: string;
  unite?: number;
  konu?: string;
  sinav?: string;
  tatil_gunleri?: string[];
  ad?: string;
}

export interface Bilgi {
  tur: string;
  tarih?: string;
  konu?: string;
  kitap?: string;
  hedefler?: string[];
  kavramlar?: string[];
  etkinlikler?: string[];
  cikti?: { kod: string; metin: string };
  surec?: string[];
}

export const BICIM: Record<string, { ad: string; not: string }> = {
  pptx: { ad: 'PowerPoint', not: '.pptx' },
  odp: { ad: 'OpenDocument', not: '.odp · LibreOffice, Pardus' },
  docx: { ad: 'Word', not: '.docx' },
  odt: { ad: 'OpenDocument', not: '.odt · LibreOffice, Pardus' },
  pdf: { ad: 'PDF', not: '.pdf' },
};

export const boyut = (bayt: number) =>
  bayt >= 1024 * 1024
    ? `${(bayt / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
    : `${Math.round(bayt / 1024)} KB`;

export const uniteKoku = (s: Sinif, u: Unite) => `/cografya/${s.slug}/${u.slug}`;
export const haftaYolu = (s: Sinif, hafta: number) => `/cografya/${s.slug}/hafta-${hafta}/`;
export const pdfDosyasi = (b: Bolum) => b.dosyalar.find((d) => d.bicim === 'pdf');
export const bilgiOf = (b: Bolum) => (b as { bilgi?: Bilgi }).bilgi;

/** "Ünite adı — ayrıntı" biçimindeki konuyu başlık ve ayrıntıya böler. */
export const konuBol = (konu = '') => {
  const i = konu.indexOf(' — ');
  return i < 0 ? { bas: konu, ayrinti: '' } : { bas: konu.slice(0, i), ayrinti: konu.slice(i + 3) };
};

export interface HaftaKaydi {
  hafta: number;
  takvim: TakvimSatiri;
  unite: Unite;
  bolum: Bolum;
  /** Ünitenin haftalı son bölümü mü (ünite sonu ölçme bu haftaya bağlanır)? */
  uniteninSonu: boolean;
}

/** Sayfası olan haftalar (bölümünde hafta değeri olanlar), hafta sırasıyla. */
export function haftalar(s: Sinif): HaftaKaydi[] {
  const takvim = s.takvim as TakvimSatiri[];
  const kayitlar: HaftaKaydi[] = [];
  for (const u of s.uniteler) {
    const haftali = u.bolumler.filter((b) => b.hafta != null);
    const son = haftali.reduce((m, b) => Math.max(m, b.hafta as number), 0);
    for (const b of haftali) {
      const t = takvim.find((x) => x.hafta === b.hafta);
      if (!t) throw new Error(`Takvimde ${b.hafta}. hafta yok (${u.slug})`);
      kayitlar.push({ hafta: b.hafta as number, takvim: t, unite: u, bolum: b, uniteninSonu: b.hafta === son });
    }
  }
  return kayitlar.sort((a, b) => a.hafta - b.hafta);
}

export const uniteSonu = (u: Unite) => u.bolumler.find((b) => b.hafta == null);

/** Hafta satırının rozetleri; renk tek başına anlam taşımasın diye her rozetin metni vardır. */
export function rozetler(t: TakvimSatiri, uzun = false) {
  const r: { tur: 'otp' | 'sinav' | 'tatil' | 'sosyal'; metin: string; aciklama?: string }[] = [];
  if (t.tur === 'otp') r.push({ tur: 'otp', metin: uzun ? 'Okul temelli planlama' : 'OTP', aciklama: 'Okul temelli planlama haftası' });
  if (t.tur === 'sosyal') r.push({ tur: 'sosyal', metin: 'Sosyal etkinlik' });
  if (t.sinav) r.push({ tur: 'sinav', metin: uzun ? t.sinav : 'Sınav dönemi', aciklama: t.sinav });
  if (t.tatil_gunleri?.length)
    r.push({ tur: 'tatil', metin: `Tatil: ${t.tatil_gunleri.join(', ')}`, aciklama: 'Bu hafta resmî tatil günü var' });
  return r;
}

export const tarihUzun = (iso: string) =>
  new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });

export { veri };
