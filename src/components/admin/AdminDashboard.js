'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/helpers';

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
  grad: 'Yüksek Lisans / Mezun'
};

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function AdminDashboard({ submissions: initialSubmissions, projects: initialProjects }) {
  const [activeTab, setActiveTab] = useState('hackathon'); // 'hackathon' or 'projects'
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [busy, setBusy] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null, type: null });
  const [confirmText, setConfirmText] = useState('');
  const { showToast } = useApp();

  const stats = useMemo(() => {
    const withTeams = submissions.filter((item) => item.teamStatus === 'has_team').length;
    const teamless = submissions.filter((item) => item.teamStatus === 'will_form').length;
    const individual = submissions.filter((item) => item.teamStatus === 'individual').length;

    const approvedProjects = projects.filter(p => p.status === 'approved').length;
    const pendingProjects = projects.filter(p => p.status === 'pending').length;

    return { withTeams, teamless, individual, approvedProjects, pendingProjects };
  }, [submissions, projects]);

  const handleLogout = async () => {
    setBusy(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.reload();
    } finally {
      setBusy(false);
    }
  };

  const openDeleteModal = (item, type) => {
    setDeleteModal({ open: true, item, type });
    setConfirmText('');
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, item: null, type: null });
    setConfirmText('');
  };

  const handleDelete = async () => {
    if (confirmText !== 'SİL') {
      showToast({ type: 'error', title: 'Hata', message: 'Lütfen onaylamak için SİL yazın.' });
      return;
    }

    setBusy(true);
    const isProject = deleteModal.type === 'project';
    const endpoint = isProject ? '/api/admin/projects' : '/api/admin/hackathon';
    
    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: deleteModal.item.id,
          email: deleteModal.item.email || deleteModal.item.contactEmail,
          clientSubmissionId: deleteModal.item.clientSubmissionId
        })
      });

      if (res.ok) {
        if (isProject) {
          setProjects(prev => prev.filter(s => s.id !== deleteModal.item.id));
        } else {
          setSubmissions(prev => prev.filter(s => s.id !== deleteModal.item.id));
        }
        showToast({ title: 'Başarılı', message: 'Kayıt silindi.' });
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

  const handleUpdateProjectStatus = async (id, status) => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
        showToast({ title: 'Başarılı', message: `Proje durumu: ${status}` });
      } else {
        showToast({ type: 'error', title: 'Hata', message: 'Güncelleme yapılamadı.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Hata', message: 'Bir ağ hatası oluştu.' });
    } finally {
      setBusy(false);
    }
  };

  const handleBulkUpdateStatus = async (status) => {
    if (selectedProjectIds.length === 0) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedProjectIds, status })
      });

      if (res.ok) {
        setProjects(prev => prev.map(p => 
          selectedProjectIds.includes(p.id) ? { ...p, status } : p
        ));
        setSelectedProjectIds([]);
        showToast({ title: 'Başarılı', message: `${selectedProjectIds.length} proje ${status} olarak güncellendi.` });
      } else {
        showToast({ type: 'error', title: 'Hata', message: 'Toplu güncelleme başarısız.' });
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Hata', message: 'Bir ağ hatası oluştu.' });
    } finally {
      setBusy(false);
    }
  };

  const toggleProjectSelection = (id) => {
    setSelectedProjectIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAllProjects = () => {
    if (selectedProjectIds.length === projects.length && projects.length > 0) {
      setSelectedProjectIds([]);
    } else {
      setSelectedProjectIds(projects.map(p => p.id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Yönetim Paneli</div>
          <h1 className="mt-2 font-display text-4xl font-bold text-white">
            {activeTab === 'hackathon' ? 'Hackathon Başvuruları' : 'Demo Day Projeleri'}
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10 sm:mr-4">
            <button 
              onClick={() => setActiveTab('hackathon')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activeTab === 'hackathon' ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
            >
              Başvurular
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activeTab === 'projects' ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
            >
              Projeler
            </button>
          </div>
          <Button variant="ghost" onClick={handleLogout} disabled={busy}>
            {busy ? 'Çıkış yapılıyor...' : 'Çıkış Yap'}
          </Button>
        </div>
      </div>

      {activeTab === 'hackathon' ? (
        <>
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
                        <div className="text-ink-dim text-xs">
                          {submission.department} 
                          {submission.grade && <span className="ml-1 opacity-60">({gradeLabels[submission.grade] || submission.grade})</span>}
                        </div>
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
                          onClick={() => openDeleteModal(submission, 'hackathon')}
                          className="p-2 text-ink-dim hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard label="Toplam Proje" value={String(projects.length)} />
            <StatCard label="Onaylı" value={String(stats.approvedProjects)} />
            <StatCard label="Bekleyen" value={String(stats.pendingProjects)} />
            <div className="flex items-center">
               {selectedProjectIds.length > 0 && (
                 <div className="flex-1 flex gap-2 animate-in zoom-in-95 duration-200">
                   <Button size="sm" className="flex-1 !py-3" onClick={() => handleBulkUpdateStatus('approved')}>
                     Seçili ({selectedProjectIds.length}) Onayla
                   </Button>
                   <Button size="sm" variant="ghost" className="!py-3 border-red-500/30 text-red-400" onClick={() => handleBulkUpdateStatus('rejected')}>
                     Reddet
                   </Button>
                 </div>
               )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/[0.04] text-ink-dim">
                  <tr>
                    <th className="px-4 py-3 w-10 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/5"
                        checked={projects.length > 0 && selectedProjectIds.length === projects.length}
                        onChange={toggleSelectAllProjects}
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">Proje</th>
                    <th className="px-4 py-3 font-medium">Ekip & İletişim</th>
                    <th className="px-4 py-3 font-medium">Tech & Linkler</th>
                    <th className="px-4 py-3 font-medium">Durum</th>
                    <th className="px-4 py-3 font-medium">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-ink-dim">
                        Henüz proje gönderimi bulunmuyor.
                      </td>
                    </tr>
                  )}

                  {projects.map((project) => (
                    <tr key={project.id} className={cn(
                      "align-top hover:bg-white/[0.02] transition-colors",
                      selectedProjectIds.includes(project.id) && "bg-white/[0.05]"
                    )}>
                      <td className="px-4 py-4 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-white/20 bg-white/5"
                          checked={selectedProjectIds.includes(project.id)}
                          onChange={() => toggleProjectSelection(project.id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">{project.title}</div>
                        <div className="mt-1 text-primary text-[10px] font-bold uppercase">{project.categoryLabel}</div>
                        <div className="mt-2 text-ink-dim text-xs leading-relaxed max-w-xs">
                          {project.shortDescription}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-white">{project.team?.name}</div>
                        <div className="mt-1 text-ink-dim text-xs">
                          {project.team?.members?.map(m => m.name).join(', ')}
                        </div>
                        <div className="mt-2 text-ink-mute text-xs italic">{project.contactEmail}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.techStack?.map(t => (
                            <span key={t} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-ink-dim">{t}</span>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-3">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-google-blue hover:underline text-xs">GitHub</a>
                          )}
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-google-blue hover:underline text-xs">Demo</a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                         <select 
                           value={project.status} 
                           onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
                           className={cn(
                             "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-transparent border outline-none",
                             project.status === 'approved' ? "text-green-400 border-green-400/30" : 
                             project.status === 'pending' ? "text-yellow-400 border-yellow-400/30" : 
                             "text-red-400 border-red-400/30"
                           )}
                         >
                           <option value="pending" className="bg-[#05071A]">Pending</option>
                           <option value="approved" className="bg-[#05071A]">Approved</option>
                           <option value="rejected" className="bg-[#05071A]">Rejected</option>
                         </select>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => openDeleteModal(project, 'project')}
                          className="p-2 text-ink-dim hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <Modal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        title="Kaydı Sil"
        subtitle={`${deleteModal.item?.fullName || deleteModal.item?.title} kaydını silmek üzeresiniz. Bu işlem geri alınamaz.`}
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
