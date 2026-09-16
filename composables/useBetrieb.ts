// Einzige Quelle für alle Betriebsdaten: Adresse, Telefon, E-Mail, Öffnungszeiten,
// Social-Profile, Kartenlinks. Footer, Kontakt, Impressum, Datenschutz und die
// strukturierten Daten für Google lesen ausschließlich von hier.
//
// Grund: Vorher standen Telefonnummer und E-Mail an vier Stellen im Code — im
// Impressum eine andere als im Footer. Wer hier ändert, ändert überall.
//
// Die Werte hier sind der Ausgangsstand. Im CMS unter „Basisdaten" lassen sie
// sich am Server überschreiben; `plugins/stammdaten.client.ts` holt das beim
// Laden ab und schreibt es über das Objekt. Weil `BETRIEB` reaktiv ist, ziehen
// alle Stellen im Code automatisch nach — dort muss nichts angepasst werden.

// `reactive` wird in Nuxt sonst automatisch eingebunden. Hier steht der Import
// trotzdem, weil nuxt.config.ts diese Datei beim Bauen direkt lädt, um die
// Ausgangswerte fürs CMS herauszuschreiben — außerhalb von Nuxt gäbe es die
// automatische Einbindung nicht.
import { reactive } from 'vue'

const ADRESSE = {
  strasse: 'Schildbach 42',
  plz: '8230',
  ort: 'Hartberg',
  ortAmtlich: 'Hartberg U.',
  land: 'Österreich',
  landCode: 'AT'
}

export const BETRIEB = reactive({
  name: 'Der Schildbacherhof',
  inhaberin: 'Margit Maria Gollner',
  seit: 1967,

  adresse: ADRESSE,

  // Telefon: 'roh' für den tel:-Link, 'anzeige' für den Fließtext.
  telefonRoh: '+436641785544',
  telefon: '+43 664 1785544',
  email: 'anfragen@schildbacherhof.at',

  uid: 'ATU67261599',
  behoerde: 'Bezirkshauptmannschaft Hartberg',

  domain: 'https://schildbacherhof.at',
  // Beim Teilen (WhatsApp, Facebook) angezeigtes Vorschaubild.
  vorschaubild: '/images/restaurant-exterior-night.jpg',

  kueche: 'Österreichisch, regional',
  preisklasse: '€€',

  // Als Getter statt als fertiger Text: sonst würde eine im CMS geänderte
  // Adresse zwar im Impressum stehen, der Kartenlink aber weiter zur alten
  // führen. So wird bei jedem Zugriff neu aus der aktuellen Adresse gebaut.
  get adresseZeile(): string {
    return `${this.adresse.strasse}, ${this.adresse.plz} ${this.adresse.ort}`
  },
  get mapsZiel(): string {
    return encodeURIComponent(`${this.name}, ${this.adresseZeile}`)
  },
  get karte(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.mapsZiel}`
  },
  get route(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.mapsZiel}`
  },

  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/derschildbacherhof/' },
    { name: 'Facebook',  url: 'https://www.facebook.com/Schildbacherhof' }
  ]
})

// Öffnungszeiten in Minuten ab Mitternacht. Leere slots = Ruhetag.
// dow folgt JavaScript: 0 = Sonntag.
export const OEFFNUNGSZEITEN = reactive([
  { lang: 'Montag',     kurz: 'Mo', dow: 1, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Dienstag',   kurz: 'Di', dow: 2, slots: [] as number[][] },
  { lang: 'Mittwoch',   kurz: 'Mi', dow: 3, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Donnerstag', kurz: 'Do', dow: 4, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Freitag',    kurz: 'Fr', dow: 5, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Samstag',    kurz: 'Sa', dow: 6, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Sonntag',    kurz: 'So', dow: 0, slots: [[660, 960]] }
])

/**
 * Übernimmt die im CMS gespeicherten Basisdaten.
 *
 * Bewusst Feld für Feld statt per Object.assign: die gespeicherte Datei
 * enthält nur, was jemand geändert hat, und ein pauschales Zuweisen würde
 * z. B. beim Überschreiben der Adresse Land und Ortsangabe fürs Finanzamt
 * mitlöschen. Alles Unbekannte wird ignoriert.
 */
export function stammdatenUebernehmen(d: Record<string, any> | null | undefined): void {
  if (!d || typeof d !== 'object') return

  for (const k of ['telefon', 'telefonRoh', 'email'] as const) {
    if (typeof d[k] === 'string' && d[k]) BETRIEB[k] = d[k]
  }

  if (d.adresse && typeof d.adresse === 'object') {
    for (const k of ['strasse', 'plz', 'ort'] as const) {
      if (typeof d.adresse[k] === 'string' && d.adresse[k]) BETRIEB.adresse[k] = d.adresse[k]
    }
  }

  if (d.social && typeof d.social === 'object') {
    for (const eintrag of BETRIEB.social) {
      const url = d.social[eintrag.name]
      if (typeof url === 'string' && url) eintrag.url = url
    }
  }

  // Der Wochenplan kommt nur vollständig oder gar nicht — ein Tag ohne
  // Zeitfenster ist ein Ruhetag und damit eine echte Angabe, kein „fehlt".
  if (Array.isArray(d.oeffnung) && d.oeffnung.length === 7) {
    for (const tag of d.oeffnung) {
      const ziel = OEFFNUNGSZEITEN.find(t => t.dow === tag?.dow)
      if (ziel && Array.isArray(tag.slots)) ziel.slots = tag.slots
    }
  }
}

export function zeitText(m: number): string {
  const h = Math.floor(m / 60), mm = m % 60
  return mm ? `${h}:${String(mm).padStart(2, '0')}` : `${h}`
}

export function tagText(t: { slots: number[][] }): string {
  return t.slots.length
    ? t.slots.map(s => `${zeitText(s[0])}–${zeitText(s[1])}`).join(' · ')
    : 'Ruhetag'
}

// Fasst aufeinanderfolgende Tage mit gleichen Zeiten zusammen —
// aus sieben Zeilen wird "Mo · 11–15 · 17–21:30 / Di · Ruhetag / Mi–Sa · … / So · …".
// So steht die Kurzfassung im Footer nicht mehr als abgetippter Text im Code.
export function zeitenKompakt() {
  const gruppen: { von: string; bis: string; text: string; zu: boolean }[] = []
  for (const t of OEFFNUNGSZEITEN) {
    const text = tagText(t)
    const letzte = gruppen[gruppen.length - 1]
    if (letzte && letzte.text === text) letzte.bis = t.kurz
    else gruppen.push({ von: t.kurz, bis: t.kurz, text, zu: !t.slots.length })
  }
  return gruppen.map(g => ({
    tage: g.von === g.bis ? g.von : `${g.von}–${g.bis}`,
    text: g.text,
    zu: g.zu
  }))
}

export function useBetrieb() {
  return { BETRIEB, OEFFNUNGSZEITEN, zeitText, tagText, zeitenKompakt }
}
