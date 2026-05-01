import { Hero }              from '@/components/sections/Hero';
import { Marquee }           from '@/components/sections/Marquee';
import { Highlights }        from '@/components/sections/Highlights';
import { HackathonSection }  from '@/components/sections/HackathonSection';
import { FAQSection }        from '@/components/sections/FAQSection';
import { CTASection }        from '@/components/sections/CTASection';
import { ContactSection }    from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Highlights />
      <HackathonSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
