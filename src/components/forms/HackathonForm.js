'use client';
import { useEffect, useState } from 'react';
import { FileInput, Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';
import { UPLOAD_LIMITS } from '@/lib/constants';

const DRAFT_KEY = 'hf26_hackathon_form_draft';
const SUBMISSION_KEY_STORAGE = 'hf26_hackathon_submission_key';

const initial = {
  fullName: '', university: '', department: '', grade: '', email: '',
  phone: '', teamStatus: '', teamSize: '', teammatesApplied: '', 
  source: '', projectIdea: '', parkingNeeded: '', licensePlate: '',
  kvkkNoticeAccepted: false, explicitConsentAccepted: false, dataRetentionAccepted: false,
  website: ''
};

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function HackathonForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [studentDocument, setStudentDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { showToast } = useApp();

  const fieldClassName =
    'rounded-2xl border-white/10 bg-white/[0.05] px-5 py-3.5 text-base text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-300 w-full';

  const update = (k) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [k]: value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const updateCheckbox = (k) => (e) => {
    const checked = e.target.checked;
    setForm((prev) => ({ ...prev, [k]: checked }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const updateParking = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      parkingNeeded: value,
      licensePlate: value === 'yes' ? prev.licensePlate : ''
    }));
    setErrors((prev) => ({
      ...prev,
      parkingNeeded: undefined,
      licensePlate: undefined
    }));
  };

  const updateTeamStatus = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      teamStatus: value,
      teamSize: value === 'has_team' ? prev.teamSize : '',
      teammatesApplied: value === 'has_team' ? prev.teammatesApplied : ''
    }));
    setErrors((prev) => ({
      ...prev,
      teamStatus: undefined,
      teamSize: undefined,
      teammatesApplied: undefined
    }));
  };

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        const merged = { ...initial, ...parsed };
        setForm(merged);
      }
      const savedSubmissionId = window.localStorage.getItem(SUBMISSION_KEY_STORAGE);
      const nextSubmissionId = savedSubmissionId || createSubmissionId();
      setSubmissionId(nextSubmissionId);
      if (!savedSubmissionId) {
        window.localStorage.setItem(SUBMISSION_KEY_STORAGE, nextSubmissionId);
      }
    } catch {
      setSubmissionId(createSubmissionId());
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const submit = async (e, retryCount = 0) => {
    if (e) e.preventDefault();
    if (!studentDocument) {
      setErrors((prev) => ({ ...prev, studentDocument: 'Öğrenci veya mezuniyet belgesi yüklenmelidir.' }));
      showToast({
        type: 'error',
        title: 'Belge zorunlu',
        message: 'Lütfen PDF formatında öğrenci veya mezuniyet belgenizi ekleyin.'
      });
      return;
    }

    setBusy(true);
    setErrors({});
    
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, typeof value === 'boolean' ? String(value) : value);
      });
      fd.append('clientSubmissionId', submissionId || createSubmissionId());
      fd.append('studentDocument', studentDocument);

      const res = await fetch('/api/hackathon', {
        method: 'POST',
        body: fd
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        if (res.status === 429) {
          showToast({ type: 'error', title: 'Biraz bekle', message: json.message });
          setBusy(false);
          return;
        }
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({
          type: 'error',
          title: 'Form gönderilemedi',
          message: json.message || 'Lütfen alanları kontrol edin.'
        });
        setBusy(false);
        return;
      }

      const nextSubmissionId = createSubmissionId();
      try {
        window.localStorage.removeItem(DRAFT_KEY);
        window.localStorage.setItem(SUBMISSION_KEY_STORAGE, nextSubmissionId);
      } catch {}
      setSubmissionId(nextSubmissionId);
      setForm(initial);
      setStudentDocument(null);
      showToast({
        title: 'Başvurun alındı!',
        message: 'Kaydın başarıyla tamamlandı.'
      });
      onSuccess?.();
    } catch (err) {
      if (retryCount < 2) {
        const delay = (retryCount + 1) * 2000;
        showToast({ 
          type: 'info', 
          title: 'Bağlantı sorunu', 
          message: `Tekrar deneniyor... (${retryCount + 1}/2)` 
        });
        setTimeout(() => submit(null, retryCount + 1), delay);
      } else {
        showToast({
          type: 'error',
          title: 'Gönderim başarısız',
          message: 'Bağlantı sorunu yaşandı. Lütfen internetini kontrol et.'
        });
        setBusy(false);
      }
    }
  };

  return (
    <form onSubmit={(e) => submit(e)} noValidate className="space-y-10">
      {/* Honeypot field - Visually hidden */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0', opacity: 0, zIndex: -1 }} aria-hidden="true">
        <input 
          type="text" 
          name="website" 
          tabIndex="-1" 
          value={form.website || ''} 
          onChange={update('website')} 
          autoComplete="off" 
        />
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Kişisel Bilgiler</h4>
        <div className="grid grid-cols-1 gap-6">
          {/* Row 1: Name */}
          <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
          
          {/* Row 2: University & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
            <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
          </div>

          {/* Row 3: Grade & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label="Sınıf *" name="grade" value={form.grade} onChange={update('grade')} error={errors.grade} className={cn(fieldClassName, 'pr-12')} required>
              <option value="">Seçiniz...</option>
              <option value="prep">Hazırlık</option>
              <option value="1">1. Sınıf</option>
              <option value="2">2. Sınıf</option>
              <option value="3">3. Sınıf</option>
              <option value="4">4. Sınıf</option>
              <option value="grad_recent">Mezun (Son 12 Ay İçinde)</option>
              <option value="postgraduate">Yüksek Lisans / Doktora</option>
            </Select>
            <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
          </div>

          {/* Row 4: Email (Centered) */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
              <p className="mt-2 text-[10px] text-primary leading-tight italic">
                <strong>Not:</strong> Google AI Studio kredilerini talep edebilmeniz için <strong>Gmail</strong> hesabı kullanmanız gerekmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Ulaşım ve Otopark</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Etkinlik alanına şahsi aracınızla mı geleceksiniz? *"
            name="parkingNeeded"
            value={form.parkingNeeded}
            onChange={updateParking}
            error={errors.parkingNeeded}
            className={cn(fieldClassName, 'pr-12')}
            required
          >
            <option value="">Seçiniz...</option>
            <option value="yes">Evet</option>
            <option value="no">Hayır</option>
          </Select>

          {form.parkingNeeded === 'yes' && (
            <Input
              label="Araç Plakası *"
              name="licensePlate"
              value={form.licensePlate}
              onChange={update('licensePlate')}
              placeholder="34 ABC 123"
              error={errors.licensePlate}
              className={fieldClassName}
              required
            />
          )}
        </div>
        <p className="text-xs text-ink-dim leading-relaxed">
          Plaka bilgisi yalnızca kampüs/etkinlik alanı giriş ve otopark planlama süreçleri için kullanılacaktır.
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Katılım Bilgileri</h4>
        <div className="space-y-6">
          <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="has_team">Evet, bir takımım var</option>
            <option value="will_form">Hayır, bir takımım yok (Eşleşmek istiyorum)</option>
          </Select>

          {form.teamStatus === 'has_team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <Select label="Takımda kaç kişisiniz? *" name="teamSize" value={form.teamSize} onChange={update('teamSize')} error={errors.teamSize} className={cn(fieldClassName, 'pr-12')} required>
                <option value="">Seçiniz...</option>
                <option value="2">2 kişi</option>
                <option value="3">3 kişi</option>
                <option value="4">4 kişi</option>
                <option value="5">5 kişi</option>
              </Select>
              <Select label="Arkadaşlarınız başvurdu mu? *" name="teammatesApplied" value={form.teammatesApplied} onChange={update('teammatesApplied')} error={errors.teammatesApplied} className={cn(fieldClassName, 'pr-12')} required>
                <option value="">Seçiniz...</option>
                <option value="yes">Evet, hepimiz başvurduk</option>
                <option value="no">Henüz başvurmadılar</option>
                <option value="waiting">Onların başvurmasını bekliyorum</option>
              </Select>
            </div>
          )}

          <Select label="Bizi nereden duydunuz? *" name="source" value={form.source} onChange={update('source')} error={errors.source} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="club">Üniversite Kulübü</option>
            <option value="whatsapp">WhatsApp Grupları</option>
            <option value="friend">Arkadaş Tavsiyesi</option>
            <option value="other">Diğer</option>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Öğrenci / Mezuniyet Doğrulaması</h4>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <FileInput
            label="Öğrenci veya Mezuniyet Belgesi (PDF) *"
            name="studentDocument"
            accept={UPLOAD_LIMITS.hackathonDocument.types.join(',')}
            maxBytes={UPLOAD_LIMITS.hackathonDocument.maxBytes}
            hint="e-Devlet barkodlu PDF — max 10MB"
            file={studentDocument}
            onFile={(file) => {
              setStudentDocument(file);
              setErrors((prev) => (prev.studentDocument ? { ...prev, studentDocument: undefined } : prev));
            }}
            error={errors.studentDocument}
          />
          <div className="mt-4 space-y-3 text-xs text-ink-dim leading-relaxed">
            <p>
              Katılım şartlarını doğrulamak için e-Devlet üzerinden alınan barkodlu öğrenci belgesi veya son 12 ay içinde mezun olduğunuzu gösteren barkodlu yükseköğretim mezun belgesi yükleyiniz.
            </p>
            <p>
              Veri minimizasyonu kapsamında T.C. Kimlik Numaranızı, doğrulama için gerekli barkod, ad-soyad, üniversite, bölüm ve eğitim durumu alanları okunur kalacak şekilde maskeleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Proje</h4>
        <div className="space-y-4">
          <Textarea
            label="Proje Fikri (Opsiyonel)"
            name="projectIdea"
            rows={4}
            value={form.projectIdea}
            onChange={update('projectIdea')}
            placeholder="Aklındaki proje fikrini kısaca anlatabilirsin."
            error={errors.projectIdea}
            className={cn(fieldClassName, 'min-h-[120px] resize-none')}
          />
          <p className="text-xs text-white/50 leading-relaxed italic">
            Bu aşamada fikir belirtmek <strong className="text-white/80">opsiyoneldir</strong>. Yarışma teması, önden kodlama avantajı oluşmaması için etkinlik günü açıklanacaktır. Detaylı bilgi için <a href="/hackathon#themes" className="text-primary underline">bu kısmı</a> inceleyebilirsiniz.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">KVKK ve Veri İşleme Bilgilendirmesi</h4>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 space-y-5">
          <div className="space-y-4 text-xs md:text-sm text-ink-dim leading-relaxed">
            <p>
              Başvuru formunda paylaştığınız kişisel veriler, Build with AI Hackathon başvuru, değerlendirme, katılımcı seçimi, ekip planlaması, etkinlik organizasyonu, güvenlik/doğrulama süreçleri ve etkinlik iletişiminin yürütülmesi amacıyla, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenecektir.
            </p>
            <p>
              Bu form aracılığıyla ad-soyad, üniversite, bölüm, sınıf/eğitim durumu, iletişim bilgileri, teknik yetkinlikler, ekip/katılım tercihleri, ulaşım ve otopark bilgileri ile gerekli hallerde öğrenci veya mezuniyet durumunuzu doğrulamaya yönelik belgeler toplanabilir.
            </p>
            <p>
              Kişisel verileriniz, etkinliğin gerçekleştirilmesi için gerekli olan durumlar dışında üçüncü taraflarla paylaşılmayacaktır. Zorunlu hallerde yalnızca organizasyon ekibi, etkinlik paydaşları, kampüs/tesis güvenliği, teknik hizmet sağlayıcılar veya yetkili kamu kurum ve kuruluşları ile, ilgili amaçla sınırlı ve mevzuata uygun şekilde paylaşılabilir.
            </p>
            <p>
              Verileriniz yalnızca başvuru ve etkinlik süreçleri için gerekli süre boyunca saklanacak; sürecin tamamlanmasının ardından ilgili mevzuata uygun şekilde silinecek, yok edilecek veya anonim hale getirilecektir.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <ConsentCheckbox
              name="kvkkNoticeAccepted"
              checked={form.kvkkNoticeAccepted}
              onChange={updateCheckbox('kvkkNoticeAccepted')}
              error={errors.kvkkNoticeAccepted}
            >
              Kişisel verilerimin; hackathon başvuru sürecinin yürütülmesi, katılım uygunluğunun doğrulanması, etkinlik organizasyonu, güvenlik/kampüs giriş işlemleri ve gerekli iletişim süreçlerinin yürütülmesi amacıyla işleneceği konusunda bilgilendirildim.
            </ConsentCheckbox>

            <ConsentCheckbox
              name="explicitConsentAccepted"
              checked={form.explicitConsentAccepted}
              onChange={updateCheckbox('explicitConsentAccepted')}
              error={errors.explicitConsentAccepted}
            >
              Yüklediğim belgenin doğruluğunu, etkinlik katılım şartlarına uygun olduğumu ve organizasyon komitesinin gerekli hallerde belge doğrulaması yapabileceğini kabul ve beyan ederim.
            </ConsentCheckbox>

            <ConsentCheckbox
              name="dataRetentionAccepted"
              checked={form.dataRetentionAccepted}
              onChange={updateCheckbox('dataRetentionAccepted')}
              error={errors.dataRetentionAccepted}
            >
              Başvuru kapsamında paylaştığım kişisel verilerin yalnızca etkinlik organizasyonu ve doğrulama süreçleriyle sınırlı olarak saklanacağını; etkinlik ve makul değerlendirme süreci tamamlandıktan sonra ilgili mevzuata uygun şekilde silinebileceğini, yok edilebileceğini veya anonim hale getirilebileceğini anladım.
            </ConsentCheckbox>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <p className="text-[10px] text-ink-dim leading-relaxed text-center px-4">
          Başvurunuzu tamamlayarak etkinlik <a href="/hackfest26-kurallar.pdf" target="_blank" className="text-white underline underline-offset-2 hover:text-primary transition-colors">katılım kurallarını</a>, KVKK bilgilendirmesini ve davranış kurallarını onayladığınızı beyan edersiniz.
        </p>
        <Button type="submit" className="w-full py-5 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
          {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'BAŞVURUYU TAMAMLA'}
        </Button>
      </div>
    </form>
  );
}

function ConsentCheckbox({ name, checked, onChange, error, children }) {
  return (
    <label
      htmlFor={name}
      className={cn(
        'flex gap-3 rounded-xl border bg-white/[0.025] p-4 text-xs leading-relaxed text-ink-dim transition-colors',
        error ? 'border-google-red/60' : 'border-white/10 hover:border-white/20'
      )}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-primary"
        required
      />
      <span>
        {children}
        {error && <span className="mt-2 block text-google-red">{error}</span>}
      </span>
    </label>
  );
}
