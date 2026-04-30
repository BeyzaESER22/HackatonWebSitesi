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
      'E-posta',
      'Telefon',
      'Takim Durumu',
      'Takim Boyutu',
      'Arkadaslar Basvurdu mu?',
      'Bizi Nereden Duydu?',
      'Proje Fikri',
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
      item.teammatesApplied ? (teammatesAppliedLabels[item.teammatesApplied] || item.teammatesApplied) : '',
      item.source || '',
      item.projectIdea || '',
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
