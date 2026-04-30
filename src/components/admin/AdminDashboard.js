'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

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
  friend: 'Arkadaş',
  university: 'Üniversite / GDG',
  email: 'E-posta',
  poster: 'Afiş / Stand',
  other: 'Diğer'
};

const teammatesAppliedLabels = {
  all: 'Tümü başvurdu',
  some: 'Bir kısmı başvurdu',
  none: 'Hiçbiri başvurmadı',
  unsure: 'Emin değil'
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function AdminDashboard({ submissions, deletedCount = 0 }) {
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <StatCard label="Toplam Başvuru" value={String(submissions.length)} />
        <StatCard label="Takımı Olan" value={String(stats.withTeams)} />
        <StatCard label="Takımı Olmayan" value={String(stats.teamless)} />
        <StatCard label="Bireysel" value={String(stats.individual)} />
        <StatCard label="Arşivlenen" value={String(deletedCount)} />
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
                <th className="px-4 py-3 font-medium text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-ink-dim">
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
                    {submission.teamStatus === 'has_team' && submission.teammatesApplied && (
                      <div className="mt-1 text-xs text-ink-mute">
                        Arkadaşları:{' '}
                        {teammatesAppliedLabels[submission.teammatesApplied] ||
                          submission.teammatesApplied}
                      </div>
                    )}
                  </td>
                  <td className="max-w-sm px-4 py-4 text-ink-dim">
                    {submission.projectIdea?.trim() || '-'}
                  </td>
                  <td className="px-4 py-4 text-ink-dim">
                    <div>{formatDate(submission.submittedAt)}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-mute">
                      {submission.status || 'pending'}
                    </div>
                    {submission.referralSource && (
                      <div className="mt-1 text-xs text-ink-mute">
                        Kaynak:{' '}
                        {referralLabels[submission.referralSource] || submission.referralSource}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(submission)}
                      className="inline-flex items-center justify-center rounded-full border border-google-red/40 bg-google-red/10 px-4 py-2 text-xs font-semibold text-[#FFB1B1] transition hover:border-google-red/60 hover:bg-google-red/20 hover:text-white"
                    >
                      Sil
                    </button>
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
              <span className="font-semibold text-white">Silme:</span> 2 aşamalı doğrulama gerekir. Şifre yeniden istenir ve başvuranın e-posta adresini eksiksiz yazman gerekir. İşlem soft-delete&apos;tir; kayıt panelden gizlenir, dedupe/unique key&apos;ler korunur (aynı kişi yeniden başvuramaz).
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

      {deleteTarget && (
        <DeleteConfirmModal
          submission={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={() => {
            setDeleteTarget(null);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

function DeleteConfirmModal({ submission, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const expectedEmail = (submission.email || '').trim().toLowerCase();
  const typedEmail = emailConfirmation.trim().toLowerCase();
  const emailMatches = expectedEmail.length > 0 && typedEmail === expectedEmail;
  const canSubmit = password.length > 0 && emailMatches && !busy;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/admin/hackathon/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: submission.id,
          password,
          emailConfirmation: typedEmail
        })
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || 'Silme başarısız oldu.');
        return;
      }

      onSuccess();
    } catch {
      setError('Sunucuya ulaşılamadı.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur"
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#101736_0%,#0A102A_100%)] p-7 shadow-soft">
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-google-red">
          Geri alınamaz işlem
        </div>
        <h2 className="font-display text-2xl font-bold text-white">Başvuruyu sil</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-white">{submission.fullName}</span> adlı katılımcının
          başvurusunu silmek üzeresin. Bu işlem 2 aşamalı doğrulama gerektirir: önce admin
          şifresini tekrar gir, sonra başvuranın e-posta adresini eksiksiz yaz.
        </p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
          <div className="text-ink-dim">Başvuran e-postası:</div>
          <div className="mt-1 break-all font-mono text-white">{submission.email}</div>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="delete-password"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-ink-dim"
            >
              1. Admin şifresi
            </label>
            <input
              id="delete-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin şifreni tekrar gir"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition focus:border-[#7C8BFF] focus:bg-white/[0.08]"
              disabled={busy}
              autoComplete="current-password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="delete-email"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-ink-dim"
            >
              2. Başvuranın e-postasını yaz
            </label>
            <input
              id="delete-email"
              type="text"
              value={emailConfirmation}
              onChange={(e) => setEmailConfirmation(e.target.value)}
              placeholder={submission.email}
              className={`w-full rounded-2xl border bg-white/[0.05] px-4 py-3 font-mono text-white outline-none transition ${
                emailConfirmation.length === 0
                  ? 'border-white/10 focus:border-[#7C8BFF] focus:bg-white/[0.08]'
                  : emailMatches
                    ? 'border-google-green/50 focus:border-google-green'
                    : 'border-google-red/50 focus:border-google-red'
              }`}
              disabled={busy}
              autoComplete="off"
              spellCheck="false"
              required
            />
            {emailConfirmation.length > 0 && !emailMatches && (
              <p className="mt-2 text-xs text-google-red">
                E-posta eşleşmiyor. Aynen yazman gerekiyor.
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-google-red/40 bg-google-red/10 px-4 py-3 text-sm text-[#FFB1B1]">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={busy}
            >
              İptal
            </Button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-google-red/50 bg-google-red/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-google-red/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? 'Siliniyor...' : 'Başvuruyu sil'}
            </button>
          </div>
        </form>
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
