<script setup>
const saeulen = [
  { no: '01', title: 'Restaurant & Wirtshaus', text: 'Mittags wie abends dieselbe hochwertige, regionale Küche von Küchenchef Florian Gollner.', to: '/restaurant', img: '/images/marquee/marquee-01.jpg' },
  { no: '02', title: 'Catering', text: 'Von der Firmenfeier bis zur Hochzeit — wir bringen den Schildbacherhof zu euch.', to: '/catering', img: '/images/catering.jpg' },
  { no: '03', title: 'Foodtruck', text: 'Unsere Küche on the road — für Feste, Märkte und Events in der Region.', to: '/foodtruck', img: '/images/foodtruck.jpg' },
  { no: '04', title: 'Gästezimmer', text: 'Ankommen, bleiben, durchatmen. Gemütliche Zimmer mitten in der Oststeiermark.', to: '/zimmer', img: '/images/zimmer/zimmer-bett-hoch.jpg' },
  { no: '05', title: 'Events & Menüs', text: 'Candlelight Dinner, 4- bis 5-Gang-Abende und besondere Anlässe.', to: '/events', img: '/images/marquee/marquee-02.jpg' }
]

const sectionEl = ref(null)
const trackEl = ref(null)
const barEl = ref(null)

let distance = 0
let active = false
let raf = 0

const canPin = () =>
  window.matchMedia('(min-width: 1024px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function reset() {
  if (sectionEl.value) sectionEl.value.style.height = ''
  if (trackEl.value) trackEl.value.style.transform = ''
  if (barEl.value) barEl.value.style.transform = 'scaleX(0)'
}

function measure() {
  const section = sectionEl.value, track = trackEl.value
  if (!section || !track) return
  active = canPin()
  if (!active) { reset(); return }
  distance = Math.max(0, track.scrollWidth - track.clientWidth)
  if (distance === 0) { reset(); active = false; return }
  // Genau so viel zusätzliche Scrollhöhe, wie die Karten horizontal wandern
  section.style.height = (window.innerHeight + distance) + 'px'
  apply()
}

function apply() {
  const section = sectionEl.value, track = trackEl.value
  if (!section || !track || !active) return
  const scrolled = -section.getBoundingClientRect().top
  const p = Math.min(1, Math.max(0, distance ? scrolled / distance : 0))
  track.style.transform = `translate3d(${-p * distance}px,0,0)`
  if (barEl.value) barEl.value.style.transform = `scaleX(${p})`
}

function onScroll() {
  if (!active || raf) return
  raf = requestAnimationFrame(() => { raf = 0; apply() })
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure)
  setTimeout(measure, 300) // nach Font-/Layout-Load nachmessen
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measure)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section ref="sectionEl" class="relative bg-cream">
    <div class="relative flex flex-col justify-center gap-8 lg:gap-12 py-20 lg:py-0
                lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">

      <!-- Kopf -->
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Das Angebot</p>
        <h2 v-reveal class="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-tight max-w-2xl">
          Ein Haus — <span class="text-terracotta">fünf Arten</span> zu genießen.
        </h2>
        <!-- Fortschrittsbalken (Desktop) -->
        <div class="hidden lg:block mt-7 h-px w-44 bg-ink/15 overflow-hidden">
          <div ref="barEl" class="h-full bg-terracotta origin-left" style="transform:scaleX(0)"></div>
        </div>
      </div>

      <!-- Karten-Track -->
      <div ref="trackEl"
           class="flex gap-5 sm:gap-6 px-[6vw] lg:px-10 will-change-transform
                  overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar">
        <NuxtLink
          v-for="s in saeulen" :key="s.no" :to="s.to"
          class="group relative block shrink-0 snap-center lg:snap-align-none
                 w-[80vw] sm:w-[340px] lg:w-[24rem] aspect-[4/5]
                 overflow-hidden rounded-2xl bg-ink
                 transition-shadow duration-500 hover:shadow-[0_45px_75px_-38px_rgba(33,28,21,.75)]"
        >
          <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]">
            <img :src="s.img" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5 opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

          <span class="absolute top-4 right-5 font-display text-[2.7rem] leading-none text-cream/25 transition-colors duration-500 group-hover:text-terracotta/80">{{ s.no }}</span>

          <div class="absolute inset-x-0 bottom-0 p-6 text-cream">
            <h3 class="font-display text-2xl md:text-[1.7rem] leading-tight">{{ s.title }}</h3>
            <p class="text-[0.95rem] leading-relaxed text-cream/0 max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-32 group-hover:mt-2 group-hover:text-cream/80">
              {{ s.text }}
            </p>
            <span class="mt-4 inline-flex items-center gap-1.5 font-display text-sm text-sage transition-colors duration-300 group-hover:text-cream">
              Mehr erfahren
              <span class="text-terracotta transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </NuxtLink>

        <!-- kleiner End-Abstand, damit die letzte Karte nicht am Rand klebt -->
        <div class="shrink-0 w-[6vw] lg:w-6" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>
