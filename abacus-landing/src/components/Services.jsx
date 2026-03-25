/**
 * Services Section — dark theme.
 * 4 Kacheln mit Icon + Headline + Beschreibung.
 */

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
    title: 'IT-Consulting',
    short: 'Strategie & Architektur',
    description: 'Wir analysieren Ihre bestehende IT-Landschaft, identifizieren Engpässe und entwickeln eine zukunftssichere Technologiestrategie — von der Infrastruktur bis zur Cloud-Migration.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Prozessoptimierung',
    short: 'Effizienz steigern',
    description: 'Schlanke, automatisierte Prozesse sind der Schlüssel zu mehr Produktivität. Wir modellieren, analysieren und redesignen Ihre Geschäftsprozesse — messbar und nachhaltig.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
      </svg>
    ),
    title: 'Digitalisierung',
    short: 'Transformation gestalten',
    description: 'Von der Papierakte zur digitalen Plattform: Wir begleiten Ihre digitale Transformation ganzheitlich — von der Bestandsaufnahme über die Tool-Auswahl bis zum Go-live.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    title: 'Datenanalyse & KI',
    short: 'Daten als Wettbewerbsvorteil',
    description: 'Aus Rohdaten werden Entscheidungsgrundlagen: Wir implementieren Business-Intelligence-Lösungen und KI-gestützte Prozesse, die Ihnen echten Informationsvorsprung verschaffen.',
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="bg-[#0d0d12] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[#c8102e] text-xs font-semibold uppercase tracking-widest">
            Unsere Leistungen
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Was wir für Sie leisten
          </h2>
          <p className="mt-4 text-[#808098] max-w-xl mx-auto leading-relaxed">
            Von der strategischen Beratung bis zur technischen Umsetzung — wir
            decken das vollständige Spektrum der digitalen Transformation ab.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-[#13131c] rounded-2xl p-6 border border-white/5 hover:border-[#c8102e]/30 hover:shadow-xl hover:shadow-[#c8102e]/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Red accent bar (hover) */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c8102e] to-[#ff4060] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#c8102e]/10 text-[#c8102e] group-hover:bg-[#c8102e] group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>

              <p className="text-[10px] font-semibold text-[#c8102e] uppercase tracking-widest mb-1">{s.short}</p>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-[#808098] leading-relaxed">{s.description}</p>

              {/* Arrow on hover */}
              <div className="mt-5 flex items-center gap-1 text-[#c8102e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Mehr erfahren
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
