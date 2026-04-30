'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useApp } from '@/context/AppContext';

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

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function AdminDashboard({ submissions: initialSubmissions }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [busy, setBusy] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const [confirmText, setConfirmText] = useState('');
  const { showToast } = useApp();

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

  const openDeleteModal = (item) => {
    setDeleteModal({ open: true, item });
    setConfirmText('');
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, item: null });
    setConfirmText('');
  };

  const handleDelete = async () => {
    if (confirmText !== 'SİL') {
      showToast({ type: 'error', title: 'Hata', message: 'Lütfen onaylamak için SİL yazın.' });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/admin/hackathon', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: deleteModal.item.id,
          email: deleteModal.item.email,
          clientSubmissionId: deleteModal.item.clientSubmissionId
        })
      });

      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== deleteModal.item.id));
        showToast({ title: 'Başarılı', message: 'Başvuru silindi.' });
        closeDeleteModal();
      } else {
        const json = await res.json();
        showToast({ type: 'error', title: 'Hata', message: json.message || 'Silme işlemi başarısız.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Hata', message: 'Bir ağ hatası oluştu.' });
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
            Başvurular KV/Redis üzerinde tutuluyor. Buradan güncel kayıtları görüntüleyebilir, silebilir ve CSV olarak dışa aktarabilirsin.
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
                <th className="px-4 py-3 font-medium">Detaylar</th>
                <th className="px-4 py-3 font-medium">Tarih</th>
                <th className="px-4 py-3 font-medium">İşlem</th>
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
                <tr key={submission.id} className="align-top hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{submission.fullName}</div>
                    <div className="mt-1 text-ink-dim text-xs">{submission.university}</div>
                    <div className="text-ink-dim text-xs">{submission.department}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-white">{submission.email}</div>
                    <div className="mt-1 text-ink-dim">{submission.phone}</div>
                    <div className="mt-1 text-[10px] text-ink-mute uppercase tracking-wider">Kaynak: {sourceLabels[submission.source] || submission.source || '-'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-white">
                      {teamStatusLabels[submission.teamStatus] || submission.teamStatus || '-'}
                    </div>
                    <div className="mt-1 text-ink-dim">
                      {submission.teamStatus === 'has_team' && submission.teamSize
                        ? `${submission.teamSize} kişi`
                        : submission.teamStatus === 'will_form'
                          ? 'Eşleştirilecek'
                          : '-'}
                    </div>
                    {submission.teammatesApplied && (
                      <div className="mt-1 text-[10px] text-primary">
                        {teammatesAppliedLabels[submission.teammatesApplied]}
                      </div>
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-4 text-ink-dim text-xs leading-relaxed">
                    {submission.projectIdea?.trim() || '-'}
                  </td>
                  <td className="px-4 py-4 text-ink-dim text-xs whitespace-nowrap">
                    <div>{formatDate(submission.submittedAt)}</div>
                    <div className="mt-1 uppercase tracking-[0.16em] text-ink-mute">
                      {submission.status || 'pending'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openDeleteModal(submission)}
                      className="p-2 text-ink-dim hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                      title="Sil"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        title="Başvuruyu Sil"
        subtitle={`${deleteModal.item?.fullName} isimli katılımcının başvurusunu silmek üzeresiniz. Bu işlem geri alınamaz.`}
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-dim">
            Silme işlemini onaylamak için lütfen aşağıya büyük harflerle <span className="font-bold text-white">SİL</span> yazın.
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="SİL"
            className="bg-white/5 border-white/10 text-center text-lg font-bold tracking-widest"
          />
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={closeDeleteModal} disabled={busy}>İptal</Button>
            <Button 
              variant="danger" 
              className="flex-1 bg-red-500 hover:bg-red-600 border-none" 
              onClick={handleDelete} 
              disabled={busy || confirmText !== 'SİL'}
            >
              {busy ? 'Siliniyor...' : 'Evet, Kalıcı Olarak Sil'}
            </Button>
          </div>
        </div>
      </Modal>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Operasyon Rehberi</div>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Başvuru akışını nasıl takip edeceksin?</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-dim">
            <div>
              <div className="font-semibold text-white">Başvuru geldi mi nasıl kontrol edilir?</div>
              <p className="mt-1">
                Yeni başvurular bu tabloda en güncelden eskiye sıralanır. Form kaydı KV ve backup katmanları birlikte okunarak listelenir.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Silme işlemi güvenli mi?</div>
              <p className="mt-1">
                Silme işlemi KV üzerindeki kaydı ve benzersizlik kısıtlamalarını (email) temizler. Böylece hatalı başvurular silindiğinde kullanıcı aynı email ile tekrar başvurabilir.
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Hızlı Notlar</div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-dim">
            <p>
              Fiziksel katılım uyarısı formun sol tarafında katılımcılara gösteriliyor.
            </p>
            <p>
              "SİL" doğrulaması kazara silmeleri önlemek için eklenmiştir.
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
