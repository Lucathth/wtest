/**
 * Hero Section
 * Full-viewport opener with headline, subline, dual CTAs and an abstract
 * tech-grid visual on the right. Fade-in-up animations on load.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      {/* Subtle red gradient background accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 80% 50%, rgba(200,16,46,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#c8102e 1px, transparent 1px), linear-gradient(to right, #c8102e 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        {/* Left — Text */}
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#c8102e]/10 text-[#c8102e] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] inline-block" />
            IT-Beratung &amp; Digitalisierung
          </span>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-[#1a1a2e] mb-6">
            Ihr digitaler <br />
            <span className="text-[#c8102e]">Wettbewerbsvorteil.</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg text-[#5a5a72] leading-relaxed mb-10 max-w-md">
            Abacus Solutions begleitet Unternehmen auf dem Weg zur digitalen
            Exzellenz — von der Strategie bis zur Implementierung. Messbar.
            Nachhaltig. Auf Sie zugeschnitten.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a00d24] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#c8102e]/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Kontakt aufnehmen
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 border border-[#e0e0e5] hover:border-[#c8102e] text-[#1a1a2e] hover:text-[#c8102e] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
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
                <p className="text-2xl font-bold text-[#1a1a2e]">{s.value}</p>
                <p className="text-xs text-[#5a5a72] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Abstract tech visual */}
        <div className="hidden md:flex items-center justify-center animate-fade-in-up delay-200">
          <TechIllustration />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#5a5a72] hover:text-[#c8102e] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Mehr erfahren</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}

/**
 * Pure-SVG abstract "tech circuit" illustration — no external deps.
 */
function TechIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="w-full max-w-lg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Outer ring */}
      <circle cx="240" cy="210" r="180" stroke="#c8102e" strokeOpacity="0.08" strokeWidth="1" />
      <circle cx="240" cy="210" r="140" stroke="#c8102e" strokeOpacity="0.12" strokeWidth="1" />
      <circle cx="240" cy="210" r="100" stroke="#c8102e" strokeOpacity="0.18" strokeWidth="1" />

      {/* Center hexagon */}
      <polygon
        points="240,140 299,175 299,245 240,280 181,245 181,175"
        fill="#c8102e"
        fillOpacity="0.06"
        stroke="#c8102e"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      {/* Inner hexagon */}
      <polygon
        points="240,165 272,183 272,219 240,237 208,219 208,183"
        fill="#c8102e"
        fillOpacity="0.1"
        stroke="#c8102e"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      {/* Center dot */}
      <circle cx="240" cy="210" r="10" fill="#c8102e" fillOpacity="0.8" />
      <circle cx="240" cy="210" r="5" fill="#c8102e" />

      {/* Connector lines to outer nodes */}
      {[
        [240, 140, 240, 80],
        [299, 175, 352, 144],
        [299, 245, 352, 276],
        [240, 280, 240, 340],
        [181, 245, 128, 276],
        [181, 175, 128, 144],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8102e" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
      ))}

      {/* Outer nodes */}
      {[
        [240, 80], [352, 144], [352, 276], [240, 340], [128, 276], [128, 144],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="12" fill="#c8102e" fillOpacity="0.08" stroke="#c8102e" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="4" fill="#c8102e" fillOpacity="0.6" />
        </g>
      ))}

      {/* Floating data labels */}
      {[
        { x: 60, y: 90, text: 'Analytics' },
        { x: 360, y: 70, text: 'Cloud' },
        { x: 390, y: 330, text: 'AI / ML' },
        { x: 30, y: 330, text: 'Security' },
      ].map((l) => (
        <g key={l.text}>
          <rect x={l.x - 4} y={l.y - 14} width={l.text.length * 7 + 8} height={20} rx="4" fill="#c8102e" fillOpacity="0.08" />
          <text x={l.x} y={l.y} fill="#c8102e" fillOpacity="0.7" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="600">{l.text}</text>
        </g>
      ))}
    </svg>
  );
}
