import { Container } from '@/components/layout/Container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin Operasyon Notları',
  description: 'HackFest\'26 hackathon başvuru akışı için operasyon rehberi.',
  path: '/admin/operations'
});

const sections = [
  {
    title: 'Başvuru geldi mi nasıl kontrol edilir?',
    body:
      'Admin panelindeki tablo başvuruları en yeni kayıt üstte olacak şekilde gösterir. Liste KV ile birlikte fallback backup katmanlarını da okur; bu yüzden backup-only kayıtlar da panelde görünür.'
  },
  {
    title: 'CSV nasıl alınır?',
    body:
      'Admin panelinin üst kısmındaki CSV İndir butonu tüm başvuruları tek dosyada dışa aktarır. Yoğun saatlerde düzenli aralıklarla CSV indirip yerel kopya tutman önerilir.'
  },
  {
    title: 'Backup’lar nereden kontrol edilir?',
    body:
      'Production ortamında fallback kayıtları Vercel Blob içinde structured-backups/hackathon-applications/ prefix altında tutulur. Local geliştirmede aynı kayıtlar data/_structured_backups/hackathon-applications/ klasörüne yazılır.'
  },
  {
    title: 'Acil durumda ne yapılır?',
    body:
      'Önce admin panelinden güncel CSV indir. Ardından Vercel Logs içinde /api/hackathon isteklerini kontrol et. KV tarafında aksama varsa Blob backup klasöründeki en yeni kayıtları doğrula ve panel normale dönene kadar CSV kopyasını operasyon kaydı olarak kullan.'
  }
];

const safeguards = [
  'Submit sırasında buton disable edilir.',
  'Her başvuruya benzersiz bir submission id verilir.',
  'Backend tarafında idempotency ve duplicate reservation aktiftir.',
  'Aynı etkinlik + aynı e-posta için unique koruma vardır.',
  'Honeypot spam filtresi ve IP/e-posta rate limit aktiftir.',
  'KV yazımı başarısız olursa backup fallback devreye girer.',
  'Form taslağı kullanıcının cihazında tutulur.'
];

export default function AdminOperationsPage() {
  return (
    <section className="pb-24 pt-32 lg:pb-32 lg:pt-36">
      <Container className="max-w-4xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-soft sm:p-10">
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Admin Operasyon Notları</div>
          <h1 className="mt-3 font-display text-4xl font-bold text-white">Hackathon başvuru akışı rehberi</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
            Bu sayfa, yoğun başvuru anlarında hızlı kontrol yapabilmen ve olası aksaklıklarda
            doğru sırayla hareket edebilmen için hazırlandı.
          </p>

          <div className="mt-8 space-y-5">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-5">
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-5">
            <h2 className="text-lg font-semibold text-white">Aktif korumalar</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
              {safeguards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
