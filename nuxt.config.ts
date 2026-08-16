// https://nuxt.com/docs/api/configuration/nuxt-config
import { mkdirSync, writeFileSync } from 'node:fs'
import { BETRIEB, OEFFNUNGSZEITEN } from './composables/useBetrieb'

// Das CMS zeigt bei den Basisdaten an, was gilt, solange nichts überschrieben
// ist. Diese Ausgangswerte werden hier beim Bauen aus useBetrieb.ts
// herausgeschrieben, statt sie im CMS ein zweites Mal einzutragen — sonst
// stünde irgendwann im CMS eine andere Telefonnummer als auf der Website,
// und genau diese Sorte Fehler soll useBetrieb.ts ja verhindern.
function vorgabeSchreiben() {
  const daten = {
    telefon: BETRIEB.telefon,
    telefonRoh: BETRIEB.telefonRoh,
    email: BETRIEB.email,
    adresse: {
      strasse: BETRIEB.adresse.strasse,
      plz: BETRIEB.adresse.plz,
      ort: BETRIEB.adresse.ort
    },
    social: Object.fromEntries(BETRIEB.social.map(s => [s.name, s.url])),
    oeffnung: OEFFNUNGSZEITEN.map(t => ({ dow: t.dow, lang: t.lang, slots: t.slots }))
  }
  mkdirSync('public/api', { recursive: true })
  writeFileSync('public/api/vorgabe.json', JSON.stringify(daten, null, 2) + '\n')
}

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  hooks: { 'build:before': vorgabeSchreiben },
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Schildbacherhof — Restaurant & Wirtshaus in Hartberg',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#211C15' },
        { property: 'og:site_name', content: 'Schildbacherhof' },
        { property: 'og:locale', content: 'de_AT' },
        { property: 'og:type', content: 'website' }
        // Titel, Beschreibung, canonical, og:url und og:image setzt useSeo()
        // pro Seite — global gesetzt würden alle Seiten dieselben Angaben tragen.
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Schriften liegen lokal (public/fonts) — keine Verbindung zu Google.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/fraunces-normal-latin.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/inter-normal-latin.woff2', crossorigin: '' }
      ]
    }
  }
})
