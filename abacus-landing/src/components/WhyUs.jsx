/**
 * WhyUs Section — dark theme.
 * USP bullets left, stats grid right.
 */

const reasons = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Über 15 Jahre Erfahrung',
    body: 'Unsere Berater bringen jahrzehntelange Praxiserfahrung aus mittelständischen und Großunternehmen mit — quer durch alle Branchen.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'Messbare Effizienzsteigerung',
    body: 'Unsere Projekte erzielen im Schnitt 30 % Effizienzgewinn innerhalb des ersten Jahres — belegt durch transparentes KPI-Tracking von Tag eins.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.869a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'Individuelle Lösungen',
    body: 'Kein Copy-Paste. Jede Lösung entsteht auf Basis einer gründlichen Analyse Ihrer spezifischen Anforderungen, Prozesse und Ziele.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: 'Modernste Technologien',
    body: 'Wir setzen auf aktuelle, bewährte Tech-Stacks — Cloud-native, KI-ready und zukunftssicher, damit Ihre Investition langfristig trägt.',
  },
];

const stats = [
  { value: '15+',  label: 'Jahre\nMarkterfahrung' },
  { value: '200+', label: 'Erfolgreich\nabgeschlossene Projekte' },
  { value: '30 %', label: 'Ø Effizienz-\nsteigerung' },
  { value: '98 %', label: 'Kunden-\nzufriedenheit' },
];

export default function WhyUs() {
  return (
    <section id="warum" className="bg-[#0a0a0f] py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — reasons */}
        <div>
          <span className="text-[#c8102e] text-xs font-semibold uppercase tracking-widest">
            Warum Abacus Solutions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10">
            Der Unterschied, der zählt
          </h2>

          <ul className="flex flex-col gap-7">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4 group">
                <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-xl bg-[#c8102e]/10 text-[#c8102e] flex items-center justify-center group-hover:bg-[#c8102e] group-hover:text-white transition-colors duration-300">
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{r.title}</h3>
                  <p className="text-sm text-[#808098] leading-relaxed">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative rounded-2xl p-7 overflow-hidden border ${
                i === 0
                  ? 'bg-[#c8102e] border-[#c8102e]'
                  : 'bg-[#13131c] border-white/5'
              }`}
            >
              {/* Decorative circle */}
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${i === 0 ? 'bg-white/10' : 'bg-[#c8102e]/8'}`} />
              <p className={`text-4xl font-black mb-2 ${i === 0 ? 'text-white' : 'text-[#c8102e]'}`}>
                {s.value}
              </p>
              <p className={`text-sm leading-snug whitespace-pre-line ${i === 0 ? 'text-white/80' : 'text-[#808098]'}`}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
