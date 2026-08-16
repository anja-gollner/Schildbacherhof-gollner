<script setup>
useSeo({
  title: 'Familie Gollner seit 1967 — über den Schildbacherhof',
  description: 'Drei Generationen, eine Leidenschaft: Was 1967 als Wirtshaus begann, führt Margit Gollner heute mit Florian in der Küche und Anja im Digitalen weiter.',
  bild: '/images/family/family-hero.jpg'
})
const team = [
  { name: 'Margit Gollner', role: 'Herz des Hauses · Gastgeberin', img: '/images/family/family-4.jpg', pos: 'center 20%' },
  { name: 'Florian Gollner', role: 'Küchenchef · Kapitel 2', img: '/images/family/family-3.jpg', pos: 'center 20%' },
  { name: 'Anja Gollner', role: 'Brand & Digital · Kapitel 2', img: '/images/family/anja.jpg', pos: 'center bottom' }
]

// Team- und Hausaufnahmen
const teamBilder = [
  { src: '/images/family/family-hero.jpg', alt: 'Das Team des Schildbacherhofs im Gastraum' },
  { src: '/images/family/family-1.jpg',    alt: 'Das Küchenteam in der Küche des Schildbacherhofs' },
  { src: '/images/marquee/marquee-05.jpg', alt: 'Das Serviceteam an der Bar' },
  { src: '/images/family/family-2.jpg',    alt: 'Gastgeber im Gastraum' },
  { src: '/images/family/family-5.jpg',    alt: 'Im Gastraum des Schildbacherhofs' }
]
</script>
<template>
  <div>
    <PageHeader eyebrow="Familie Gollner — seit 1967" title="Kapitel 2."
      text="Drei Generationen, eine Leidenschaft: Was 1967 als Wirtshaus begann, prägt Margit heute neu — mit Florian in der Küche und Anja im Digitalen. Tradition, neu erzählt." />

    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-8 sm:grid-cols-3">
        <figure v-for="(p,i) in team" :key="p.name" v-reveal="i*100" class="group text-center">
          <div class="relative rounded-2xl overflow-hidden aspect-[4/5] bg-beige border border-ink/10 transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_45px_-22px_rgba(33,28,21,.55)]">
            <img :src="p.img" :alt="p.name" class="w-full h-full object-cover transition duration-[800ms] ease-out group-hover:scale-[1.06]" :style="{ objectPosition: p.pos }" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
          <figcaption class="mt-4">
            <div class="font-display text-2xl transition-colors duration-300 group-hover:text-terracotta">{{ p.name }}</div>
            <div class="eyebrow text-sage mt-1">{{ p.role }}</div>
          </figcaption>
        </figure>
      </div>

      <div class="container-x max-w-2xl mt-16">
        <p v-reveal class="font-display text-[clamp(1.4rem,3vw,2rem)] leading-snug">
          „Ein Wirtshaus lebt nicht von Wänden, sondern von Menschen."
        </p>
        <p v-reveal:100 class="mt-5 text-muted leading-relaxed">
          Seit 1967 steht der Schildbacherhof für Gastfreundschaft in Hartberg. Heute verbinden wir die
          Wirtshaus-Wurzeln mit einer modernen Handschrift — bodenständig, ehrlich, mit Liebe zum Detail.
        </p>
      </div>
    </section>

    <!-- Das Team dahinter -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow text-sage mb-3">Das Team</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-4">
          Die Menschen, die euch <span class="text-sage">bewirten.</span>
        </h2>
        <p v-reveal:80 class="text-cream/70 max-w-xl mb-12 leading-relaxed">
          Küche, Service und Gastgeberei greifen bei uns ineinander — die meisten
          Gesichter hier begleiten den Schildbacherhof schon lange.
        </p>

        <div class="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(g, i) in teamBilder" :key="g.src" v-reveal.scale="i * 80"
               class="group relative overflow-hidden rounded-2xl"
               :class="i === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'">
            <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-105">
              <img :src="g.src" :alt="g.alt" class="parallax-media w-full h-[116%] object-cover" />
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
          <p v-reveal class="eyebrow mb-2">Lernt uns kennen</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Kommt auf einen Teller vorbei.</h2>
        </div>
        <div v-reveal:120 class="flex flex-wrap gap-3">
          <NuxtLink to="/kontakt" class="btn btn-primary">Tisch reservieren</NuxtLink>
          <NuxtLink to="/restaurant" class="btn btn-ghost">Speisekarte ansehen</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
