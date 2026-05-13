import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { toCsv } from '@/lib/csv';
import { readStore } from '@/lib/store';

export const runtime = 'nodejs';

const teamStatusLabels = {
  has_team: 'Evet, takımım var',
  will_form: 'Hayır, takımım yok',
  individual: 'Bireysel katılacağım'
};

const teammatesAppliedLabels = {
  yes: 'Hepsi başvurdu',
  no: 'Henüz başvurmadılar',
  waiting: 'Bekleniyor'
};

const sourceLabels = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  club: 'Üniversite Kulübü',
  whatsapp: 'WhatsApp Grupları',
  friend: 'Arkadaş Tavsiyesi',
  other: 'Diğer'
};

const gradeLabels = {
  prep: 'Hazırlık',
  '1': '1. Sınıf',
  '2': '2. Sınıf',
  '3': '3. Sınıf',
  '4': '4. Sınıf',
  '5': '5. Sınıf',
  '6': '6. Sınıf',
  grad: 'Yüksek Lisans / Mezun',
  grad_recent: 'Mezun - Son 12 Ay İçinde',
  postgraduate: 'Yüksek Lisans / Doktora'
};

const parkingLabels = {
  yes: 'Evet',
  no: 'Hayır'
};

export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const items = await readStore('hackathon-applications.json');
  const rows = [
    [
      'ID',
      'Ad Soyad',
      'Universite',
      'Bolum',
      'Sinif',
      'E-posta',
      'Telefon',
      'Takim Durumu',
      'Takim Boyutu',
      'Arkadaslar Basvurdu mu?',
      'Sahsi Arac',
      'Arac Plakasi',
      'Belge URL',
      'Belge Adi',
      'Bizi Nereden Duydu?',
      'Proje Fikri',
      'KVKK Bilgilendirme Onayi',
      'Acik Riza Beyani',
      'Veri Saklama Onayi',
      'Durum',
      'Basvuru Tarihi'
    ]
  ];

  for (const item of items) {
    rows.push([
      item.id,
      item.fullName,
      item.university,
      item.department,
      gradeLabels[item.grade] || item.grade || '',
      item.email,
      item.phone,
      teamStatusLabels[item.teamStatus] || item.teamStatus || '',
      item.teamSize || '',
      item.teammatesApplied ? (teammatesAppliedLabels[item.teammatesApplied] || item.teammatesApplied) : '',
      parkingLabels[item.parkingNeeded] || item.parkingNeeded || '',
      item.licensePlate || '',
      item.document?.url || '',
      item.document?.fileName || '',
      item.source ? (sourceLabels[item.source] || item.source) : '',
      item.projectIdea || '',
      item.kvkkNoticeAccepted ? 'Evet' : 'Hayır',
      item.explicitConsentAccepted ? 'Evet' : 'Hayır',
      item.dataRetentionAccepted ? 'Evet' : 'Hayır',
      item.status || 'pending',
      item.submittedAt || ''
    ]);
  }

  const csv = toCsv(rows);
  const fileName = `hackathon-applications-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(`\uFEFF${csv}`, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store'
    }
  });
}
