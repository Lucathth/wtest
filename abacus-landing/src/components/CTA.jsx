/**
 * CTA Section — Full-width red band with headline + primary button.
 * Creates urgency and drives conversion to the contact form.
 */
export default function CTA() {
  return (
    <section className="relative bg-[#c8102e] py-24 px-6 overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3"
      />

      {/* Grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-block bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
          Kostenlos &amp; unverbindlich
        </span>

        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
          Bereit für Ihren nächsten
          <br /> digitalen Schritt?
        </h2>

        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Vereinbaren Sie jetzt ein kostenloses Erstgespräch. Wir analysieren Ihre
          Situation und zeigen Ihnen konkrete Potenziale auf — ohne Verpflichtung.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-white text-[#c8102e] font-bold px-8 py-4 rounded-xl shadow-xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-200 text-base"
          >
            Jetzt Beratungsgespräch vereinbaren
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="tel:+4989123456789"
            className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Direkt anrufen
          </a>
        </div>
      </div>
    </section>
  );
}
