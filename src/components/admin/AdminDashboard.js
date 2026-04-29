'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const teamStatusLabels = {
  has_team: 'Evet, takımım var',
  will_form: 'Hayır, takımım yok',
  individual: 'Bireysel katılacağım'
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function AdminDashboard({ submissions }) {
  const [busy, setBusy] = useState(false);

  const stats = useMemo(() => {
    const withTeams = submissions.filter((item) => item.teamStatus === 'has_team').length;
    const teamless = submissions.filter((item) => item.teamStatus === 'will_form').length;
    const individual = submissions.filter((item) => item.teamStatus === 'individual').length;

    return { withTeams, teamless, individual };
  }, [submissions]);

  const handleLogout = async () => {
    setBusy(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.reload();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Hackathon Admin</div>
          <h1 className="mt-2 font-display text-4xl font-bold text-white">Başvurular</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
            Başvurular KV/Redis üzerinde tutuluyor. Buradan güncel kayıtları görüntüleyebilir ve CSV olarak dışa aktarabilirsin.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/api/admin/hackathon/export"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/[0.08]"
          >
            CSV İndir
          </a>
          <Button variant="ghost" onClick={handleLogout} disabled={busy}>
            {busy ? 'Çıkış yapılıyor...' : 'Çıkış Yap'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Toplam Başvuru" value={String(submissions.length)} />
        <StatCard label="Takımı Olan" value={String(stats.withTeams)} />
        <StatCard label="Takımı Olmayan" value={String(stats.teamless)} />
        <StatCard label="Bireysel" value={String(stats.individual)} />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/[0.04] text-ink-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Başvuru</th>
                <th className="px-4 py-3 font-medium">İletişim</th>
                <th className="px-4 py-3 font-medium">Takım</th>
                <th className="px-4 py-3 font-medium">Proje fikri</th>
                <th className="px-4 py-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-ink-dim">
                    Henüz kayıt bulunmuyor.
                  </td>
                </tr>
              )}

              {submissions.map((submission) => (
                <tr key={submission.id} className="align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{submission.fullName}</div>
                    <div className="mt-1 text-ink-dim">{submission.university}</div>
                    <div className="text-ink-dim">{submission.department}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-white">{submission.email}</div>
                    <div className="mt-1 text-ink-dim">{submission.phone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-white">
                      {teamStatusLabels[submission.teamStatus] || submission.teamStatus || '-'}
                    </div>
                    <div className="mt-1 text-ink-dim">
                      {submission.teamStatus === 'has_team' && submission.teamSize
                        ? `${submission.teamSize} kişi`
                        : submission.teamStatus === 'will_form'
                          ? 'Etkinlik günü eşleştirilecek'
                          : '-'}
                    </div>
                  </td>
                  <td className="max-w-sm px-4 py-4 text-ink-dim">
                    {submission.projectIdea?.trim() || '-'}
                  </td>
                  <td className="px-4 py-4 text-ink-dim">
                    <div>{formatDate(submission.submittedAt)}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-mute">
                      {submission.status || 'pending'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Operasyon Rehberi</div>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Başvuru akışını nasıl takip edeceksin?</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-dim">
            <div>
              <div className="font-semibold text-white">Başvuru geldi mi nasıl kontrol edilir?</div>
              <p className="mt-1">
                Yeni başvurular bu tabloda en güncelden eskiye sıralanır. Form kaydı KV ve backup katmanları birlikte okunarak listelenir; backup-only kayıtlar da burada görünür.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">CSV nasıl alınır?</div>
              <p className="mt-1">
                Yukarıdaki <span className="font-semibold text-white">CSV İndir</span> butonu tek tıkla tüm başvuruları dışa aktarır. Etkinlik öncesi ve yoğun başvuru saatlerinde yerel bir kopya indirip saklaman iyi olur.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Backup&apos;lar nereden kontrol edilir?</div>
              <p className="mt-1">
                Production ortamında fallback kayıtları Vercel Blob içinde <span className="font-mono text-white">structured-backups/hackathon-applications/</span> klasörüne yazılır. Yerelde aynı kayıtlar <span className="font-mono text-white">data/_structured_backups/hackathon-applications/</span> altında tutulur.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Acil durumda ne yapılır?</div>
              <p className="mt-1">
                Önce bu panelden CSV indir, sonra Vercel Logs&apos;ta <span className="font-mono text-white">/api/hackathon</span> isteklerini kontrol et. Eğer KV tarafında sorun varsa Blob backup klasörünü açıp en yeni kayıtları doğrula; panel normale dönene kadar CSV kopyasını operasyon kaydı olarak kullan.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Hızlı Notlar</div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-dim">
            <p>
              Rate limit, duplicate koruması ve backup fallback aktif. Aynı başvurunun tekrar gelmesi mevcut kaydı ezmez.
            </p>
            <p>
              Form gönderimi başarısız olsa bile katılımcının tarayıcısında taslak korunur; yeniden deneyebilir.
            </p>
            <p>
              Detaylı teknik akış için{' '}
              <a
                href="/admin/operations"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/30 underline-offset-4"
              >
                operasyon notlarını aç
              </a>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <Card className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-ink-dim">{label}</div>
      <div className="mt-3 font-display text-4xl font-bold text-white">{value}</div>
    </Card>
  );
}
