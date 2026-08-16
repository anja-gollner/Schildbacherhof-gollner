<script setup>
const year = new Date().getFullYear()
// Als computed, damit die im CMS geänderten Öffnungszeiten auch hier ankommen —
// als einmaliger Aufruf bliebe der Stand vom Bauen stehen.
const zeiten = computed(() => zeitenKompakt())
</script>

<template>
  <footer class="bg-ink text-cream">
    <div class="container-x py-16 grid gap-10 md:grid-cols-4">
      <div class="md:col-span-2">
        <NuxtLink to="/" class="inline-block mb-5" aria-label="Der Schildbacherhof — Startseite">
          <img src="/images/schildbacherhof-logo.png" alt="Der Schildbacherhof" class="h-16 md:h-20 w-auto" />
        </NuxtLink>
        <p class="text-cream/60 max-w-sm leading-relaxed">
          Restaurant &amp; Wirtshaus in {{ BETRIEB.adresse.ort }}. Familie Gollner seit {{ BETRIEB.seit }} — Kapitel 2.
          Catering, Foodtruck, Gästezimmer &amp; Events.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <a v-for="s in BETRIEB.social" :key="s.name" :href="s.url" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm
                    transition-colors hover:border-terracotta hover:text-terracotta">
            <!-- Wortmarke statt Icon: bleibt ohne Icon-Bibliothek lesbar und lädt nichts nach -->
            {{ s.name }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div>
        <h2 class="eyebrow text-sage mb-4">Kontakt</h2>
        <address class="not-italic text-cream/80 leading-relaxed">
          {{ BETRIEB.adresse.strasse }}<br>{{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}
          <!-- Telefon und E-Mail als eigene Zeilen mit Polsterung statt als
               Textzeilen: am Handy sind das die wichtigsten Tippziele, und mit
               reiner Zeilenhöhe wären sie nur 20px hoch — zu wenig zum Treffen. -->
          <a :href="'tel:' + BETRIEB.telefonRoh" class="block py-1.5 hover:text-terracotta">{{ BETRIEB.telefon }}</a>
          <a :href="'mailto:' + BETRIEB.email" class="block pb-1.5 hover:text-terracotta">{{ BETRIEB.email }}</a>
        </address>
        <a :href="BETRIEB.route" target="_blank" rel="noopener"
           class="mt-1 inline-flex items-center gap-1.5 py-1.5 text-sm text-sage hover:text-terracotta transition-colors">
          Route planen <span aria-hidden="true">→</span>
        </a>
      </div>

      <div>
        <h2 class="eyebrow text-sage mb-4">Öffnungszeiten</h2>
        <dl class="text-[0.92rem] leading-relaxed">
          <div v-for="z in zeiten" :key="z.tage" class="flex gap-2">
            <dt class="text-cream/55 w-12 shrink-0">{{ z.tage }}</dt>
            <dd class="m-0" :class="z.zu ? 'text-terracotta' : 'text-cream/80'">{{ z.text }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="container-x pb-6">
      <p class="text-cream/40 text-[0.78rem] leading-relaxed max-w-2xl">
        Informationen zu Allergenen findet ihr in der Speisekarte oder erhaltet ihr
        jederzeit bei unserem Personal.
      </p>
    </div>

    <div class="container-x py-6 border-t border-cream/15 flex flex-wrap justify-between gap-3 text-cream/50 text-[0.8rem]">
      <span>© {{ year }} {{ BETRIEB.name }} · Familie Gollner</span>
      <span class="flex gap-5 -my-1.5">
        <NuxtLink to="/impressum" class="py-1.5 hover:text-terracotta">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="py-1.5 hover:text-terracotta">Datenschutz</NuxtLink>
      </span>
    </div>
  </footer>
</template>
