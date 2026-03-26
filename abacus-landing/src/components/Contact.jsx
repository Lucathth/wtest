import { useState } from 'react';
import { LiquidButton } from './ui/LiquidGlassButton';

/**
 * Contact Form Section — dark theme.
 * Client-side validation, success state on submit.
 */
export default function Contact() {
  const [form, setForm] = useState({
    name: '', firma: '', email: '', telefon: '', nachricht: '', datenschutz: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (!form.nachricht.trim()) e.nachricht = 'Bitte beschreiben Sie kurz Ihr Anliegen.';
    if (!form.datenschutz)      e.datenschutz = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const base  = 'w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 bg-[#1e1e2a]';
  const norm  = 'border-white/10 focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/15';
  const err   = 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/10';

  return (
    <section id="kontakt" className="bg-[#0a0a0f] py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — contact info */}
        <div>
          <span className="text-[#c8102e] text-xs font-semibold uppercase tracking-widest">Kontakt</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
            Sprechen wir über
            Ihre Herausforderung
          </h2>
          <p className="text-[#808098] leading-relaxed mb-10">
            Füllen Sie das Formular aus — wir melden uns in der Regel innerhalb von
            24 Stunden für ein erstes, unverbindliches Kennenlerngespräch.
          </p>

          <ul className="flex flex-col gap-5">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />,
                label: 'Telefon', value: '+49 89 123 456 789', href: 'tel:+4989123456789',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />,
                label: 'E-Mail', value: 'info@abacus-solutions.de', href: 'mailto:info@abacus-solutions.de',
              },
              {
                icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></>,
                label: 'Adresse', value: 'Maximilianstraße 42, 80538 München', href: '#',
              },
            ].map((c) => (
              <li key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c8102e]/10 text-[#c8102e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>{c.icon}</svg>
                </div>
                <div>
                  <p className="text-xs text-[#808098] font-medium mb-0.5">{c.label}</p>
                  <a href={c.href} className="text-sm text-white/80 font-medium hover:text-[#c8102e] transition-colors">{c.value}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="bg-[#13131c] rounded-2xl p-8 border border-white/5">
          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white mb-1">Anfrage senden</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#808098] mb-1.5 uppercase tracking-wide">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Max Mustermann" className={`${base} ${errors.name ? err : norm}`} />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#808098] mb-1.5 uppercase tracking-wide">Unternehmen</label>
                  <input type="text" name="firma" value={form.firma} onChange={handleChange}
                    placeholder="Mustermann GmbH" className={`${base} ${norm}`} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#808098] mb-1.5 uppercase tracking-wide">E-Mail *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="max@mustermann.de" className={`${base} ${errors.email ? err : norm}`} />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#808098] mb-1.5 uppercase tracking-wide">Telefon</label>
                  <input type="tel" name="telefon" value={form.telefon} onChange={handleChange}
                    placeholder="+49 89 …" className={`${base} ${norm}`} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#808098] mb-1.5 uppercase tracking-wide">Ihre Nachricht *</label>
                <textarea name="nachricht" value={form.nachricht} onChange={handleChange} rows={4}
                  placeholder="Beschreiben Sie kurz Ihre Herausforderung …"
                  className={`${base} resize-none ${errors.nachricht ? err : norm}`} />
                {errors.nachricht && <p className="mt-1 text-xs text-red-400">{errors.nachricht}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input type="checkbox" name="datenschutz" checked={form.datenschutz} onChange={handleChange} className="peer sr-only" />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      form.datenschutz ? 'bg-[#c8102e] border-[#c8102e]' : errors.datenschutz ? 'border-red-500/60' : 'border-white/20 group-hover:border-[#c8102e]'
                    }`}>
                      {form.datenschutz && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-[#808098] leading-relaxed">
                    Ich habe die{' '}
                    <a href="#" className="text-[#c8102e] underline underline-offset-2 hover:text-[#ff4060]">Datenschutzerklärung</a>
                    {' '}gelesen und stimme der Verarbeitung meiner Daten zu. *
                  </span>
                </label>
                {errors.datenschutz && <p className="mt-1 text-xs text-red-400 ml-7">{errors.datenschutz}</p>}
              </div>

              <LiquidButton variant="red" size="full" type="submit">
                Anfrage absenden
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </LiquidButton>

              <p className="text-center text-xs text-white/20">* Pflichtfelder. Keine Weitergabe an Dritte.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
      <div className="w-16 h-16 rounded-full bg-[#c8102e]/15 flex items-center justify-center">
        <svg className="w-8 h-8 text-[#c8102e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white">Vielen Dank!</h3>
      <p className="text-[#808098] max-w-xs leading-relaxed">
        Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
      </p>
    </div>
  );
}
