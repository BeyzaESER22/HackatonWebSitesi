import { HackathonForm } from '@/components/forms/HackathonForm';
import { Container } from '@/components/layout/Container';
import { HackathonApplicationShell } from '@/components/layout/HackathonApplicationShell';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Hackathon Başvurusu',
  description: 'HackFest\'26 AI hackathon başvuru formu — 16-17 Mayıs 2026 İstinye Üniversitesi.',
  path: '/register'
});

export default function RegisterPage() {
  return (
    <section className="pb-24 pt-32 lg:pb-32 lg:pt-36">
      <Container>
        <HackathonApplicationShell>
          <HackathonForm />
        </HackathonApplicationShell>
      </Container>
    </section>
  );
}
