<script setup>
useHead({ title: 'Über uns — Familie Gollner seit 1967' })
const team = [
  { name: 'Margit Gollner', role: 'Herz des Hauses · Gastgeberin', img: '/images/family/family-4.jpg', pos: 'center 20%' },
  { name: 'Florian Gollner', role: 'Küchenchef · Kapitel 2', img: '/images/family/family-3.jpg', pos: 'center 20%' },
  { name: 'Anja Gollner', role: 'Brand & Digital · Kapitel 2', img: '/images/family/anja.jpg', pos: 'center bottom' }
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
  </div>
</template>
