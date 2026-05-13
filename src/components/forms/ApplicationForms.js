'use client';
import { useState } from 'react';
import { HackathonForm } from './HackathonForm';
import { VisitorForm } from './VisitorForm';
import { cn } from '@/lib/helpers';

export function ApplicationForms({ onSuccess }) {
  const [activeTab, setActiveTab] = useState('hackathon'); // 'hackathon' | 'visitor'

  return (
    <div className="w-full">
      {/* Segmented Control / Tabs */}
      <div className="mb-8 flex p-1 bg-white/[0.04] border border-white/10 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('hackathon')}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-bold text-center rounded-xl transition-all duration-300",
            activeTab === 'hackathon' 
              ? "bg-white text-navy-900 shadow-md" 
              : "text-ink-dim hover:text-white hover:bg-white/[0.02]"
          )}
        >
          Hackathon Başvurusu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('visitor')}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-bold text-center rounded-xl transition-all duration-300",
            activeTab === 'visitor' 
              ? "bg-white text-navy-900 shadow-md" 
              : "text-ink-dim hover:text-white hover:bg-white/[0.02]"
          )}
        >
          Etkinlik Ziyaretçi Kaydı
        </button>
      </div>

      {/* Render selected form */}
      <div className="relative">
        {activeTab === 'hackathon' ? (
          <div key="hackathon" className="animate-in fade-in slide-in-from-right-4 duration-300">
            <HackathonForm onSuccess={onSuccess} />
          </div>
        ) : (
          <div key="visitor" className="animate-in fade-in slide-in-from-left-4 duration-300">
            <VisitorForm onSuccess={onSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}
