<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream">
    <div class="container-x py-16 grid gap-10 md:grid-cols-4">
      <div class="md:col-span-2">
        <NuxtLink to="/" class="inline-block mb-5" aria-label="Der Schildbacherhof — Startseite">
          <img src="/images/schildbacherhof-logo.png" alt="Der Schildbacherhof" class="h-16 md:h-20 w-auto" />
        </NuxtLink>
        <p class="text-cream/60 max-w-sm leading-relaxed">
          Restaurant &amp; Wirtshaus in Hartberg. Familie Gollner seit 1967 — Kapitel 2.
          Catering, Foodtruck, Gästezimmer &amp; Events.
        </p>
      </div>

      <div>
        <h4 class="eyebrow text-sage mb-4">Kontakt</h4>
        <p class="text-cream/80 leading-relaxed">
          Schildbach 42<br>8230 Hartberg<br>
          <a href="tel:+436641785544" class="hover:text-terracotta">+43 664 1785544</a><br>
          <a href="mailto:office@schildbacherhof.at" class="hover:text-terracotta">office@schildbacherhof.at</a>
        </p>
      </div>

      <div>
        <h4 class="eyebrow text-sage mb-4">Öffnungszeiten</h4>
        <p class="text-cream/80 leading-relaxed text-[0.92rem]">
          Mo, Mi–Sa · 11–15 &amp; 17–21:30<br>
          So · 11–16<br>
          <span class="text-terracotta">Di Ruhetag</span>
        </p>
      </div>
    </div>

    <div class="container-x py-6 border-t border-cream/15 flex flex-wrap justify-between gap-3 text-cream/50 text-[0.8rem]">
      <span>© {{ year }} Schildbacherhof · Familie Gollner</span>
      <span class="flex gap-5">
        <NuxtLink to="/impressum" class="hover:text-terracotta">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="hover:text-terracotta">Datenschutz</NuxtLink>
      </span>
    </div>
  </footer>
</template>
