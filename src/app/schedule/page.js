import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Program',
  description: 'HackFest\'26 AI program akışı — 16-17 Mayıs 2026 saatlik etkinlik takvimi.',
  path: '/schedule'
});

export default function SchedulePage() {
  return (
    <div className="pt-24">
      <ScheduleSection />
    </div>
  );
}
