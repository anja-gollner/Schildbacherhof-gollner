// Einzige Quelle für alle Betriebsdaten: Adresse, Telefon, E-Mail, Öffnungszeiten,
// Social-Profile, Kartenlinks. Footer, Kontakt, Impressum, Datenschutz und die
// strukturierten Daten für Google lesen ausschließlich von hier.
//
// Grund: Vorher standen Telefonnummer und E-Mail an vier Stellen im Code — im
// Impressum eine andere als im Footer. Wer hier ändert, ändert überall.

const ADRESSE = {
  strasse: 'Schildbach 42',
  plz: '8230',
  ort: 'Hartberg',
  ortAmtlich: 'Hartberg U.',
  land: 'Österreich',
  landCode: 'AT'
}

// Für Kartenlinks: Name + volle Adresse, URL-sicher kodiert.
const ZIEL = encodeURIComponent(`Der Schildbacherhof, ${ADRESSE.strasse}, ${ADRESSE.plz} ${ADRESSE.ort}`)

export const BETRIEB = {
  name: 'Der Schildbacherhof',
  inhaberin: 'Margit Maria Gollner',
  seit: 1967,

  adresse: ADRESSE,
  adresseZeile: `${ADRESSE.strasse}, ${ADRESSE.plz} ${ADRESSE.ort}`,

  // Telefon: 'roh' für den tel:-Link, 'anzeige' für den Fließtext.
  telefonRoh: '+436641785544',
  telefon: '+43 664 1785544',
  email: 'office@schildbacherhof.at',

  uid: 'ATU67261599',
  behoerde: 'Bezirkshauptmannschaft Hartberg',

  domain: 'https://schildbacherhof.at',
  // Beim Teilen (WhatsApp, Facebook) angezeigtes Vorschaubild.
  vorschaubild: '/images/restaurant-exterior-night.jpg',

  kueche: 'Österreichisch, regional',
  preisklasse: '€€',

  karte: `https://www.google.com/maps/search/?api=1&query=${ZIEL}`,
  route: `https://www.google.com/maps/dir/?api=1&destination=${ZIEL}`,

  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/derschildbacherhof/' },
    { name: 'Facebook',  url: 'https://www.facebook.com/Schildbacherhof' }
  ]
}

// Öffnungszeiten in Minuten ab Mitternacht. Leere slots = Ruhetag.
// dow folgt JavaScript: 0 = Sonntag.
export const OEFFNUNGSZEITEN = [
  { lang: 'Montag',     kurz: 'Mo', dow: 1, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Dienstag',   kurz: 'Di', dow: 2, slots: [] },
  { lang: 'Mittwoch',   kurz: 'Mi', dow: 3, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Donnerstag', kurz: 'Do', dow: 4, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Freitag',    kurz: 'Fr', dow: 5, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Samstag',    kurz: 'Sa', dow: 6, slots: [[660, 900], [1020, 1290]] },
  { lang: 'Sonntag',    kurz: 'So', dow: 0, slots: [[660, 960]] }
]

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
