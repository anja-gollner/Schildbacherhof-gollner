<script setup>
useSeo({
  title: 'Catering für Hochzeit & Firmenfeier — Hartberg & Oststeiermark',
  description: 'Fingerfood, Buffet, Mehrgang-Menü oder Grill — wir bringen den Schildbacherhof zu euch. Inklusive Service, Geschirr und Getränken auf Wunsch.',
  bild: '/images/catering.jpg'
})

// Was wir anbieten
const leistungen = [
  { title: 'Fingerfood & Flying Buffet', text: 'Elegante Häppchen und Kleinigkeiten zum Empfang oder Stehen — ideal für lockere Anlässe.' },
  { title: 'Buffet, warm & kalt',        text: 'Reichhaltige Buffets aus regionalen Produkten, abgestimmt auf Gästezahl und Anlass.' },
  { title: 'Mehrgang-Menü & Galadinner', text: 'Serviertes Menü in mehreren Gängen — für Hochzeiten und festliche Abende auf höchstem Niveau.' },
  { title: 'Grill & BBQ',                text: 'Vom Spanferkel bis zum modernen Grillbuffet — herzhaft, frisch und vor Ort zubereitet.' },
  { title: 'Getränke & Bar',             text: 'Auf Wunsch inkl. Getränkeservice und Bar — von Aperitif bis Digestif.' },
  { title: 'Service & Equipment',        text: 'Service-Personal, Geschirr, Gläser und Mobiliar — modular nach eurem Bedarf.' }
]

// Anlässe
const anlaesse = ['Hochzeit', 'Firmenfeier & Business', 'Geburtstag & Jubiläum', 'Verein & Fest', 'Taufe · Kommunion · Firmung', 'Trauerfeier & Agape']

// Ablauf
const ablauf = [
  { title: 'Anfrage', text: 'Anlass, Datum, Ort und ungefähre Gästezahl — kurz an uns.' },
  { title: 'Beratung & Menü', text: 'Wir stimmen Menü, Service und Budget gemeinsam mit euch ab.' },
  { title: 'Angebot', text: 'Ihr bekommt ein unverbindliches, transparentes Angebot.' },
  { title: 'Euer Fest', text: 'Anlieferung, Aufbau, Service und Abbau — ihr genießt, wir kümmern uns.' }
]

// Gut zu wissen (bitte konkrete Angaben prüfen)
const fakten = [
  { label: 'Gästezahl', text: 'Von der kleinen Feier bis zu mehreren Hundert Gästen.' },
  { label: 'Einzugsgebiet', text: 'Hartberg & Oststeiermark — weitere Strecken auf Anfrage.' },
  { label: 'Vorlauf', text: 'Idealerweise einige Wochen; große Feste bitte früher anfragen.' },
  { label: 'Ernährung', text: 'Vegetarisch, vegan & Allergien berücksichtigen wir gerne.' }
]

// FAQ
const faqs = [
  { q: 'Ab wie vielen Personen macht ihr Catering?', a: 'Von der kleinen Feier zu Hause bis zum großen Fest — sagt uns eure Gästezahl, wir finden das passende Format.' },
  { q: 'Wie weit im Voraus soll ich anfragen?', a: 'Je früher, desto besser. Für größere Feste und beliebte Termine (z. B. Hochzeitssaison) empfehlen wir einige Wochen bis Monate Vorlauf.' },
  { q: 'Welches Gebiet beliefert ihr?', a: 'Rund um Hartberg und die Oststeiermark — weitere Strecken gerne auf Anfrage.' },
  { q: 'Stellt ihr auch Personal, Geschirr und Getränke?', a: 'Ja. Auf Wunsch inklusive Service-Personal, Geschirr, Gläsern, Mobiliar und Getränken — alles modular nach eurem Bedarf.' },
  { q: 'Berücksichtigt ihr vegetarische/vegane Wünsche und Allergien?', a: 'Selbstverständlich. Sagt uns Vorlieben und Unverträglichkeiten, wir planen das Menü entsprechend.' },
  { q: 'Wie bekomme ich ein Angebot?', a: 'Schickt uns eure Eckdaten über das Anfrageformular — ihr erhaltet ein unverbindliches, transparentes Angebot.' }
]

const openFaq = ref(0)
const toggle = (i) => openFaq.value = openFaq.value === i ? -1 : i

