<script setup>
useSeo({
  title: 'Gästezimmer in Hartberg — Schildbacherhof',
  description: 'Sechs Gästezimmer direkt an der B54, Parkplatz vor der Tür, Restaurant im Haus. 75 € pro Person inklusive Frühstück.',
  bild: '/images/zimmer/zimmer-bett-fenster.jpg'
})

// Drei Blicke ins Zimmer — bewusst nur drei, nicht die ganze Galerie.
// Die Seite soll zeigen, was einen erwartet, nicht jede Ecke dokumentieren.
const einblicke = [
  { bild: '/images/zimmer/zimmer-sitzecke.jpg', alt: 'Sitzecke mit Schlafsofa, Schreibtisch und Fernseher',
    titel: 'Sitzecke & Schreibtisch', text: 'Zum Arbeiten, Lesen oder einfach Ankommen.' },
  { bild: '/images/zimmer/zimmer-bad.jpg', alt: 'Bad mit ebenerdiger Dusche und Waschbecken',
    titel: 'Bad mit Dusche', text: 'Hell, ebenerdig, Föhn inklusive.' },
  { bild: '/images/zimmer/zimmer-zirbe.jpg', alt: 'Kleiderschrank und Garderobe aus Zirbenholz',
    titel: 'Zirbenholz', text: 'Bett, Schrank und Garderobe — aus heimischem Holz.' }
]

const vorteile = [
  { title: 'Verkehrsgünstig an der B54', text: 'Direkt an der Bundesstraße — leicht zu finden und bestens angebunden Richtung Hartberg und A2.' },
  { title: 'Parken vor der Tür',         text: 'Stellplätze direkt am Haus. Ankommen, ausladen, einchecken — ohne Parkplatzsuche.' },
  { title: 'Restaurant im Haus',         text: 'Abends gut essen und einfach oben schlafen — kein Autofahren mehr nach dem Dinner.' },
  { title: 'Für Reisende & Business',    text: 'Unkomplizierte Übernachtung für Durchreisende, Monteure und Geschäftsgäste.' },
  { title: 'Zentral in der Region',      text: 'Guter Ausgangspunkt für Termine, Ausflüge und die ganze Oststeiermark.' },
  { title: 'Unkompliziert',              text: 'Einfache Anfrage, flexible Absprache, schnelles Ein- und Auschecken.' }
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Gästezimmer" title="Zentral & unkompliziert." image="/images/zimmer/zimmer-bett-fenster.jpg"
      text="Direkt an der B54 — top angebunden, leicht zu finden und ideal, wenn ihr nach einem guten Abend einfach bleiben oder auf der Durchreise praktisch übernachten wollt." />

    <!-- Intro -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-10 md:grid-cols-2 items-center">
        <div v-reveal.left class="group overflow-hidden rounded-2xl aspect-[4/3]">
          <img src="/images/zimmer/zimmer-bett.jpg" alt="Doppelzimmer mit Bett aus Zirbenholz"
               class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
        </div>
        <div v-reveal:100.right>
          <p class="eyebrow text-sage mb-3">Ankommen & bleiben</p>
          <h2 class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-4">Mitten im Geschehen — nicht abgelegen.</h2>
          <p class="text-muted leading-relaxed mb-4">Unsere sechs Gästezimmer sind perfekt für alle, die es praktisch mögen: gut erreichbar, direkt am Haus geparkt, und mit dem Restaurant nur eine Treppe entfernt.</p>

          <!-- Preis und Zimmerzahl auf einen Blick — die zwei Angaben, nach denen
               zuerst gesucht wird, bevor überhaupt jemand anfragt. -->
          <dl class="grid grid-cols-2 gap-4 my-7 max-w-sm">
            <div class="rounded-xl bg-beige border border-ink/10 px-4 py-3">
              <dt class="eyebrow text-sage mb-1">Zimmer</dt>
              <dd class="font-display text-2xl m-0">6</dd>
            </div>
            <div class="rounded-xl bg-beige border border-ink/10 px-4 py-3">
              <dt class="eyebrow text-sage mb-1">Pro Person</dt>
              <dd class="font-display text-2xl m-0">75&nbsp;€</dd>
            </div>
          </dl>
          <p class="text-muted leading-relaxed mb-6">
            <strong class="text-ink">75 € pro Person inklusive Frühstück.</strong>
            Schreibt uns euren Wunschzeitraum und die Personenzahl — wir prüfen die
            Verfügbarkeit und melden uns mit einem Angebot.
          </p>
          <NuxtLink to="/kontakt" class="btn btn-primary">Zimmer anfragen</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Einblicke -->
    <section class="bg-cream pb-20 md:pb-28">
      <div class="container-x">
        <p v-reveal class="eyebrow text-sage mb-3">Ein Blick hinein</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-10">
          Schlicht, hell, aus Holz.
        </h2>
        <div class="grid gap-5 sm:gap-6 sm:grid-cols-3">
          <figure v-for="(e, i) in einblicke" :key="e.titel" v-reveal="i * 90" class="group m-0">
            <div class="overflow-hidden rounded-2xl aspect-[4/5]">
              <img :src="e.bild" :alt="e.alt" loading="lazy"
                   class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
            </div>
            <figcaption class="mt-4">
              <h3 class="font-display text-xl leading-tight">{{ e.titel }}</h3>
              <p class="text-muted text-[0.95rem] leading-relaxed mt-1">{{ e.text }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Vorteile -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Warum bei uns</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Praktisch übernachten, <span class="text-sage">bestens angebunden.</span>
        </h2>

        <div class="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(v, i) in vorteile" :key="v.title" v-reveal.scale="i * 70"
               class="group rounded-2xl bg-cream border border-ink/10 p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-32px_rgba(33,28,21,.4)]">
            <span class="grid h-8 w-8 rounded-full bg-sage/15 text-sage font-display place-items-center mb-4 transition-colors duration-300 group-hover:bg-sage group-hover:text-cream">{{ i + 1 }}</span>
            <h3 class="font-display text-xl leading-tight mb-2">{{ v.title }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ink text-cream py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow text-sage mb-2">Übernachten?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Fragt euer Zimmer an.</h2>
        </div>
        <NuxtLink to="/kontakt" v-reveal:120 class="btn btn-primary">Zimmer anfragen</NuxtLink>
      </div>
    </section>
  </div>
</template>
