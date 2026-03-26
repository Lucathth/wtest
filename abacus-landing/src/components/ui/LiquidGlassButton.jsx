/**
 * LiquidGlassButton — JSX port, clean rewrite.
 *
 * Bugs from previous version fixed:
 *  - Shadow values used Tailwind's underscore format (_) instead of CSS spaces
 *    → they were passed via inline style where CSS expects regular spaces
 *  - Too many absolute layers caused z-index conflicts & hidden content
 *  - backdrop-filter on a -z-10 child doesn't reach behind the parent button
 *  - SVG turbulence filter rendered per-button tanked performance with
 *    the animated WebGL shader behind it
 *
 * This version:
 *  - backdrop-filter + box-shadow applied directly on the button element itself
 *  - Single flat structure, zero inner absolute layers
 *  - GlassFilter SVG rendered once globally (in App.jsx)
 *  - duration-150 for snappy, not sluggish, hover response
 *
 * Three variants:
 *  red   → red-tinted glass (primary brand CTAs)
 *  ghost → neutral frosted glass (secondary / outline CTAs)
 *  white → white-tinted glass (CTAs sitting on the red CTA band)
 */

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Box-shadow values — MUST use regular CSS spaces, NOT Tailwind underscores.
// Based on the dark-mode shadow from the original liquid-glass-button source.
// ---------------------------------------------------------------------------
const SHADOW = {
  ghost: [
    '0 0 8px rgba(0,0,0,0.03)',
    '0 2px 6px rgba(0,0,0,0.08)',
    'inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09)',
    'inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85)',
    'inset 1px 1px 1px -0.5px rgba(255,255,255,0.60)',
    'inset -1px -1px 1px -0.5px rgba(255,255,255,0.60)',
    'inset 0 0 6px 6px rgba(255,255,255,0.12)',
    'inset 0 0 2px 2px rgba(255,255,255,0.06)',
    '0 0 12px rgba(0,0,0,0.15)',
  ].join(', '),

  red: [
    '0 0 8px rgba(0,0,0,0.03)',
    '0 2px 6px rgba(0,0,0,0.08)',
    // warm top-left highlight
    'inset 3px 3px 0.5px -3.5px rgba(255,180,180,0.18)',
    // bright bottom-right rim (same as ghost — keeps the glass feel)
    'inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85)',
    'inset 1px 1px 1px -0.5px rgba(255,255,255,0.60)',
    'inset -1px -1px 1px -0.5px rgba(255,255,255,0.60)',
    // inner red surface haze
    'inset 0 0 6px 6px rgba(200,16,46,0.14)',
    'inset 0 0 2px 2px rgba(200,16,46,0.07)',
    // outer red ambient glow
    '0 0 26px rgba(200,16,46,0.40)',
  ].join(', '),

  white: [
    '0 0 8px rgba(0,0,0,0.05)',
    '0 2px 8px rgba(0,0,0,0.12)',
    'inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.50)',
    'inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85)',
    'inset 1px 1px 1px -0.5px rgba(255,255,255,0.70)',
    'inset -1px -1px 1px -0.5px rgba(255,255,255,0.70)',
    'inset 0 0 6px 6px rgba(255,255,255,0.20)',
    'inset 0 0 2px 2px rgba(255,255,255,0.10)',
    '0 0 18px rgba(255,255,255,0.10)',
  ].join(', '),
};

// ---------------------------------------------------------------------------
// Per-variant Tailwind classes (bg tint + text colour)
// ---------------------------------------------------------------------------
const VARIANT_CLS = {
  red:   'bg-[#c8102e]/[0.18] text-white',
  ghost: 'bg-white/[0.05]     text-white',
  white: 'bg-white/[0.18]     text-[#c8102e] font-bold',
};

// ---------------------------------------------------------------------------
// Size classes — rounded-xl matches the rest of the site
// ---------------------------------------------------------------------------
const SIZE_CLS = {
  sm:   'h-9  px-5  text-sm  rounded-xl gap-1.5',
  md:   'h-11 px-6  text-sm  rounded-xl',
  lg:   'h-12 px-7  text-base rounded-xl',
  xl:   'h-14 px-8  text-base rounded-xl',
  full: 'w-full h-12 px-7 text-base rounded-xl',
};

// ---------------------------------------------------------------------------
// LiquidButton
// ---------------------------------------------------------------------------
export function LiquidButton({
  className,
  variant = 'ghost',
  size    = 'lg',
  href,
  type,
  children,
  ...props
}) {
  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      {...(href ? { href } : { type: type ?? 'button' })}
      className={cn(
        // layout
        'inline-flex items-center justify-center gap-2',
        'whitespace-nowrap font-semibold cursor-pointer',
        // interaction
        'transition-all duration-150',          // snappy, not sluggish
        'hover:scale-[1.03] hover:brightness-110',
        'active:scale-[0.97] active:brightness-90',
        // a11y / misc
        'outline-none select-none will-change-transform',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        // variant + size
        VARIANT_CLS[variant] ?? VARIANT_CLS.ghost,
        SIZE_CLS[size]        ?? SIZE_CLS.lg,
        className,
      )}
      style={{
        // Frosted-glass effect directly on the element — correct way to do it
        backdropFilter:       'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        // Glass rim + glow via box-shadow (CSS spaces, not Tailwind underscores)
        boxShadow: SHADOW[variant] ?? SHADOW.ghost,
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

// ---------------------------------------------------------------------------
// GlassFilterDef — render ONCE in App.jsx, not per button.
// Provides the #liquid-glass-filter SVG filter ID used by advanced consumers.
// (Not used by LiquidButton itself to avoid per-button performance cost.)
// ---------------------------------------------------------------------------
export function GlassFilterDef() {
  return (
    <svg
      className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
