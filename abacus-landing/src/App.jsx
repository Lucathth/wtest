/**
 * Abacus Solutions — Landingpage
 * Vite + React + Tailwind CSS
 *
 * Komponentenstruktur:
 *  <Navbar />     — Sticky Navigation
 *  <Hero />       — Opener mit CTA
 *  <Services />   — 4 Leistungs-Kacheln
 *  <WhyUs />      — USPs + Kennzahlen
 *  <References /> — Logos + Testimonials
 *  <CTA />        — Conversion-Band
 *  <Contact />    — Kontaktformular
 *  <Footer />     — Footer mit Links
 */

import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Services        from './components/Services';
import WhyUs           from './components/WhyUs';
import References      from './components/References';
import CTA             from './components/CTA';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import { GlassFilterDef } from './components/ui/LiquidGlassButton';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* SVG filter for liquid glass — rendered once globally */}
      <GlassFilterDef />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <WhyUs />
        <References />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
