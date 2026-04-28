import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { SponsorsSection } from '@/components/sections/SponsorsSection';
import { SITE } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sponsorlar',
  description: 'HackFest\'26 AI sponsorları ve partnerleri.',
  path: '/sponsors'
});

export default function SponsorsPage() {
  return (
    <>
      <section className="pt-36 pb-12">
        <Container>
          <SectionTitle
            eyebrow="Sponsorlar"
            title="Bizi destekleyen"
            gradient="markalar."
            align="left"
          />
          <p className="text-ink-dim text-lg max-w-2xl mt-6">
            HackFest'26 AI'ı mümkün kılan sponsorlarımız ve partnerlerimiz aşağıda yer almaktadır.
            Listeye eklenmek için iletişime geçebilirsiniz.
          </p>

          <div className="mt-8">
            <Button as="a" href={`mailto:${SITE.email}?subject=Sponsorluk%20%C4%B0%C5%9Fbirli%C4%9Fi`} variant="ghost" size="sm">
              Sponsor Olmak İstiyorum
            </Button>
          </div>
        </Container>
      </section>

      <SponsorsSection />
    </>
  );
}
