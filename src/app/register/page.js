import { ContactFormLayout } from '@/components/layout/ContactFormLayout';
import { HackathonForm } from '@/components/forms/HackathonForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Hackathon Başvurusu',
  description: 'HackFest\'26 AI hackathon başvuru formu — 16-17 Mayıs 2026 İstinye Üniversitesi.',
  path: '/register'
});

export default function RegisterPage() {
  return (
    <ContactFormLayout
      eyebrow="/HACKATHON BAŞVURUSU"
      title="Aramıza"
      titleAccent="katıl."
      description="HackFest'26 hackathon'una başvurmak için aşağıdaki formu doldur. Başvurun jüri tarafından değerlendirildikten sonra e-posta ile sonuç paylaşılacaktır."
    >
      <HackathonForm />
    </ContactFormLayout>
  );
}
