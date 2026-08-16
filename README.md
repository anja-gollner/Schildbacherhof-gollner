# Schildbacherhof — Website (Nuxt 3 + Tailwind)

Mehrseitige Marken-Website: Restaurant · Catering · Foodtruck · Gästezimmer · Events,
mit Wochenmenü/Speisekarte (PDF), Event-Übersicht (zeigt automatisch die kommenden Termine)
und Kontakt-/Anfrageformular. Deutsch, Domain `schildbacherhof.at`.

## Lokal starten
```bash
npm install
npm run dev        # http://localhost:3000
```

### Wenn `npm run dev` mit `Failed to resolve import "#app-manifest"` startet
Das passiert, wenn vorher `npm run generate` gelaufen ist: der Build schreibt
`.nuxt` um, und der Dev-Server startet dann auf einem veralteten Vite-Cache.
Kein echter Fehler im Code — einfach mit geleertem Cache starten:
```bash
npm run dev:clean
```

## Für FileZilla bauen (statisch)
```bash
npm run generate
```
Erzeugt den Ordner **`.output/public/`** — dessen **Inhalt** lädst du per FileZilla in den
Webspace-Stammordner. (Klassisches Hosting reicht, kein Node nötig.)

## Marken-Palette (tailwind.config.js)
cream `#F4EFE3` · beige `#E6DBC4` · terracotta `#C75A0B` · sage `#7D8169` · ink `#211C15`
Fonts: Fraunces (Display) + Inter (Text).

## Inhalte pflegen
- **CMS (empfohlen):** `https://schildbacherhof.at/admin/` — Events anlegen/bearbeiten,
  Bilder & Speisekarten-PDFs hochladen, ohne Code. Details in **[CMS.md](CMS.md)**.
- **Wochenmenü / Speisekarten:** über das CMS hochladen — der Dateiname der
  hochgeladenen Datei ist egal, das CMS legt sie richtig ab. Die Restaurant-Seite
  zeigt automatisch „Stand: <Datum>" und umgeht den Browser-Cache. Details unter
  *Speisekarte austauschen* in **[CMS.md](CMS.md)**.
- **Events:** `public/content/events.json` (oder bequem übers CMS). Jeder Eintrag hat
  `date` (ISO). Die Seite zeigt automatisch die **kommenden** Termine und blendet
  vergangene aus — nichts manuell löschen.

## Status
- **Phase 1 (fertig):** Setup, Design-System, Startseite (Hero + „Das Angebot"),
  alle Unterseiten inkl. Restaurant (Menü-PDFs), Events (auto-Filter), Kontaktformular-UI,
  Über uns, Impressum, Datenschutz.
- **Phase 2 (offen):** Inhalte/Fotos je Sektion ausbauen, Feinschliff Motion.
- **Phase 3 (fertig):** CMS unter `/admin` mit Login, Event-Editor (`api/events.php`),
  Bild- & PDF-Upload (`api/upload.php`) — siehe **[CMS.md](CMS.md)** — sowie Mailversand
  des Kontaktformulars (`api/contact.php`, Empfänger/Absender oben in der Datei einstellbar).

## Bilder & Logo
Alle Bilder liegen im Projekt unter `public/images/` und werden mitgebaut — es wird
nichts von extern nachgeladen.

Das Logo (`public/images/schildbacherhof-logo.png`) steckt in Header, Footer und als
Favicon (`public/favicon.ico`, `favicon-16/32.png`, `apple-touch-icon.png`).

Unbenutztes Rohmaterial (Originalfotos, HEICs, altes gollner-Logo) liegt in
`_quellmaterial/` — nur Archiv, wird nicht gebaut und nicht hochgeladen.
