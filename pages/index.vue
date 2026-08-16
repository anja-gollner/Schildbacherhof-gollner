<script setup>
useSeo({
  title: 'Schildbacherhof — Restaurant & Wirtshaus in Hartberg',
  description: 'Restaurant und Wirtshaus in Hartberg: mittags wie abends dieselbe regionale Küche. Dazu Gästezimmer, Catering, Foodtruck und Themenabende. Familie Gollner seit 1967.'
})

// Die drei Köpfe hinter Kapitel 2 — gekippt, überlappend, editorial
const team = [
  { name: 'Margit Gollner',  role: 'Gastgeberin',     img: '/images/family/family-4.jpg', pos: 'center 20%',    cls: 'w-28 sm:w-40 mt-12 rotate-[-5deg] z-10' },
  { name: 'Florian Gollner', role: 'Küchenchef',      img: '/images/family/family-3.jpg', pos: 'center 20%',    cls: 'w-36 sm:w-52 mt-0 rotate-[3deg] z-20 -ml-5 sm:-ml-9' },
  { name: 'Anja Gollner',    role: 'Brand & Digital', img: '/images/family/anja.jpg',     pos: 'center bottom', cls: 'w-32 sm:w-44 mt-16 rotate-[-3deg] z-10 -ml-5 sm:-ml-9' }
]

// Strukturierte Daten für Google (Adresse, Öffnungszeiten, Telefon, Profile)
useRestaurantSchema()

// Öffnungszeiten kommen aus useBetrieb, der Status inkl. Feiertagen/Urlaub
// aus useOeffnung. Beides steht nicht mehr hier im Code.
const tage = OEFFNUNGSZEITEN
const fmt = (t) => tagText(t)

const { ladeAusnahmen, status, ausnahmeFuer, kommendeAusnahmen } = useOeffnung()

// Live-Status nur clientseitig berechnen, sonst friert der Stand des Builds ein.
const mounted = ref(false)
const todayDow = ref(-1)
const openNow = ref(false)
const statusSub = ref('')
const statusGrund = ref('')

function computeStatus() {
  const jetzt = new Date()
  todayDow.value = jetzt.getDay()
  const s = status(jetzt)
  openNow.value = s.offen
  statusSub.value = s.zusatz
  statusGrund.value = s.grund
}

// Ist für einen Wochentag dieser Woche eine Ausnahme hinterlegt?
function ausnahmeAmTag(dow) {
  const jetzt = new Date()
  const diff = (dow - jetzt.getDay() + 7) % 7
  const tag = new Date(jetzt)
  tag.setDate(jetzt.getDate() + diff)
  return ausnahmeFuer(tag)
}

const datumKurz = (iso) => {
  const d = new Date(iso + 'T12:00')
  return isNaN(d) ? iso : d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit' })
}

let statusTimer
onMounted(async () => {
  computeStatus()
  mounted.value = true
  await ladeAusnahmen()
  computeStatus() // nach dem Laden neu rechnen — jetzt mit Ausnahmen
  statusTimer = setInterval(computeStatus, 60000)
})
onUnmounted(() => clearInterval(statusTimer))
</script>

