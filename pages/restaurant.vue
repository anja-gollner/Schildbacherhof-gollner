<script setup>
useHead({ title: 'Restaurant & Wirtshaus — Schildbacherhof' })
const tab = ref('woche')
const menus = {
  woche:  { label: 'Wochenmenü',  src: '/pdf/wochenmenue.pdf' },
  carte:  { label: 'À la carte',  src: '/pdf/a-la-carte.pdf' }
}
const current = computed(() => menus[tab.value])

// Impressionen
const galerie = [
  '/images/dish-breakfast.jpg',
  '/images/platter-1.jpg',
  '/images/dish-burger.jpg',
  '/images/restaurant-bar.jpg',
  '/images/restaurant-exterior-day.jpg',
  '/images/dish-sandwich.jpg'
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Restaurant & Wirtshaus"
      title="Durchgehend hochwertig."
      image="/images/restaurant-exterior-night.jpg"
      text="Hochwertige regionale Küche, sorgfältig komponiert — aus einer Hand von Küchenchef Florian Gollner."
    />

    <!-- Eine Küche, ein Anspruch -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-8 md:grid-cols-2">
        <div v-reveal.left class="group rounded-2xl overflow-hidden bg-beige border border-ink/10 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-30px_rgba(33,28,21,.5)]">
          <div class="aspect-[16/10] overflow-hidden"><img src="/images/dish-schnitzel.jpg" alt="Wiener Schnitzel mit Pommes und Preiselbeeren" class="w-full h-full object-cover transition duration-[800ms] ease-out group-hover:scale-105"></div>
          <div class="p-7"><div class="eyebrow mb-2">Den ganzen Tag</div><h2 class="font-display text-3xl mb-2">Eine Küche</h2><p class="text-muted leading-relaxed">Regionale Produkte, frisch und sorgfältig zubereitet — zu jeder Tageszeit auf demselben Niveau.</p></div>
        </div>
        <div v-reveal:100.right class="group rounded-2xl overflow-hidden bg-ink text-cream transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-30px_rgba(0,0,0,.6)]">
          <div class="aspect-[16/10] overflow-hidden"><img src="/images/dish-crepe.jpg" alt="Fein angerichtetes Dessert" class="w-full h-full object-cover opacity-90 transition duration-[800ms] ease-out group-hover:scale-105 group-hover:opacity-100"></div>
          <div class="p-7"><div class="eyebrow text-sage mb-2">Immer</div><h2 class="font-display text-3xl mb-2">Ein Anspruch</h2><p class="text-cream/70 leading-relaxed">Sorgfältig komponiert, in entspannt-eleganter Atmosphäre — zu jeder Tageszeit auf demselben hohen Niveau.</p></div>
        </div>
      </div>
    </section>

    <!-- Impressionen -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow text-sage mb-3">Impressionen</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Vom Wirtshaus bis zum <span class="text-sage">Feinen.</span>
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

    <!-- Karten / Wochenmenü -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Speisekarten</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] mb-8">Wochenmenü &amp; Karte</h2>

        <!-- Segmented Tabs -->
        <div v-reveal class="inline-flex p-1 rounded-full bg-ink/[0.06] border border-ink/10 mb-6">
          <button v-for="(m, key) in menus" :key="key" @click="tab = key"
                  class="rounded-full px-5 py-2 text-sm font-display transition-colors duration-300"
                  :class="tab === key ? 'bg-ink text-cream' : 'text-ink/65 hover:text-ink'">{{ m.label }}</button>
        </div>

        <!-- Viewer-Karte mit Kopfleiste -->
        <div v-reveal class="rounded-2xl overflow-hidden border border-ink/15 bg-cream shadow-[0_30px_60px_-35px_rgba(33,28,21,.45)]">
          <div class="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-ink/10">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="h-2 w-2 rounded-full bg-terracotta shrink-0"></span>
              <span class="font-display text-lg truncate">{{ current.label }}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <a :href="current.src" target="_blank" rel="noopener" class="btn btn-ghost !py-1.5 !px-4 text-[0.82rem]">Neuer Tab ↗</a>
              <a :href="current.src" download class="btn btn-dark !py-1.5 !px-4 text-[0.82rem]">Herunterladen</a>
            </div>
          </div>
          <transition name="swap" mode="out-in">
            <iframe :key="tab" :src="current.src" :title="current.label" class="w-full block bg-cream" style="height:78vh"></iframe>
          </transition>
        </div>

        <p class="mt-4 text-muted text-sm">Die Karten werden laufend aktualisiert.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.swap-enter-active, .swap-leave-active { transition: opacity .35s ease; }
.swap-enter-from, .swap-leave-to { opacity: 0; }
</style>
