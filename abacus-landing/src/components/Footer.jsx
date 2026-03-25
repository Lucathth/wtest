/**
 * Footer — deeper dark, 3-column, red accent on hover.
 */

const navLinks  = [
  { label: 'Leistungen',   href: '#leistungen' },
  { label: 'Warum Abacus', href: '#warum'       },
  { label: 'Referenzen',   href: '#referenzen'  },
  { label: 'Kontakt',      href: '#kontakt'     },
];
const legalLinks = [
  { label: 'Impressum',   href: '#' },
  { label: 'Datenschutz', href: '#' },
  { label: 'AGB',         href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050508] text-white px-6 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded bg-[#c8102e] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#c8102e]/30">
                A
              </span>
              <span className="font-semibold text-lg tracking-tight">
                Abacus<span className="text-[#c8102e]"> Solutions</span>
              </span>
            </a>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Ihr Partner für IT-Beratung, Prozessoptimierung und digitale
              Transformation. Messbar. Nachhaltig. Individuell.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: 'LinkedIn',
                  path: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
                },
                {
                  label: 'XING',
                  path: <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.643-.962-.643H3.648v0z" />,
                },
                {
                  label: 'Twitter',
                  path: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#c8102e] flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.path}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-5">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-5">Kontakt</h3>
            <address className="not-italic flex flex-col gap-3 text-sm text-white/40">
              <span>Maximilianstraße 42<br />80538 München</span>
              <a href="tel:+4989123456789" className="hover:text-white transition-colors">+49 89 123 456 789</a>
              <a href="mailto:info@abacus-solutions.de" className="hover:text-white transition-colors">info@abacus-solutions.de</a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Abacus Solutions GmbH. Alle Rechte vorbehalten.
          </p>
          <ul className="flex gap-5">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-xs text-white/20 hover:text-white/60 transition-colors duration-200">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
