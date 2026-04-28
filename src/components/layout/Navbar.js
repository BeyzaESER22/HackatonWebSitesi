'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { HackathonForm } from '@/components/forms/HackathonForm';
import { EventRegisterForm } from '@/components/forms/EventRegisterForm';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrolled } = useScrollPosition();
  const { activeModal, openModal, closeModal } = useApp();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'hf-nav-blur' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8 text-sm text-ink-dim">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => openModal('speaker')}>Konuşmacı Etkinliği</Button>
            <Button size="sm" onClick={() => openModal('hack')} iconRight={<ArrowRightIcon size={14} />}>
              Hackathon'a Katıl
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg border border-white/10"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menü"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onCTA={(id) => openModal(id)} />
      </header>

      <Modal
        open={activeModal === 'hack'}
        onClose={closeModal}
        eyebrow="Hackathon Başvurusu"
        title="Geleceği kodlamaya hazır mısın?"
        subtitle="Formu doldur, başvurun jüri tarafından değerlendirilsin."
      >
        <HackathonForm onSuccess={closeModal} />
      </Modal>

      <Modal
        open={activeModal === 'speaker'}
        onClose={closeModal}
        eyebrow="Konuşmacı Etkinliği"
        title="Sahnede yerini al."
        subtitle="Konuşmacı etkinliklerine katılmak ya da izleyici olmak için kayıt formu."
      >
        <EventRegisterForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}
