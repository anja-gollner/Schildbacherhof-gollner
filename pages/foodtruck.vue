<script setup>
useHead({ title: 'Foodtruck — Schildbacherhof' })

// Menükarte fürs Scrollytelling
const menu = [
  { title: 'Burger & Pommes',        text: 'Saftige Burger, frisch gebraten, mit knusprigen Pommes — der Klassiker vom Truck.', img: '/images/dish-burger.jpg' },
  { title: 'Baguettes & Sandwiches', text: 'Herzhaft belegt, warm und frisch zubereitet — zum Reinbeißen.', img: '/images/dish-sandwich.jpg' },
  { title: 'Vom Grill',              text: 'Gegrilltes vom Feinsten, direkt vor euren Augen zubereitet.', img: '/images/catering-grill.jpg' },
  { title: 'Loaded & Snacks',        text: 'Kleine Sünden für zwischendurch — ideal für Feste und Märkte.', img: '/images/dish-burger-2.jpg' },
  { title: 'Herzhafte Klassiker',    text: 'Schnitzel, Pommes & Co. — solide Küche, wie man sie liebt.', img: '/images/dish-schnitzel.jpg' }
]

const anlaesse = ['Feste', 'Märkte', 'Firmenevents', 'Vereinsfeste', 'Hochzeiten', 'Private Anlässe']

// So funktioniert's
const ablauf = [
  { t: 'Anfrage',            d: 'Anlass, Datum, Ort und ungefähre Gästezahl an uns.' },
  { t: 'Standort & Strom',   d: 'Wir klären gemeinsam Stellplatz, Zufahrt und Stromanschluss.' },
  { t: 'Angebot',            d: 'Ihr bekommt ein unverbindliches Angebot mit eurem Wunschmenü.' },
  { t: 'Wir kommen & kochen', d: 'Der Truck rollt an, wir kochen frisch vor Ort — ihr genießt.' }
]

const active = ref(0)
const itemsWrap = ref(null)
let io
onMounted(() => {
  const els = itemsWrap.value?.querySelectorAll('[data-idx]') || []
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) active.value = Number(e.target.dataset.idx) })
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
  els.forEach(el => io.observe(el))
})
onUnmounted(() => io && io.disconnect())
</script>

<template>
  <div class="bg-cream text-ink">
    <PageHeader eyebrow="Foodtruck" title="Küche on the road." image="/images/foodtruck.jpg"
      text="Frisch Gekochtes, direkt dorthin, wo gefeiert wird — für Feste, Märkte und private Anlässe." />

    <!-- Unser Truck + Vorgehensweise -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
        <!-- ganzes Foto -->
        <div v-reveal.left class="group overflow-hidden rounded-2xl aspect-[3/4] max-w-md w-full mx-auto lg:mx-0">
          <img src="/images/foodtruck.jpg" alt="Der Foodtruck-Anhänger des Schildbacherhofs"
               class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
        </div>

        <!-- Vorgehensweise -->
        <div v-reveal:100.right>
          <p class="eyebrow text-sage mb-3">Unser Truck</p>
          <h2 class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-5">So kommt der Truck zu euch.</h2>

          <ol class="space-y-5 mb-8">
            <li v-for="(s, i) in ablauf" :key="s.t" class="flex gap-4">
              <span class="grid h-8 w-8 shrink-0 rounded-full bg-sage/15 text-sage font-display place-items-center">{{ i + 1 }}</span>
              <div>
                <div class="font-display text-lg leading-tight">{{ s.t }}</div>
                <p class="text-muted leading-relaxed text-[0.95rem] mt-0.5">{{ s.d }}</p>
              </div>
            </li>
          </ol>

          <div class="rounded-xl border-l-2 border-terracotta bg-beige/60 px-5 py-4 mb-8">
            <p class="text-[0.95rem] leading-relaxed">
              <span class="font-display">Gut vorbereitet:</span> Am Veranstaltungsort sollten ein
              <strong>Stromanschluss</strong> und etwas <strong>Platz für den Anhänger</strong> (inkl. Zufahrt)
              vorhanden sein. Alles Weitere besprechen wir vorab.
            </p>
          </div>

          <NuxtLink to="/kontakt" class="btn btn-primary">Foodtruck anfragen</NuxtLink>
        </div>
      </div>
    </section>

    <!-- SCROLLYTELLING MENÜ -->
    <section class="relative bg-cream">
      <div class="container-x grid lg:grid-cols-2 gap-10 lg:gap-16">
        <!-- Sticky Bild (Desktop) -->
        <div class="hidden lg:block">
          <div class="sticky top-0 h-screen flex items-center py-12">
            <div class="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-ink/10 shadow-[0_40px_80px_-45px_rgba(33,28,21,.55)]">
              <img v-for="(m, i) in menu" :key="i" :src="m.img" alt=""
                   class="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                   :class="active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'" />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 font-display text-terracotta text-5xl">0{{ active + 1 }}</div>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div ref="itemsWrap" class="py-[6vh] lg:py-0">
          <div v-for="(m, i) in menu" :key="i" :data-idx="i"
               class="menu-item min-h-[46vh] lg:min-h-[64vh] flex flex-col justify-center border-t border-ink/10 transition-opacity duration-500"
               :class="active === i ? 'opacity-100' : 'lg:opacity-30'">
            <div class="lg:hidden rounded-2xl overflow-hidden aspect-[4/3] mb-5 max-w-sm">
              <img :src="m.img" alt="" class="w-full h-full object-cover" />
            </div>
            <div class="font-display text-terracotta text-xl mb-2">0{{ i + 1 }}</div>
            <h3 class="font-display leading-[0.95] text-[clamp(1.9rem,4vw,3.2rem)] mb-4">{{ m.title }}</h3>
            <p class="text-muted leading-relaxed max-w-md">{{ m.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE 2 (Anlässe) -->
    <div class="marquee bg-sage text-cream py-3 border-y border-cream/10">
      <div class="marquee-track marquee-reverse font-display text-xl md:text-2xl">
        <span v-for="n in 2" :key="n" class="flex shrink-0">
          <span v-for="a in anlaesse" :key="a" class="px-6">{{ a }} ✦</span>
        </span>
      </div>
    </div>

    <!-- CTA -->
    <section class="bg-beige py-20 md:py-28 text-center">
      <div class="container-x">
        <p v-reveal class="eyebrow text-terracotta mb-4">Truck gefällig?</p>
        <h2 v-reveal class="font-display leading-[0.95] text-[clamp(2rem,6vw,4.5rem)] mb-7">
          Holt euch <span class="text-terracotta">den Truck.</span>
        </h2>
        <NuxtLink v-reveal:120 to="/kontakt" class="btn btn-primary">Foodtruck anfragen →</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Marquee */
.marquee { overflow: hidden; white-space: nowrap; }
.marquee-track { display: inline-flex; animation: marquee 26s linear infinite; }
.marquee-reverse { animation-direction: reverse; }
@keyframes marquee { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>
