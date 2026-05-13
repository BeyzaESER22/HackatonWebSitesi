import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { toCsv } from '@/lib/csv';
import { readStore } from '@/lib/store';

export const runtime = 'nodejs';

const dayLabels = {
  day_1: 'Sadece 1. Gun',
  day_2: 'Sadece 2. Gun',
  both: 'Iki Gun'
};

const profileLabels = {
  student: 'Ogrenci',
  academic: 'Akademisyen / Egitmen',
  professional: 'Profesyonel',
  entrepreneur: 'Girisimci',
  sponsor: 'Sponsor / Partner',
  other: 'Diger'
};

const interestLabels = {
  workshops: 'Workshoplar',
  panels: 'Paneller',
  stands: 'Standlar',
  all: 'Tumu'
};

const aiExperienceLabels = {
  beginner: 'Baslangic',
  intermediate: 'Orta seviye',
  advanced: 'Ileri seviye',
  not_sure: 'Emin degil'
};

function getInterests(item) {
  if (Array.isArray(item.interests) && item.interests.length > 0) {
    return item.interests;
  }
  return item.participationType ? [item.participationType] : [];
}

export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const items = await readStore('attendees.json');
  const rows = [
    [
      'ID',
      'Ad Soyad',
      'E-posta',
      'Telefon',
      'Universite / Kurum',
      'Ziyaretci Profili',
      'Katilim Gunleri',
      'Ilgi Alanlari',
      'AI Deneyim Seviyesi',
      'KVKK Bilgilendirme Onayi',
      'Etkinlik Iletisim Onayi',
      'Davranis Kurallari Onayi',
      'Kayit Tarihi'
    ]
  ];

  for (const item of items) {
    const interests = getInterests(item)
      .map((interest) => interestLabels[interest] || interest)
      .join('; ');

    rows.push([
      item.id,
      item.fullName,
      item.email,
      item.phone,
      item.university || '',
      profileLabels[item.visitorProfile] || item.visitorProfile || '',
      dayLabels[item.daysAttending] || item.daysAttending || '',
      interests,
      aiExperienceLabels[item.aiExperience] || item.aiExperience || '',
      item.kvkkNoticeAccepted ? 'Evet' : 'Hayir',
      item.eventContactAccepted ? 'Evet' : 'Hayir',
      item.rulesAccepted ? 'Evet' : 'Hayir',
      item.registeredAt || ''
    ]);
  }

  const csv = toCsv(rows);
  const fileName = `visitor-registrations-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(`\uFEFF${csv}`, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store'
    }
  });
}