// Galerie — echte Catering-Fotos
const galerie = [
  '/images/catering-buffet-2.jpg',
  '/images/catering-buffet-3.jpg',
  '/images/catering-grill.jpg',
  '/images/dish-breakfast.jpg',
  '/images/dish-crepe.jpg',
  '/images/dish-schnitzel.jpg'
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Catering" title="Wir kommen zu euch." image="/images/catering.jpg"
      text="Firmenfeier, Hochzeit, Geburtstag oder Vereinsfest — wir bringen die Küche des Schildbacherhofs an euren Ort, in eurer Größe." />

    <!-- Intro -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-10 md:grid-cols-2 items-center">
        <div v-reveal.left class="group relative overflow-hidden rounded-2xl aspect-[4/3]">
          <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-105">
            <img src="/images/catering-buffet-1.jpg" alt="Catering-Buffet des Schildbacherhofs"
                 class="parallax-media w-full h-[116%] object-cover" />
          </div>
        </div>
        <div v-reveal:100.right>
          <p class="eyebrow text-sage mb-3">Von Fingerfood bis Galadinner</p>
          <h2 class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-4">Euer Anlass, unsere Küche.</h2>
          <p class="text-muted leading-relaxed mb-4">Wir planen das Menü mit euch, kümmern uns um Anlieferung, Aufbau und Service — abgestimmt auf Anlass, Gästezahl und Budget. Regionale Produkte, sorgfältig zubereitet.</p>
          <p class="text-muted leading-relaxed mb-6">Größere Caterings &amp; Feste begleiten wir teilweise gemeinsam mit der
            <a href="https://gollner-gastro.at" target="_blank" rel="noopener" class="text-terracotta underline underline-offset-2 hover:text-ink transition-colors">Gollner Gastro GmbH</a>;
            der Schildbacherhof bleibt ansonsten eigenständig.</p>
          <NuxtLink to="/kontakt" class="btn btn-primary">Catering anfragen</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Leistungen -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Unser Angebot</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Alles aus <span class="text-sage">einer Hand.</span>
        </h2>

        <div class="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(l, i) in leistungen" :key="l.title" v-reveal.scale="i * 70"
               class="group rounded-2xl bg-cream border border-ink/10 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-32px_rgba(33,28,21,.4)]">
            <span class="grid h-8 w-8 rounded-full bg-sage/15 text-sage font-display place-items-center mb-4 transition-colors duration-300 group-hover:bg-sage group-hover:text-cream">{{ i + 1 }}</span>
            <h3 class="font-display text-xl leading-tight mb-2">{{ l.title }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ l.text }}</p>
          </div>
        </div>

        <!-- Anlässe -->
        <div class="mt-12">
          <p v-reveal class="eyebrow mb-4">Für jeden Anlass</p>
          <div v-reveal:80 class="flex flex-wrap gap-2.5">
            <span v-for="a in anlaesse" :key="a"
                  class="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-display text-ink/80">{{ a }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Ablauf -->
    <section class="relative bg-ink text-cream py-20 md:py-28 overflow-hidden">
      <span aria-hidden="true" class="parallax-y pointer-events-none absolute -right-4 top-4 font-display font-medium text-cream/[0.04] text-[24vw] leading-none select-none">Fest</span>
      <div class="container-x relative">
        <p v-reveal class="eyebrow text-sage mb-3">So läuft's</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          In vier Schritten zum Fest.
        </h2>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(s, i) in ablauf" :key="s.title" v-reveal="i * 90" class="relative">
            <div class="font-display text-terracotta text-4xl leading-none mb-4">0{{ i + 1 }}</div>
            <h3 class="font-display text-xl mb-2">{{ s.title }}</h3>
            <p class="text-cream/70 leading-relaxed text-[0.95rem]">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gut zu wissen + FAQ -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <!-- Fakten -->
        <div>
          <p v-reveal class="eyebrow mb-3">Gut zu wissen</p>
          <h2 v-reveal class="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight mb-8">Das Wichtigste vorab.</h2>
          <div class="space-y-5">
            <div v-for="(f, i) in fakten" :key="f.label" v-reveal="i * 70" class="flex gap-4 border-t border-ink/10 pt-5">
              <span class="mt-1 h-2 w-2 rounded-full bg-sage shrink-0"></span>
              <div>
                <div class="font-display text-lg leading-tight">{{ f.label }}</div>
                <p class="text-muted leading-relaxed text-[0.95rem] mt-1">{{ f.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div>
          <p v-reveal class="eyebrow mb-3">Häufige Fragen</p>
          <h2 v-reveal class="font-display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight mb-8">Ihr fragt, wir antworten.</h2>
          <div v-reveal class="divide-y divide-ink/10 border-t border-ink/10">
            <div v-for="(f, i) in faqs" :key="i">
              <button type="button" @click="toggle(i)"
                      class="w-full flex items-center justify-between gap-4 py-5 text-left group">
                <span class="font-display text-lg leading-tight transition-colors duration-300"
                      :class="openFaq === i ? 'text-terracotta' : 'group-hover:text-terracotta'">{{ f.q }}</span>
                <span class="shrink-0 text-terracotta text-xl transition-transform duration-300"
                      :class="openFaq === i ? 'rotate-45' : ''">+</span>
              </button>
              <div class="overflow-hidden transition-all duration-500 ease-out"
                   :class="openFaq === i ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'">
                <p class="text-muted leading-relaxed pr-8">{{ f.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impressionen (PLATZHALTER-Fotos ersetzen) -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow text-sage mb-3">Impressionen</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Ein paar <span class="text-sage">Eindrücke.</span>
        </h2>
        <div class="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(g, i) in galerie" :key="i" v-reveal.scale="i * 70"
               class="group relative overflow-hidden rounded-2xl aspect-[4/3]">
            <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-105">
              <img :src="g" alt="" class="parallax-media w-full h-[116%] object-cover" />
            </div>
            <div class="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-beige py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow mb-2">Bereit zu feiern?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Holt euch euer Angebot.</h2>
        </div>
        <NuxtLink to="/kontakt" v-reveal:120 class="btn btn-primary">Catering anfragen</NuxtLink>
      </div>
    </section>
  </div>
</template>
