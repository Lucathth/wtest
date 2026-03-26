import { useState, useEffect } from 'react';
import { LiquidButton } from './ui/LiquidGlassButton';

/**
 * Sticky dark Navbar — transparent on top, dark glass on scroll.
 * Mobile: hamburger collapse.
 */
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Leistungen',   href: '#leistungen' },
    { label: 'Warum Abacus', href: '#warum'       },
    { label: 'Referenzen',   href: '#referenzen'  },
    { label: 'Kontakt',      href: '#kontakt'     },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#c8102e] text-white font-bold text-sm leading-none shadow-lg shadow-[#c8102e]/30">
            A
          </span>
          <span className="font-semibold text-white text-lg tracking-tight">
            Abacus<span className="text-[#c8102e]"> Solutions</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <LiquidButton variant="red" size="sm" href="#kontakt" className="hidden md:inline-flex">
          Kontakt aufnehmen
        </LiquidButton>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f0f18]/95 backdrop-blur-md border-t border-white/5 px-6 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/70 hover:text-white font-medium py-1 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <LiquidButton
                variant="red" size="sm" href="#kontakt"
                onClick={() => setMenuOpen(false)}
                className="w-full mt-1"
              >
                Kontakt aufnehmen
              </LiquidButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
