'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { HackathonApplicationShell } from './HackathonApplicationShell';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ApplicationForms } from '@/components/forms/ApplicationForms';
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
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 flex items-center gap-4 xl:gap-6">

          {/* Logo — fixed width zone */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Center nav — only on xl+ to avoid the squish at lg */}
          <nav className="hidden xl:flex items-center gap-7 text-sm text-ink-dim mx-auto">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs — only on xl+ */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <Button size="sm" onClick={() => openModal('hack')} iconRight={<ArrowRightIcon size={14} />}>
              Hackathon'a Katıl
            </Button>
          </div>

          {/* Mid-screen compact CTAs — between md and xl, only the primary button + hamburger */}
          <div className="hidden md:flex xl:hidden items-center gap-2 ml-auto shrink-0">
            <Button size="sm" onClick={() => openModal('hack')} iconRight={<ArrowRightIcon size={14} />}>
              Hackathon'a Katıl
            </Button>
            <button
              className="p-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menü"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile (< md): just hamburger */}
          <button
            className="md:hidden ml-auto p-2.5 rounded-lg border border-white/10"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menü"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </header>

      <Modal
        open={activeModal === 'hack'}
        onClose={closeModal}
        size="xl"
        surface="plain"
      >
        <HackathonApplicationShell>
          <ApplicationForms onSuccess={closeModal} />
        </HackathonApplicationShell>
      </Modal>
    </>
  );
}
