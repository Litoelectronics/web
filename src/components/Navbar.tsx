'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/service' },
  { label: 'Areas', href: '/areas' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((current) => !current);
  };

  return (
    <header className="relative sticky top-0 z-50 border-b border-slate-200 bg-white shadow-xl backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center rounded-2xl bg-white/95 p-2 shadow-sm ring-1 ring-white/40">
          <img
            src="/images/logolito.png"
            alt="Lito Electronics logo"
            className="h-8 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-900 transition hover:text-green-600">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/254725065190"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 md:inline-flex"
          >
            WhatsApp Us
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="relative z-[60] inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-2xl border border-green-600 bg-green-600 text-white shadow-sm transition hover:border-green-700 md:hidden"
          >
            <span className="text-xl">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`md:hidden ${open ? 'block' : 'hidden'} fixed inset-x-0 top-[73px] z-[60] border-t border-slate-200 bg-white shadow-2xl`}
      >
        <div className="max-w-6xl mx-auto px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-900 transition hover:text-green-600"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/254725065190"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
