# Abacus Solutions – Website Dokumentation

## Übersicht

Statische One-Page-Website, gehostet auf Netlify. Inhalte werden über das Decap CMS verwaltet und bei jedem Speichern automatisch neu deployed.

**Live-URL:** https://abacus-webtesting.netlify.app
**CMS:** https://abacus-webtesting.netlify.app/admin
**Branch:** `claude/fix-netlify-deployment-0cEyK`

---

## Dateistruktur

```
index.template.html   # HTML-Vorlage mit {{Platzhaltern}} — hier wird die Struktur bearbeitet
build.js              # Build-Script: liest Template + JSONs → erzeugt index.html
netlify.toml          # Netlify-Konfiguration (Build-Befehl)
content.json          # Seiteninhalt (vom CMS verwaltet)
metadata.json         # Metadaten / SEO (vom CMS verwaltet)
admin/
  config.yml          # Decap CMS Konfiguration
  index.html          # CMS Admin-Interface
.gitignore            # index.html ist bewusst ausgeschlossen (Build-Artefakt)
```

> `index.html` liegt nicht im Repo. Sie wird bei jedem Netlify-Deploy automatisch aus `index.template.html` + den JSON-Dateien generiert.

---

## Wie funktioniert der Build-Prozess?

```
CMS speichert Änderung
  → JSON-Datei wird committed (content.json oder metadata.json)
  → Netlify erkennt neuen Commit und startet Deploy
  → node build.js läuft
  → index.html wird aus index.template.html + JSONs neu erzeugt
  → Netlify deployed das fertige HTML
```

Dadurch sind alle Inhalte — inklusive Meta-Tags, OG-Tags, Body-Text — direkt im HTML-Quellcode vorhanden. Suchmaschinen und Social-Media-Crawler sehen immer den aktuellen Stand.

---

## Inhalte bearbeiten (über das CMS)

1. https://abacus-webtesting.netlify.app/admin aufrufen
2. Mit Netlify Identity einloggen
3. **Homepage → Seiteninhalt**: Texte, Buttons, Kennzahlen, Karten, Testimonials, Kontaktdaten
4. **Homepage → Metadaten**: SEO-Titel, Meta Description, OG-Tags, Twitter Card, Robots
5. Speichern → Netlify deployed automatisch (~1–2 Min.)

---

## HTML-Struktur anpassen

Änderungen an Layout, Styling oder Seitenstruktur immer in `index.template.html` vornehmen — nie direkt in `index.html` (wird bei jedem Build überschrieben).

**Dynamische Werte** werden über `{{Platzhalter}}` eingesetzt:

```html
<!-- Beispiel: Text-Platzhalter -->
<h1 data-bind="hero.headline_main">{{hero.headline_main}}</h1>

<!-- Beispiel: Attribut-Platzhalter -->
<a href="{{contact.phone_tel}}">...</a>
```

Alle verfügbaren Platzhalter sind in `build.js` unter `textReplacements` und `rawReplacements` aufgelistet.

---

## Neuen Seitenbereich hinzufügen

Beispiel: Ein neuer Abschnitt „Team" soll zur Website.

**1. `content.json` — Datenstruktur ergänzen:**
```json
"team": {
  "badge": "Unser Team",
  "headline": "Die Menschen hinter Abacus",
  "items": [
    { "name": "Max Mustermann", "role": "Geschäftsführer" }
  ]
}
```

**2. `index.template.html` — HTML-Abschnitt mit Platzhaltern einfügen:**
```html
<section id="team">
  <p class="badge">{{team.badge}}</p>
  <h2>{{team.headline}}</h2>
  <div id="team-grid">{{TEAM_HTML}}</div>
</section>
```

**3. `build.js` — Platzhalter befüllen:**

Unter `textReplacements` ergänzen:
```js
'{{team.badge}}':    content.team.badge,
'{{team.headline}}': content.team.headline,
```

Unter `rawReplacements` eine HTML-Generator-Funktion ergänzen:
```js
'{{TEAM_HTML}}': buildTeamHtml(content.team.items),
```

