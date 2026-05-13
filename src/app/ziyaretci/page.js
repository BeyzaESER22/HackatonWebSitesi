import { VisitorApplicationShell } from '@/components/layout/VisitorApplicationShell';
import { VisitorForm } from '@/components/forms/VisitorForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Ziyaretçi Kaydı',
  description: 'HackFest\'26 AI etkinliğine ziyaretçi olarak katılmak için kayıt formunu doldurun.',
  path: '/ziyaretci'
});

export default function VisitorRegistrationPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <VisitorApplicationShell>
          <VisitorForm />
        </VisitorApplicationShell>
      </div>
    </main>
  );
}
