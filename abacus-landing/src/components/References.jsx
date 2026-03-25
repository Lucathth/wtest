/**
 * References / Trust Section — dark theme.
 */

function LogoPlaceholder({ name, abbr }) {
  return (
    <div className="flex items-center justify-center h-14 px-4 bg-[#13131c] rounded-xl border border-white/5 hover:border-[#c8102e]/30 hover:shadow-lg hover:shadow-[#c8102e]/5 transition-all duration-200 group">
      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-70 transition-opacity">
        <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white text-xs font-bold">
          {abbr}
        </div>
        <span className="text-sm font-semibold text-white tracking-tight">{name}</span>
      </div>
    </div>
  );
}

const logos = [
  { name: 'TechCorp AG',   abbr: 'TC' },
  { name: 'InnoGroup',     abbr: 'IG' },
  { name: 'DataVentures',  abbr: 'DV' },
  { name: 'Nexus GmbH',    abbr: 'NX' },
  { name: 'AlphaWerk',     abbr: 'AW' },
  { name: 'BetaLogic',     abbr: 'BL' },
];

const testimonials = [
  {
    quote: 'Dank Abacus Solutions haben wir unsere internen Prozesse in nur vier Monaten vollständig digitalisiert. Die Einsparungen übertrafen unsere Erwartungen deutlich.',
    name: 'Dr. Markus Heidler',
    role: 'CTO, TechCorp AG',
    initials: 'MH',
  },
  {
    quote: 'Das Team versteht nicht nur Technologie, sondern auch unser Business. Die Zusammenarbeit war transparent, effizient und hat echten Mehrwert geliefert.',
    name: 'Sandra Brinkmann',
    role: 'Leiterin Digitalisierung, InnoGroup',
    initials: 'SB',
  },
];

export default function References() {
  return (
    <section id="referenzen" className="bg-[#0d0d12] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#c8102e] text-xs font-semibold uppercase tracking-widest">
            Referenzen &amp; Vertrauen
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Unternehmen, die uns vertrauen
          </h2>
          <p className="mt-4 text-[#808098] max-w-lg mx-auto">
            Wir arbeiten mit Unternehmen jeder Größe — vom innovativen Mittelständler
            bis zum börsennotierten Konzern.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {logos.map((l) => (
            <LogoPlaceholder key={l.name} {...l} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#13131c] rounded-2xl p-8 border border-white/5 hover:border-[#c8102e]/20 hover:shadow-xl hover:shadow-[#c8102e]/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-6 text-7xl text-[#c8102e]/10 font-serif leading-none select-none" aria-hidden>
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#c8102e]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-[#c8c8d8] leading-relaxed mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c8102e] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-[#808098]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