<template>
  <div>
    <SiteHero />

    <!-- Kapitel-2-Intro -->
    <section class="relative bg-ink text-cream overflow-hidden py-24 md:py-32">
      <!-- großer, dezenter Hintergrund-Schriftzug -->
      <div aria-hidden="true"
           class="pointer-events-none select-none absolute -top-10 -right-2 md:right-6 leading-none font-display font-medium text-cream/[0.045] text-[34vw] md:text-[18rem]">
        1967
      </div>

      <div class="container-x relative">
        <div class="grid lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-16 items-center">
          <!-- Text -->
          <div>
            <p v-reveal class="eyebrow text-sage mb-5">Kapitel 2</p>
            <p v-reveal class="font-display text-[clamp(1.8rem,4.2vw,3.2rem)] leading-snug">
              Drei Generationen, eine Leidenschaft: Was 1967 begann, prägt Margit
              heute neu — <span class="text-terracotta">Tradition und Moderne</span>, vereint.
            </p>
            <p v-reveal:120 class="mt-6 text-cream/70 leading-relaxed max-w-xl">
              Ehrliche Produkte, regionale Wurzeln, ein Auge fürs Detail. Ob mittags, abends,
              Catering oder Foodtruck — bei uns schmeckt man durchgehend dieselbe Sorgfalt.
            </p>
            <NuxtLink to="/ueber-uns" v-reveal:200 class="mt-8 inline-flex items-center gap-2 font-display text-terracotta hover:gap-3 transition-all">
              Unsere Geschichte <span>→</span>
            </NuxtLink>
          </div>

          <!-- Die drei Köpfe — gekippt, überlappend, editorial -->
          <div v-reveal:160.right class="flex items-start justify-center lg:justify-end pt-2 mt-10 lg:mt-28">
            <figure v-for="p in team" :key="p.name" :class="p.cls"
                    class="group relative shrink-0 transition-transform duration-500 ease-out hover:rotate-0 hover:-translate-y-3 hover:z-30">
              <div class="relative overflow-hidden aspect-[3/4] bg-cream/5 ring-1 ring-cream/15 shadow-[0_22px_45px_-26px_rgba(0,0,0,.85)] transition-shadow duration-500 group-hover:shadow-[0_36px_70px_-30px_rgba(0,0,0,.95)]">
                <img :src="p.img" :alt="p.name"
                     class="w-full h-full object-cover grayscale-[40%] contrast-[1.03] transition duration-[900ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.08]"
                     :style="{ objectPosition: p.pos }" />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div class="absolute inset-x-0 bottom-0 p-3">
                  <div class="font-display text-sm leading-tight text-cream translate-y-1 transition-transform duration-500 group-hover:translate-y-0">{{ p.name }}</div>
                  <div class="eyebrow text-cream/65 text-[0.5rem] mt-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{{ p.role }}</div>
                </div>
              </div>
            </figure>
          </div>
        </div>

      </div>
    </section>

    <AngebotGrid />

    <!-- Öffnungszeiten -->
    <section class="relative bg-ink text-cream py-20 md:py-28 overflow-hidden">
      <!-- weicher Schein im Hintergrund -->
      <div aria-hidden="true" class="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl"></div>

      <div class="container-x relative grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        <!-- Links: Text + Live-Status -->
        <div>
          <p v-reveal class="eyebrow text-sage mb-4">Öffnungszeiten</p>
          <h2 v-reveal class="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight">
            Wann wir für euch da sind.
          </h2>

          <div v-if="mounted" v-reveal:80 class="mt-6 inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/[0.05] pl-3 pr-5 py-2">
            <span class="relative flex h-2.5 w-2.5">
              <span v-if="openNow" class="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-ping"></span>
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full" :class="openNow ? 'bg-sage' : 'bg-cream/40'"></span>
            </span>
            <span class="text-sm">
              <span class="font-display">{{ openNow ? 'Jetzt geöffnet' : 'Gerade geschlossen' }}</span>
              <span class="text-cream/55"> · {{ statusSub }}</span>
            </span>
          </div>

          <!-- Hinweis auf Feiertage / Urlaub, gepflegt im CMS -->
          <div v-if="mounted && kommendeAusnahmen.length" v-reveal:100
               class="mt-5 rounded-xl border border-terracotta/30 bg-terracotta/[0.07] px-4 py-3">
            <p class="eyebrow text-terracotta mb-1.5">Abweichende Zeiten</p>
            <ul class="text-sm text-cream/80 space-y-1">
              <li v-for="a in kommendeAusnahmen" :key="a.von" class="flex gap-2">
                <span class="tabular-nums text-cream/55 shrink-0">
                  {{ datumKurz(a.von) }}<template v-if="a.bis && a.bis !== a.von">–{{ datumKurz(a.bis) }}</template>
                </span>
                <span>
                  {{ a.text || (a.zu ? 'geschlossen' : 'geänderte Zeiten') }}
                  <template v-if="!a.zu && a.von_zeit"> · {{ a.von_zeit }}–{{ a.bis_zeit }}</template>
                  <template v-else-if="a.zu"> · geschlossen</template>
                </span>
              </li>
            </ul>
          </div>

          <p v-reveal:120 class="mt-6 text-cream/70 leading-relaxed max-w-md">
            Mittags und abends geöffnet, Dienstag ist Ruhetag. Für größere Runden
            und am Wochenende empfehlen wir eine Reservierung.
          </p>
          <NuxtLink to="/kontakt" v-reveal:200 class="btn btn-primary mt-7">Tisch reservieren</NuxtLink>
        </div>

        <!-- Rechts: Wochenplan -->
        <div v-reveal:120.right class="rounded-2xl border border-cream/15 bg-cream/[0.03] p-2 sm:p-3">
          <div v-for="t in tage" :key="t.dow"
               class="relative flex items-center justify-between gap-4 rounded-xl px-4 sm:px-5 py-3.5 transition-colors duration-300"
               :class="mounted && t.dow === todayDow ? 'bg-cream/[0.08]' : ''">
            <div class="flex items-center gap-3">
              <span class="font-display text-lg" :class="!t.slots.length ? 'text-cream/45' : ''">{{ t.lang }}</span>
              <span v-if="mounted && t.dow === todayDow"
                    class="eyebrow text-terracotta text-[0.58rem] border border-terracotta/40 rounded-full px-2 py-0.5 leading-none">Heute</span>
            </div>
            <!-- Liegt für diesen Tag eine Ausnahme vor, gilt sie statt des Wochenplans -->
            <span v-if="mounted && ausnahmeAmTag(t.dow)"
                  class="tabular-nums text-sm sm:text-base text-terracotta font-display text-right">
              {{ ausnahmeAmTag(t.dow).zu
                   ? (ausnahmeAmTag(t.dow).text || 'geschlossen')
                   : ausnahmeAmTag(t.dow).von_zeit + '–' + ausnahmeAmTag(t.dow).bis_zeit }}
            </span>
            <span v-else class="tabular-nums text-sm sm:text-base" :class="!t.slots.length ? 'text-terracotta font-display' : 'text-cream/85'">{{ fmt(t) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA-Band -->
    <section class="bg-beige py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow mb-2">Hungrig geworden?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Reserviert euren Tisch.</h2>
        </div>
        <div v-reveal:120 class="flex flex-wrap gap-3">
          <NuxtLink to="/kontakt" class="btn btn-primary">Anfrage senden</NuxtLink>
          <NuxtLink to="/restaurant" class="btn btn-ghost">Wochenmenü ansehen</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
