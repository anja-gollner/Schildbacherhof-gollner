// Öffnungs-Status: rechnet den festen Wochenplan mit den im CMS gepflegten
// Ausnahmetagen (Feiertage, Urlaub, geschlossene Gesellschaft) zusammen.
//
// Alles läuft bewusst erst nach dem Laden im Browser (mounted), weil der Status
// von der aktuellen Uhrzeit abhängt — würde der Server ihn vorberechnen, stünde
// im ausgelieferten HTML für immer der Stand vom Zeitpunkt des Builds.

import { BETRIEB, OEFFNUNGSZEITEN, zeitText } from './useBetrieb'

type Ausnahme = {
  von: string; bis: string; text: string
  zu: boolean; von_zeit: string; bis_zeit: string
}

const alsDatum = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const zeitZuMinuten = (s: string) => {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}

export function useOeffnung() {
  const ausnahmen = useState<Ausnahme[]>('ausnahmen', () => [])

  async function ladeAusnahmen() {
    try {
      const d: any = await $fetch('/api/ausnahmen.php', { cache: 'no-cache' })
      if (d && Array.isArray(d.ausnahmen)) ausnahmen.value = d.ausnahmen
    } catch (e) {
      // Kein PHP (Dev-Server) oder Endpunkt fehlt: dann gilt nur der Wochenplan.
    }
  }

  /** Findet die Ausnahme, die auf ein Datum zutrifft — oder null. */
  function ausnahmeFuer(datum: Date): Ausnahme | null {
    const t = alsDatum(datum)
    return ausnahmen.value.find(a => a.von <= t && t <= (a.bis || a.von)) || null
  }

  /** Die tatsächlich geltenden Zeitfenster eines Tages, inkl. Ausnahmen. */
  function slotsFuer(datum: Date): number[][] {
    const a = ausnahmeFuer(datum)
    if (a) {
      if (a.zu) return []
      if (a.von_zeit && a.bis_zeit) return [[zeitZuMinuten(a.von_zeit), zeitZuMinuten(a.bis_zeit)]]
    }
    return OEFFNUNGSZEITEN.find(t => t.dow === datum.getDay())?.slots || []
  }

  /**
   * Aktueller Status. Gibt zusätzlich den Grund zurück, damit die Seite
   * "Betriebsurlaub" anzeigen kann statt nur "geschlossen".
   */
  function status(jetzt = new Date()) {
    const minuten = jetzt.getHours() * 60 + jetzt.getMinutes()
    const heute = slotsFuer(jetzt)
    const a = ausnahmeFuer(jetzt)

    const laufend = heute.find(s => minuten >= s[0] && minuten < s[1])
    if (laufend) {
      return { offen: true, zusatz: `bis ${zeitText(laufend[1])} Uhr`, grund: a?.text || '' }
    }

    // Nächste Öffnung suchen — bis zu 14 Tage voraus, damit auch ein
    // längerer Betriebsurlaub sauber überbrückt wird.
    for (let off = 0; off <= 14; off++) {
      const tag = new Date(jetzt)
      tag.setDate(jetzt.getDate() + off)
      const slots = slotsFuer(tag)
      if (!slots.length) continue
      const slot = off === 0 ? slots.find(s => s[0] > minuten) : slots[0]
      if (!slot) continue

      const wochentag = OEFFNUNGSZEITEN.find(t => t.dow === tag.getDay())?.lang || ''
      const wann = off === 0 ? 'um'
                 : off === 1 ? 'morgen um'
                 : off <= 6  ? `${wochentag} um`
                 : `am ${tag.getDate()}.${tag.getMonth() + 1}. um`
      return {
        offen: false,
        zusatz: `öffnet ${wann} ${zeitText(slot[0])} Uhr`,
        grund: a?.text || ''
      }
    }

    return { offen: false, zusatz: '', grund: a?.text || '' }
  }

  /** Kommende Ausnahmen für den Hinweis auf der Startseite. */
  const kommendeAusnahmen = computed(() => ausnahmen.value.slice(0, 3))

  return { ausnahmen, ladeAusnahmen, ausnahmeFuer, slotsFuer, status, kommendeAusnahmen, BETRIEB }
}
