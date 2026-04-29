'use client';

import { useState } from 'react';
import { Button, ArrowRightIcon } from '@/components/ui/Button';

export function AdminLoginCard({ isConfigured }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) return;

    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || 'Giriş başarısız.');
        return;
      }

      window.location.reload();
    } catch {
      setError('Giriş sırasında bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#101736_0%,#0A102A_100%)] p-8 shadow-soft">
      <div className="mb-2 text-xs uppercase tracking-[0.22em] text-ink-dim">Admin Paneli</div>
      <h1 className="font-display text-3xl font-bold text-white">Giriş yap</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-dim">
        Hackathon başvurularını görüntülemek ve CSV dışa aktarmak için admin şifresini gir.
      </p>

      {!isConfigured && (
        <div className="mt-6 rounded-2xl border border-google-yellow/30 bg-google-yellow/10 px-4 py-3 text-sm leading-relaxed text-[#F5E3A5]">
          Admin girişi için `ADMIN_PASSWORD` ve `ADMIN_SESSION_SECRET` environment variable&apos;larını tanımlaman gerekiyor.
        </div>
      )}

      <form className="mt-6" onSubmit={handleSubmit}>
        <label htmlFor="admin-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-ink-dim">
          Admin Şifresi
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreni gir"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition focus:border-[#7C8BFF] focus:bg-white/[0.08]"
          disabled={!isConfigured || busy}
          required
        />

        {error && <p className="mt-3 text-sm text-google-red">{error}</p>}

        <Button
          type="submit"
          className="mt-5 w-full"
          disabled={!isConfigured || busy}
          iconRight={!busy && <ArrowRightIcon />}
        >
          {busy ? 'Giriş yapılıyor...' : 'Admin Paneline Gir'}
        </Button>
      </form>
    </div>
  );
}
