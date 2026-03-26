/**
 * LiquidGlassButton — JSX port of the liquid-glass-button TSX component.
 *
 * Three variants for this dark/red theme:
 *  • "red"   — red-tinted glass  → primary brand CTAs (replaces solid red buttons)
 *  • "ghost" — neutral glass     → secondary/outline CTAs (replaces border-white/20 buttons)
 *  • "white" — white-tinted glass → CTAs that sit on the red CTA band
 *
 * Renders as <a> when `href` is provided, as <button> otherwise.
 * Supports `className` overrides (w-full, etc.) via tailwind-merge.
 *
 * TypeScript note: this project uses plain JSX.  The original TSX interfaces
 * (ButtonProps, MetalButtonProps, etc.) have been removed; only LiquidButton
 * and GlassFilter are kept — the only pieces used in this app.
 */

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// CVA — outer element (button or a)
// ---------------------------------------------------------------------------
const liquidButtonVariants = cva(
  // base — always applied
  [
    'group relative inline-flex items-center justify-center cursor-pointer',
    'gap-2 whitespace-nowrap font-semibold',
    'transition-all duration-300',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'outline-none select-none',
  ],
  {
    variants: {
      variant: {
        /** Red-tinted liquid glass — replaces solid #c8102e buttons */
        red:   'text-white   hover:scale-[1.03] active:scale-[0.98]',
        /** Neutral frosted glass — replaces border-white/20 outline buttons */
        ghost: 'text-white   hover:scale-[1.03] active:scale-[0.98]',
        /** White-tinted glass — for CTAs sitting on the red CTA band */
        white: 'text-[#c8102e] font-bold hover:scale-[1.03] active:scale-[0.98]',
      },
      size: {
        sm:   'h-9  px-5  text-sm  rounded-lg',
        md:   'h-11 px-6  text-sm  rounded-xl',
        lg:   'h-12 px-7  text-base rounded-xl',
        xl:   'h-14 px-8  text-base rounded-xl',
        full: 'w-full h-12 px-7 text-base rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size:    'lg',
    },
  },
);

// ---------------------------------------------------------------------------
// Glass shadow layers — multi-layer box-shadow creates the glass edge effect.
//   • inset highlights: bright top-left edge, dark bottom-right edge
//   • outer glow:       colour-matched ambient glow
// ---------------------------------------------------------------------------
const glassShadow = {
  red: [
    // outer drop shadow
    '0_2px_10px_rgba(0,0,0,0.25)',
    // inset top-left rim (warm highlight)
    'inset_3px_3px_0.5px_-3.5px_rgba(255,160,160,0.20)',
    // inset bottom-right rim (red depth)
    'inset_-3px_-3px_0.5px_-3.5px_rgba(200,16,46,0.55)',
    // inner highlight lines
    'inset_1px_1px_1px_-0.5px_rgba(255,140,140,0.45)',
    'inset_-1px_-1px_1px_-0.5px_rgba(180,10,30,0.45)',
    // inner surface haze
    'inset_0_0_8px_8px_rgba(200,16,46,0.10)',
    'inset_0_0_2px_2px_rgba(200,16,46,0.07)',
    // outer red ambient glow
    '0_0_28px_rgba(200,16,46,0.35)',
  ].join(','),

  ghost: [
    '0_2px_8px_rgba(0,0,0,0.12)',
    'inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.10)',
    'inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.80)',
    'inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.60)',
    'inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.55)',
    'inset_0_0_6px_6px_rgba(255,255,255,0.10)',
    'inset_0_0_2px_2px_rgba(255,255,255,0.06)',
    '0_0_14px_rgba(0,0,0,0.20)',
  ].join(','),

  white: [
    '0_2px_10px_rgba(0,0,0,0.20)',
    'inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.55)',
    'inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.35)',
    'inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.75)',
    'inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.60)',
    'inset_0_0_6px_6px_rgba(255,255,255,0.15)',
    'inset_0_0_2px_2px_rgba(255,255,255,0.10)',
    '0_0_18px_rgba(255,255,255,0.12)',
  ].join(','),
};

// ---------------------------------------------------------------------------
// Background tint — faint colour fill that becomes visible on hover
// ---------------------------------------------------------------------------
const bgTint = {
  red:   'bg-[#c8102e]/18   group-hover:bg-[#c8102e]/28',
  ghost: 'bg-white/5        group-hover:bg-white/10',
  white: 'bg-white/18       group-hover:bg-white/28',
};

// ---------------------------------------------------------------------------
// LiquidButton component
// ---------------------------------------------------------------------------
/**
 * @param {{
 *   variant?: 'red' | 'ghost' | 'white'
 *   size?:    'sm' | 'md' | 'lg' | 'xl' | 'full'
 *   href?:    string          — renders <a> when provided
 *   type?:    string          — for <button> (default 'button')
 *   className?: string
 *   children?: React.ReactNode
 * }} props
 */
export function LiquidButton({
  className,
  variant = 'ghost',
  size,
  href,
  type,
  children,
  ...props
}) {
  const Comp = href ? 'a' : 'button';
  const linkOrButtonProps = href
    ? { href }
    : { type: type ?? 'button' };

  const v = variant ?? 'ghost';

  return (
    <Comp
      {...linkOrButtonProps}
      className={cn(liquidButtonVariants({ variant: v, size, className }))}
      {...props}
    >
      {/* ── Layer 1: multi-shadow glass ring ── */}
      <div
        className="absolute inset-0 z-0 rounded-[inherit] transition-all duration-300"
        style={{ boxShadow: glassShadow[v] }}
      />

      {/* ── Layer 2: colour tint fill (hover-sensitive via group) ── */}
      <div
        className={cn(
          'absolute inset-0 z-0 rounded-[inherit] transition-all duration-300',
          bgTint[v],
        )}
      />

      {/* ── Layer 3: backdrop-filter distortion (behind all siblings) ── */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: 'url("#liquid-glass-filter") blur(2px)' }}
      />

      {/* ── Content (above all glass layers) ── */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* ── SVG filter definition (hidden, inline) ── */}
      <GlassFilter />
    </Comp>
  );
}

// ---------------------------------------------------------------------------
// GlassFilter — SVG turbulence + displacement for the liquid distortion look.
// Rendered once per button (hidden). Multiple identical filters in the DOM
// are fine; browsers use the first one found.
// ---------------------------------------------------------------------------
function GlassFilter() {
  return (
    <svg className="absolute hidden" aria-hidden focusable="false">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Fractal noise as displacement source */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          {/* Soften the noise pattern */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          {/* Distort the backdrop through the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          {/* Final softening pass */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
