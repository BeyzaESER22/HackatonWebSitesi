import { HackathonForm } from '@/components/forms/HackathonForm';

export const metadata = {
  title: 'Başvuru Yap | HackFest\'26 AI',
  description: 'Hackathon başvuru formu.'
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-navy-900">
      <HackathonForm />
    </main>
  );
}
