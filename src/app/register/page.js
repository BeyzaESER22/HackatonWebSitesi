import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { HackathonForm } from '@/components/forms/HackathonForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Hackathon Başvurusu',
  description: 'HackFest\'26 AI hackathon başvuru formu — 16-17 Mayıs 2026 İstinye Üniversitesi.',
  path: '/register'
});

export default function RegisterPage() {
  return (
    <section className="pt-36 pb-24 lg:pt-44 lg:pb-32">
      <Container size="sm">
        <SectionTitle
          eyebrow="Başvuru Formu"
          title="Hackathon'a"
          gradient="başvur."
          className="mb-12"
        />

        <div className="hf-glass p-7 lg:p-9">
          <HackathonForm />
        </div>

        <p className="text-center text-xs text-ink-dim mt-6">
          Başvurun 3 iş günü içinde e-posta ile yanıtlanır. Tüm alanları eksiksiz doldurmanız değerlendirme sürecini hızlandırır.
        </p>
      </Container>
    </section>
  );
}
