<template>
  <section class="relative min-h-screen flex items-end overflow-hidden">
    <!-- Hintergrundbild + Abdunklung -->
    <div class="absolute inset-0 z-0">
      <img src="/images/marquee/marquee-04.jpg" alt="" class="hero-zoom w-full h-full object-cover blur-[3px]" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/90"></div>
    </div>

    <div class="container-x relative z-10 pb-[12vh] pt-32 text-cream">
      <p v-reveal class="eyebrow text-cream/80 mb-5">Familie Gollner — seit 1967</p>

      <h1 class="font-display font-medium leading-[0.95] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
        <span v-reveal class="block">Gastfreundschaft,</span>
        <span v-reveal:120 class="block">neu erzählt.</span>
      </h1>

      <p v-reveal:240 class="mt-7 max-w-xl text-lg text-cream/85 leading-relaxed">
        Durchgehend dieselbe hochwertige Küche — dazu Catering, Foodtruck, Gästezimmer
        und besondere Abende. Ein Haus, viele Arten zu genießen. <span class="text-terracotta">Kapitel 2.</span>
      </p>

      <div v-reveal:360 class="mt-9 flex flex-wrap gap-3">
        <NuxtLink to="/kontakt" class="btn btn-primary">Tisch reservieren</NuxtLink>
        <NuxtLink to="/restaurant" class="btn btn-ghost border-cream/40 text-cream hover:text-terracotta hover:border-terracotta">Wochenmenü &amp; Karte</NuxtLink>
      </div>

      <div v-reveal:480 class="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[0.78rem] tracking-[0.12em] uppercase text-cream/60">
        <span>Restaurant</span><span>Catering</span><span>Foodtruck</span><span>Gästezimmer</span><span>Events</span>
      </div>
    </div>
  </section>
</template>
