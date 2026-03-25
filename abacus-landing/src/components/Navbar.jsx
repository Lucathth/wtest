import { useState, useEffect } from 'react';

/**
 * Sticky navigation bar — scrolled state adds a subtle shadow.
 * Mobile: hamburger menu collapses the nav links.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Warum Abacus', href: '#warum' },
    { label: 'Referenzen', href: '#referenzen' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          {/* Abstract hexagon mark */}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#c8102e] text-white font-bold text-sm leading-none">
            A
          </span>
          <span className="font-semibold text-[#1a1a2e] text-lg tracking-tight">
            Abacus<span className="text-[#c8102e]"> Solutions</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[#5a5a72] hover:text-[#c8102e] text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a00d24] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Kontakt aufnehmen
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1a1a2e] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[#1a1a2e] hover:text-[#c8102e] font-medium py-1 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                onClick={() => setMenuOpen(false)}
                className="block bg-[#c8102e] text-white text-center font-semibold px-5 py-2.5 rounded-lg mt-1"
              >
                Kontakt aufnehmen
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
