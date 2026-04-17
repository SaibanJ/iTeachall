'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const drawer = open && (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: '8px' }}>
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn('text-lg font-semibold px-4 py-3 rounded-xl transition-colors')}
            style={
              pathname === href
                ? { background: 'rgba(168,85,247,0.12)', color: '#c084fc' }
                : { color: 'rgba(255,255,255,0.5)' }
            }
          >
            {label}
          </Link>
        ))}
      </nav>

      <div style={{ height: '1px', margin: '0 24px', background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ padding: '24px' }}>
        <SignedOut>
          <SignInButton>
            <button className="btn-signin" style={{ width: '100%' }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <UserButton />
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>Account</span>
          </div>
        </SignedIn>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1">
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn('nav-link px-3 py-1.5 rounded-md', pathname === href && 'active')}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg transition-colors"
        style={{ color: 'rgba(255,255,255,0.7)' }}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
          style={{
            background: 'currentColor',
            transform: open ? 'translateY(8px) rotate(45deg)' : undefined,
          }}
        />
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300"
          style={{
            background: 'currentColor',
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : undefined,
          }}
        />
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
          style={{
            background: 'currentColor',
            transform: open ? 'translateY(-8px) rotate(-45deg)' : undefined,
          }}
        />
      </button>

      {/* Portal drawer — escapes navbar stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
};

export default NavItems;
