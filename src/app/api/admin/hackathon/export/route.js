import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { toCsv } from '@/lib/csv';
import { readStore } from '@/lib/store';

export const runtime = 'nodejs';

const teamStatusLabels = {
  has_team: 'Evet, takımım var',
  will_form: 'Hayır, takımım yok',
  individual: 'Bireysel katılacağım'
};

const referralLabels = {
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  friend: 'Arkadas',
  university: 'Universite / GDG',
  email: 'E-posta',
  poster: 'Afis / Stand',
  other: 'Diger'
};

const teammatesAppliedLabels = {
  all: 'Tumu basvurdu',
  some: 'Bir kismi basvurdu',
  none: 'Hicbiri basvurmadi',
  unsure: 'Emin degil'
};

export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const allItems = await readStore('hackathon-applications.json');
  const items = allItems.filter((item) => item && !item.deletedAt);
  const rows = [
    [
      'ID',
      'Ad Soyad',
      'Universite',
      'Bolum',
      'E-posta',
      'Telefon',
      'Takim Durumu',
      'Takim Boyutu',
      'Takim Arkadaslari Basvurdu mu',
      'Proje Fikri',
      'Bizi Nereden Duydu',
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
      item.email,
      item.phone,
      teamStatusLabels[item.teamStatus] || item.teamStatus || '',
      item.teamSize || '',
      teammatesAppliedLabels[item.teammatesApplied] || item.teammatesApplied || '',
      item.projectIdea || '',
      referralLabels[item.referralSource] || item.referralSource || '',
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
