import { SmokeBackground } from './ui/SmokeBackground';

/**
 * Hero Section
 * The WebGL smoke shader fills the entire section as an absolute background.
 * All text content sits above it (z-10).
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f] pt-16">

      {/* ── Shader background (full-bleed, pointer-events off) ── */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <SmokeBackground smokeColor="#c8102e" />
      </div>

      {/* ── Dark overlay so text stays readable ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.45) 60%, rgba(10,10,15,0.20) 100%)' }}
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">

        {/* Left — Text */}
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#c8102e]/20 border border-[#c8102e]/30 text-[#ff4060] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] inline-block animate-pulse" />
            IT-Beratung &amp; Digitalisierung
          </span>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
            Ihr digitaler <br />
            <span className="text-[#c8102e]">Wettbewerbsvorteil.</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg text-[#a0a0b8] leading-relaxed mb-10 max-w-md">
            Abacus Solutions begleitet Unternehmen auf dem Weg zur digitalen
            Exzellenz — von der Strategie bis zur Implementierung. Messbar.
            Nachhaltig. Auf Sie zugeschnitten.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#e8294a] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#c8102e]/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Kontakt aufnehmen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#c8102e]/60 text-white hover:text-[#ff4060] font-semibold px-7 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              Leistungen entdecken
            </a>
          </div>

          {/* Trust mini-stats */}
          <div className="animate-fade-in-up delay-400 mt-14 flex gap-8 flex-wrap">
            {[
              { value: '15+', label: 'Jahre Erfahrung' },
              { value: '200+', label: 'Projekte' },
              { value: '98 %', label: 'Kundenzufriedenheit' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-[#6060808] mt-0.5 text-[#808098]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — empty on mobile, gives the shader visual room on desktop */}
        <div className="hidden md:block" />
      </div>

      {/* Scroll cue */}
      <a
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 hover:text-[#c8102e] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Mehr erfahren</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