Und die Funktion schreiben:
```js
function buildTeamHtml(items) {
  return items.map(p =>
    `<div class="card"><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p></div>`
  ).join('\n');
}
```

**4. `admin/config.yml` — CMS-Felder ergänzen:**
```yaml
- label: "Team"
  name: "team"
  widget: "object"
  collapsed: true
  fields:
    - { label: "Badge",      name: "badge",    widget: "string" }
    - { label: "Überschrift", name: "headline", widget: "string" }
    - label: "Mitglieder"
      name: "items"
      widget: "list"
      fields:
        - { label: "Name", name: "name", widget: "string" }
        - { label: "Rolle", name: "role", widget: "string" }
```

---

## Neue Metadaten hinzufügen

Beispiel: Schema Markup (strukturierte Daten für Google).

**1. `metadata.json` — Feld ergänzen:**
```json
"schema": {
  "type": "Organization",
  "name": "Abacus Solutions",
  "url": "https://abacus-webtesting.netlify.app"
}
```

**2. `index.template.html` — Platzhalter im `<head>` einfügen:**
```html
{{SCHEMA_TAG}}
```

**3. `build.js` — Platzhalter unter `rawReplacements` befüllen:**
```js
'{{SCHEMA_TAG}}': meta.schema
  ? `<script type="application/ld+json">\n${JSON.stringify(meta.schema, null, 2)}\n</script>\n`
  : '',
```

> Schema Markup und andere HTML-Blöcke kommen immer in `rawReplacements` (nicht `textReplacements`), weil sie bereits fertiges HTML sind und nicht nochmal escaped werden dürfen.

**4. `admin/config.yml` — CMS-Felder im Metadaten-Reiter ergänzen:**
```yaml
- label: "Schema Markup"
  name: "schema"
  widget: "object"
  collapsed: true
  fields:
    - { label: "Typ", name: "type", widget: "string" }
    - { label: "Name", name: "name", widget: "string" }
    - { label: "URL", name: "url", widget: "string" }
```

---

## CMS-Konfiguration anpassen (`admin/config.yml`)

Die Datei definiert, welche Felder im CMS angezeigt werden. Wichtige Widget-Typen:

| Widget     | Verwendung                          |
|------------|-------------------------------------|
| `string`   | Einzeiliger Text                    |
| `text`     | Mehrzeiliger Text                   |
| `image`    | Bildupload                          |
| `boolean`  | Ein/Aus-Schalter                    |
| `select`   | Dropdown mit festen Optionen        |
| `list`     | Wiederholbare Einträge (z.B. Karten)|
| `object`   | Gruppe von Feldern                  |

Jede Änderung an `admin/config.yml` ist sofort im CMS sichtbar nach dem nächsten Deploy.

---

## Bilder

Bilder werden im CMS hochgeladen und unter `images/uploads/` gespeichert. Im Template werden sie über ihren Pfad referenziert, z.B.:
```html
<img src="/images/uploads/beispiel.jpg" alt="..." />
```

---

## Lokaler Build (optional)

Um `index.html` lokal zu generieren (z.B. zur Überprüfung vor einem Commit):

```bash
node build.js
```

Voraussetzung: Node.js installiert, `content.json` und `metadata.json` vorhanden.

> Die generierte `index.html` ist in `.gitignore` und wird nicht committed — sie dient nur zur lokalen Kontrolle.

---

## Troubleshooting

**CMS-Login funktioniert nicht**
→ Netlify Identity muss für die Site aktiviert sein. Im Netlify Dashboard unter Identity prüfen.

**Änderungen erscheinen nicht auf der Website**
→ Im Netlify Dashboard unter „Deploys" prüfen ob der Build erfolgreich war. Bei Fehler: Build-Log lesen.

**Build schlägt fehl**
→ Häufigste Ursache: Fehler in `content.json` oder `metadata.json` (ungültiges JSON). Datei validieren unter z.B. jsonlint.com.

**Platzhalter erscheint unersetzt im HTML**
→ Platzhalter in `index.template.html` prüfen und sicherstellen, dass er exakt so in `build.js` unter `textReplacements` oder `rawReplacements` eingetragen ist.
