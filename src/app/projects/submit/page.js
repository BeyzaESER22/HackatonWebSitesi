import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProjectSubmitForm } from '@/components/forms/ProjectSubmitForm';
import { COLORS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Demo Day Başvurusu',
  description: 'HackFest\'26 AI projeni Demo Day galerisi için gönder.',
  path: '/projects/submit'
});

export default function ProjectSubmitPage() {
  return (
    <section className="pt-20 pb-24 lg:pt-24 lg:pb-32">
      <Container size="sm">
        <Badge dotColor={COLORS.green} className="mb-4">Demo Day</Badge>
        <SectionTitle title="Demo Day" gradient="Başvurusu" align="left" className="mb-4" />
        <p className="text-ink-dim mb-8">
          Etkinlik sırasında geliştirdiğiniz projeyi yükleyin. Gönderim sonrası organizasyon ekibi tarafından
          incelenir ve onaylandığında <span className="text-white">/projects</span> galerisinde sergilenir.
        </p>

        <Card className="!p-7 lg:!p-9">
          <ProjectSubmitForm />
        </Card>

        <Card className="!p-6 mt-6">
          <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-2">İpucu</div>
          <p className="text-sm text-ink-dim">
            En iyi sunum için: ekran görüntüsünü 16:9 oranında çekin, kısa açıklamayı problem-çözüm formatında yazın
            ve mümkünse canlı bir demo URL'si paylaşın. Örnek bir proje yapısı için
            <a href="/projects/sample-medai" className="text-google-blue hover:underline ml-1">MedAI showcase'ini</a> inceleyebilirsiniz.
          </p>
        </Card>
      </Container>
    </section>
  );
}
