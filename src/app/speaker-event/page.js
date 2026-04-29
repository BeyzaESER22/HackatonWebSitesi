import { ContactFormLayout } from '@/components/layout/ContactFormLayout';
import { EventRegisterForm } from '@/components/forms/EventRegisterForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Konuşmacı Etkinliği Kaydı',
  description: 'HackFest\'26 AI konuşmacı etkinlikleri ve stand ziyareti kayıt formu.',
  path: '/speaker-event'
});

export default function SpeakerEventPage() {
  return (
    <ContactFormLayout
      eyebrow="/KONUŞMACI ETKİNLİĞİ"
      title="Sahnede"
      titleAccent="yerini al."
      description="Hackathon'a katılmıyor; konuşmaları izlemek, atölyelere katılmak ya da sponsor stantlarını gezmek istiyorsan aşağıdaki formu doldur. Çekilişe katılım hakkı kazanırsın."
    >
      <EventRegisterForm />
    </ContactFormLayout>
  );
}
