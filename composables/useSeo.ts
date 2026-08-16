// Setzt Titel, Beschreibung, canonical und die Vorschau-Angaben fürs Teilen —
// pro Seite. Vorher standen Beschreibung und canonical global in nuxt.config,
// dadurch trug jede Unterseite denselben Text und verwies bei Google auf die
// Startseite (= Unterseiten wurden nicht indexiert).

import { BETRIEB, OEFFNUNGSZEITEN, zeitText } from './useBetrieb'

type SeoOptionen = {
  title: string        // erscheint im Browser-Tab und als Google-Überschrift
  description: string  // der Satz unter dem Treffer in der Google-Liste
  bild?: string        // abweichendes Vorschaubild, sonst das Haus bei Nacht
}

export function useSeo(o: SeoOptionen) {
  const route = useRoute()
  // Nuxt erzeugt Ordner-URLs ("/restaurant/"); für canonical ohne Slash,
  // die Startseite bleibt die nackte Domain.
  const pfad = route.path.replace(/\/+$/, '')
  const url = BETRIEB.domain + pfad
  const bild = BETRIEB.domain + (o.bild || BETRIEB.vorschaubild)

  useHead({
    title: o.title,
    meta: [
      { name: 'description', content: o.description },
      { property: 'og:title', content: o.title },
      { property: 'og:description', content: o.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: bild },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: o.title },
      { name: 'twitter:description', content: o.description },
      { name: 'twitter:image', content: bild }
    ],
    link: [{ rel: 'canonical', href: url || BETRIEB.domain }]
  })
}

// Strukturierte Daten: der unsichtbare Datenblock, aus dem Google Adresse,
// Öffnungszeiten und Telefonnummer für die Trefferanzeige liest.
export function useRestaurantSchema() {
  const TAGE = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

  const zeiten = OEFFNUNGSZEITEN.flatMap(t =>
    t.slots.map(s => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: TAGE[t.dow],
      opens: hhmm(s[0]),
      closes: hhmm(s[1])
    }))
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BETRIEB.name,
    description: `Restaurant, Wirtshaus und Gästezimmer in ${BETRIEB.adresse.ort}. Familie Gollner seit ${BETRIEB.seit}. Dazu Catering, Foodtruck und Events.`,
    url: BETRIEB.domain,
    telephone: BETRIEB.telefonRoh,
    email: BETRIEB.email,
    image: BETRIEB.domain + BETRIEB.vorschaubild,
    logo: BETRIEB.domain + '/images/schildbacherhof-logo.png',
    servesCuisine: BETRIEB.kueche,
    priceRange: BETRIEB.preisklasse,
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BETRIEB.adresse.strasse,
      postalCode: BETRIEB.adresse.plz,
      addressLocality: BETRIEB.adresse.ort,
      addressCountry: BETRIEB.adresse.landCode
    },
    openingHoursSpecification: zeiten,
    hasMenu: BETRIEB.domain + '/restaurant',
    sameAs: BETRIEB.social.map(s => s.url),
    founder: { '@type': 'Person', name: BETRIEB.inhaberin },
    foundingDate: String(BETRIEB.seit)
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }]
  })

  return { zeitText }
}
