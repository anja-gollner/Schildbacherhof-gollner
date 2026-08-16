// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Schildbacherhof — Restaurant & Wirtshaus in Hartberg',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#211C15' },
        { name: 'description', content: 'Schildbacherhof in Hartberg — Restaurant, Wirtshaus, Catering, Foodtruck, Gästezimmer & Events. Familie Gollner seit 1967, Kapitel 2.' },
        { property: 'og:site_name', content: 'Schildbacherhof' },
        { property: 'og:locale', content: 'de_AT' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://schildbacherhof.at' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: 'https://schildbacherhof.at' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500&display=swap' }
      ]
    }
  }
})
