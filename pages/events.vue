<script setup>
useSeo({
  title: 'Events, Menüabende & Feiern — Schildbacherhof',
  description: 'Candlelight Dinner, Business Dinner, Geburtstagstafeln und Firmenfeiern richten wir ganzjährig aus. Dazu unsere saisonalen Themenabende in Hartberg.',
  bild: '/images/marquee/marquee-07.jpg'
})
const { upcoming, loaded, load, formatDate } = useEvents()
onMounted(load)

// Formate, die wir ganzjährig auf Anfrage ausrichten
const formate = [
  { title: 'Candlelight Dinner', text: 'Mehrgängiges Menü bei Kerzenschein — der Klassiker zu zweit oder in kleiner Runde, ganz nach eurem Wunsch.' },
  { title: 'Business Dinner',    text: 'Geschäftsessen in stilvollem Rahmen — diskret, pünktlich, mit einem Menü nach Absprache.' },
  { title: 'Geburtstagstafeln',  text: 'Von der kleinen Feier bis zur großen Tafel — wir decken festlich auf, ihr stoßt an.' },
  { title: 'Agape & Trauerfeiern', text: 'Ein würdevoller Rahmen zum Gedenken — um die Bewirtung kümmern wir uns einfühlsam.' },
  { title: 'Firmenfeiern',       text: 'Weihnachtsfeier, Jubiläum oder Teamabend — vom lockeren Buffet bis zum festlichen Menü.' },
  { title: 'Und jeder weitere Anlass', text: 'Taufe, Hochzeit, Vereinsabend oder eine ganz eigene Idee — erzählt uns davon, wir machen das Passende daraus.' }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Events & Menüs"
      title="Besondere Abende."
      image="/images/marquee/marquee-07.jpg"
      text="Candlelight Dinner, Business Dinner und festliche Tafeln richten wir jederzeit für euch aus — dazu kommen unsere saisonalen Themenabende. Reservierung empfohlen, die Plätze sind begrenzt."
    />

    <!-- Immer buchbar -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Immer buchbar</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-4">
          Eure Anlässe — <span class="text-sage">jederzeit</span> bei uns.
        </h2>
        <p v-reveal:80 class="text-muted max-w-xl mb-12 leading-relaxed">
          Diese Formate richten wir das ganze Jahr über aus. Sagt uns einfach Anlass,
          Wunschtermin und ungefähre Gästezahl — den Rest planen wir gemeinsam.
        </p>

        <div class="grid sm:grid-cols-2 gap-x-12 border-b border-ink/10">
          <NuxtLink to="/kontakt" v-for="(f, i) in formate" :key="f.title" v-reveal="i * 70"
               class="group flex items-start gap-5 py-6 border-t border-ink/10 transition-colors duration-300 hover:border-sage/60">
            <span class="font-display text-sage/60 text-sm pt-1.5 w-7 shrink-0 tabular-nums transition-colors duration-300 group-hover:text-sage">0{{ i + 1 }}</span>
            <div class="flex-1">
              <div class="flex items-center justify-between gap-3">
                <h3 class="font-display text-xl md:text-2xl leading-tight transition-colors duration-300 group-hover:text-sage">{{ f.title }}</h3>
                <span class="text-sage shrink-0 opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
              <p class="text-muted leading-relaxed mt-2 text-[0.95rem]">{{ f.text }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Aktuelle Termine -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Nächste Termine</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Themenabende <span class="text-terracotta">bei uns im Haus.</span>
        </h2>

        <div v-if="loaded && upcoming.length === 0" v-reveal
             class="rounded-2xl border border-dashed border-ink/20 bg-cream/60 p-10 md:p-14 text-center max-w-2xl">
          <p class="font-display text-2xl md:text-3xl mb-2">Gerade keine Themenabende ausgeschrieben.</p>
          <p class="text-muted max-w-md mx-auto">Schaut bald wieder vorbei — oder fragt direkt euren Wunschanlass an, wir richten ihn gerne aus.</p>
          <NuxtLink to="/kontakt" class="btn btn-primary mt-7">Anlass anfragen</NuxtLink>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="(ev, i) in upcoming" :key="ev.id" v-reveal.scale="i * 90"
                   class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-ink transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_45px_75px_-38px_rgba(0,0,0,.7)]">
            <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]">
              <img :src="ev.image" alt="" class="parallax-media w-full h-[116%] object-cover" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5"></div>
            <div class="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25"></div>

            <div class="absolute inset-x-0 bottom-0 p-6 text-cream">
              <div class="font-display text-terracotta text-sm">{{ formatDate(ev.date) }}</div>
              <h3 class="font-display text-2xl md:text-[1.7rem] leading-tight mt-1">{{ ev.title }}</h3>
              <p class="font-display text-cream/60 mt-0.5">{{ ev.subtitle }}</p>
              <p class="text-[0.92rem] leading-relaxed text-cream/0 max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-40 group-hover:mt-3 group-hover:text-cream/80">
                {{ ev.text }}
              </p>
              <div class="mt-4 flex items-center justify-between gap-3">
                <span class="font-display">{{ ev.price }}</span>
                <NuxtLink to="/kontakt" class="btn btn-primary !py-2 !px-5 text-sm">Platz anfragen</NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <p v-if="!(loaded && upcoming.length === 0)" class="mt-12 text-muted text-sm">
          Eigener Anlass? Wir richten jedes Menü &amp; jede Feier individuell aus —
          <NuxtLink to="/kontakt" class="text-terracotta underline">einfach anfragen</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>
