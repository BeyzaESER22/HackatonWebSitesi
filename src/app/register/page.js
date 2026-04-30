import { HackathonForm } from '@/components/forms/HackathonForm';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata = {
  title: 'Başvuru Yap | HackFest\'26 AI',
  description: 'Hackathon başvuru formu.'
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-navy-950 pt-24 pb-20">
      <Container>
        <div className="flex flex-col items-center">
          <SectionTitle
            eyebrow="KATILIM FORMU"
            title="Başvurunu Yap"
            center
          />
          
          <div className="mt-12 w-full flex justify-center">
            {/* Formu render eden kapsayıcı: Dikey kaydırma ve genişlik kontrolü */}
            <div className="w-full max-w-4xl overflow-y-auto bg-transparent h-full">
               <HackathonForm />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
