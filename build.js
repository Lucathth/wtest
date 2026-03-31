'use strict';
const fs   = require('fs');
const path = require('path');

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'),          'utf8'));
const meta    = JSON.parse(fs.readFileSync(path.join(__dirname, 'metadata.json'),         'utf8'));
let   html    = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8');

// ── HTML generators ───────────────────────────────────────────────────────────

function buildStatsHtml(stats) {
  return stats.map(s =>
    `      <div><p style="font-size:24px;font-weight:700">${esc(s.value)}</p>` +
    `<p style="font-size:12px;color:#808098;margin-top:4px">${esc(s.label)}</p></div>`
  ).join('\n');
}

function buildServicesHtml(items) {
  const icon = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#c8102e" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"/></svg>';
  return items.map(s =>
    `      <div class="card"><div class="card-icon">${icon}</div>` +
    `<h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`
  ).join('\n');
}

function buildWhyHtml(items) {
  const icon = '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#c8102e" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>';
  return items.map(w =>
    `      <div class="card"><div class="card-icon">${icon}</div>` +
    `<h3>${esc(w.title)}</h3><p>${esc(w.description)}</p></div>`
  ).join('\n');
}

function buildTestimonialsHtml(items) {
  const star  = '<svg width="16" height="16" viewBox="0 0 20 20" fill="#c8102e"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/></svg>';
  const stars = star.repeat(5);
  return items.map(t =>
    `      <div class="card" style="padding:32px">` +
    `<div style="display:flex;gap:4px;margin-bottom:16px">${stars}</div>` +
    `<blockquote style="font-size:15px;color:#c8c8d8;line-height:1.7;margin-bottom:24px;font-style:italic">&ldquo;${esc(t.quote)}&rdquo;</blockquote>` +
    `<div style="display:flex;align-items:center;gap:12px">` +
    `<div style="width:40px;height:40px;border-radius:50%;background:#c8102e;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">${esc(t.initials)}</div>` +
    `<div><p style="font-weight:600;font-size:14px;margin-bottom:2px">${esc(t.name)}</p>` +
    `<p style="font-size:12px;color:#808098">${esc(t.role)}</p></div>` +
    `</div></div>`
  ).join('\n');
}

function buildTwitterTags(m) {
  const t     = m.twitter || {};
  const lines = [];
  lines.push(`  <meta name="twitter:card" content="${esc(t.card || 'summary_large_image')}" />`);
  const title = t.title || (m.og && m.og.title) || m.seo.title;
  if (title) lines.push(`  <meta name="twitter:title" content="${esc(title)}" />`);
  const desc  = t.description || (m.og && m.og.description) || m.seo.description;
  if (desc)  lines.push(`  <meta name="twitter:description" content="${esc(desc)}" />`);
  const img   = t.image || (m.og && m.og.image);
  if (img)   lines.push(`  <meta name="twitter:image" content="${esc(img)}" />`);
  return lines.join('\n') + '\n';
}

// ── Replacement maps ──────────────────────────────────────────────────────────

// Raw HTML – inserted as-is (values are already safe HTML)
const rawReplacements = {
  '{{OG_IMAGE_TAG}}':       meta.og && meta.og.image
                              ? `  <meta property="og:image" content="${esc(meta.og.image)}" />\n`
                              : '',
  '{{CANONICAL_TAG}}':      meta.seo.canonical
                              ? `  <link rel="canonical" href="${esc(meta.seo.canonical)}" />\n`
                              : '',
  '{{TWITTER_TAGS}}':       buildTwitterTags(meta),
  '{{STATS_HTML}}':         buildStatsHtml(content.stats),
  '{{SERVICES_HTML}}':      buildServicesHtml(content.services.items),
  '{{WHY_HTML}}':           buildWhyHtml(content.why.items),
  '{{TESTIMONIALS_HTML}}':  buildTestimonialsHtml(content.testimonials.items),
};

// Text values – HTML-escaped before insertion
const textReplacements = {
  '{{META_TITLE}}':             meta.seo.title,
  '{{META_DESCRIPTION}}':       meta.seo.description,
  '{{META_ROBOTS}}':            (meta.robots.index  !== false ? 'index'  : 'noindex') + ', ' +
                                (meta.robots.follow !== false ? 'follow' : 'nofollow'),
  '{{OG_TITLE}}':               (meta.og && meta.og.title)       || meta.seo.title,
  '{{OG_DESCRIPTION}}':         (meta.og && meta.og.description) || meta.seo.description,
  '{{OG_TYPE}}':                (meta.og && meta.og.type)        || 'website',

  '{{hero.badge}}':             content.hero.badge,
  '{{hero.headline_main}}':     content.hero.headline_main,
  '{{hero.headline_highlight}}':content.hero.headline_highlight,
  '{{hero.subtext}}':           content.hero.subtext,
  '{{hero.cta_primary}}':       content.hero.cta_primary,
  '{{hero.cta_secondary}}':     content.hero.cta_secondary,

  '{{services.badge}}':         content.services.badge,
  '{{services.headline}}':      content.services.headline,
  '{{services.subtext}}':       content.services.subtext,

  '{{why.badge}}':              content.why.badge,
  '{{why.headline}}':           content.why.headline,
  '{{why.subtext}}':            content.why.subtext,

  '{{testimonials.badge}}':     content.testimonials.badge,
  '{{testimonials.headline}}':  content.testimonials.headline,

  '{{cta.badge}}':              content.cta.badge,
  '{{cta.headline_main}}':      content.cta.headline_main,
  '{{cta.headline_suffix}}':    content.cta.headline_suffix,
  '{{cta.subtext}}':            content.cta.subtext,
  '{{cta.cta_primary}}':        content.cta.cta_primary,
  '{{cta.cta_secondary}}':      content.cta.cta_secondary,

  '{{contact.badge}}':          content.contact.badge,
  '{{contact.headline}}':       content.contact.headline,
  '{{contact.subtext}}':        content.contact.subtext,
  '{{contact.phone}}':          content.contact.phone,
  '{{contact.phone_tel}}':      'tel:' + content.contact.phone.replace(/[\s\-()]/g, ''),
  '{{contact.email}}':          content.contact.email,
  '{{contact.email_mailto}}':   'mailto:' + content.contact.email,
  '{{contact.address}}':        content.contact.address,

  '{{footer.tagline}}':         content.footer.tagline,
};

// ── Apply replacements ────────────────────────────────────────────────────────

for (const [key, val] of Object.entries(rawReplacements)) {
  html = html.split(key).join(val);
}

for (const [key, val] of Object.entries(textReplacements)) {
  html = html.split(key).join(esc(String(val ?? '')));
}

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('index.html built successfully');
