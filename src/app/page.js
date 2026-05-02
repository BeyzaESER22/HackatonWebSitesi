import { Hero }              from '@/components/sections/Hero';
import { Highlights }        from '@/components/sections/Highlights';
import { FAQSection }        from '@/components/sections/FAQSection';
import { ContactSection }    from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <div className="relative bg-[#05071A] overflow-x-hidden">
        <Hero />
        <Highlights />
      </div>
      <FAQSection />
      <ContactSection />
    </>
  );
}
