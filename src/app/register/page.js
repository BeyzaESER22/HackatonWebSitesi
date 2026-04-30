import { HackathonForm } from '@/components/forms/HackathonForm';
import { HackathonApplicationShell } from '@/components/layout/HackathonApplicationShell';

export const metadata = {
  title: 'Başvuru Yap | HackFest\'26 AI',
  description: 'Hackathon başvuru formu.'
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <HackathonApplicationShell>
          <HackathonForm />
        </HackathonApplicationShell>
      </div>
    </main>
  );
}
