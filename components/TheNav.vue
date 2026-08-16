<script setup>
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  { to: '/restaurant', label: 'Restaurant' },
  { to: '/events', label: 'Events' },
  { to: '/catering', label: 'Catering' },
  { to: '/foodtruck', label: 'Foodtruck' },
  { to: '/zimmer', label: 'Zimmer' },
  { to: '/ueber-uns', label: 'Über uns' }
]

const onScroll = () => { scrolled.value = window.scrollY > 24 }

// Beim Wechsel auf Desktop-Breite das Menü schließen — sonst bliebe der
// Body-Scroll gesperrt, obwohl das Overlay (md:hidden) gar nicht mehr sichtbar ist.
const onResize = () => { if (window.innerWidth >= 768) open.value = false }
const onKeydown = (e) => { if (e.key === 'Escape') open.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// Body-Scroll sperren, solange das Mobile-Menü offen ist
watch(open, (v) => {
  if (typeof document !== 'undefined') document.body.style.overflow = v ? 'hidden' : ''
})
// Menü bei Seitenwechsel schließen
watch(() => route.path, () => { open.value = false })

// Dunkle Schrift nur, wenn das helle Panel sichtbar ist. Bei offenem Menü
// liegt alles auf dunklem Grund — dort muss die Schrift hell bleiben.
const dark = computed(() => scrolled.value && !open.value)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="(scrolled && !open)
      ? 'bg-cream/80 backdrop-blur-xl border-b border-ink/10 shadow-[0_8px_30px_-12px_rgba(33,28,21,0.25)]'
      : 'bg-transparent border-b border-transparent'"
  >
    <nav class="container-x flex items-center justify-between" :class="(scrolled && !open) ? 'py-3' : 'py-5'">
      <!-- Logo -->
      <!-- Bei offenem Mobile-Menü ausgeblendet: dort trägt das Logo am Fuß des
           Overlays den Startseiten-Link, sonst stünde dasselbe Schild doppelt im Bild. -->
      <NuxtLink
        to="/"
        class="relative z-[60] transition-opacity duration-300"
        :class="open ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        :aria-hidden="open ? 'true' : undefined"
        :tabindex="open ? -1 : undefined"
        aria-label="Der Schildbacherhof — Startseite"
      >
        <img
          src="/images/schildbacherhof-logo.png"
          alt="Der Schildbacherhof"
          class="w-auto transition-all duration-500"
          :class="(scrolled && !open) ? 'h-10 md:h-11' : 'h-12 md:h-16'"
        />
      </NuxtLink>

      <!-- Desktop-Links -->
      <div
        class="hidden md:flex items-center gap-8 text-[0.92rem] transition-colors duration-500"
        :class="dark ? 'text-ink' : 'text-cream'"
      >
        <NuxtLink
          v-for="l in links" :key="l.to" :to="l.to"
          class="nav-link transition-opacity hover:opacity-100"
          :class="route.path === l.to ? 'is-active opacity-100' : 'opacity-80'"
        >{{ l.label }}</NuxtLink>
      </div>

      <!-- Reservieren (Desktop) -->
      <NuxtLink
        to="/kontakt"
        class="hidden md:inline-flex btn !py-2 !px-5 text-[0.85rem] transition-all duration-500"
        :class="dark
          ? 'bg-terracotta text-cream hover:bg-ink border border-transparent'
          : 'border border-cream/40 text-cream hover:bg-cream hover:text-ink'"
      >Reservieren</NuxtLink>

      <!-- Burger (Mobile) -->
      <button
        class="md:hidden relative z-[60] w-9 h-9 flex flex-col items-center justify-center gap-[7px]"
        :class="dark ? 'text-ink' : 'text-cream'"
        @click="open = !open" :aria-expanded="open"
        :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
      >
        <span
          class="block w-7 h-[2px] bg-current rounded-full transition-all duration-300"
          :class="open ? 'translate-y-[4.5px] rotate-45' : ''"
        ></span>
        <span
          class="block w-7 h-[2px] bg-current rounded-full transition-all duration-300"
          :class="open ? '-translate-y-[4.5px] -rotate-45' : ''"
        ></span>
      </button>
    </nav>

    <!-- Mobile-Vollbild-Menü -->
    <transition name="overlay">
      <div
        v-if="open"
        class="md:hidden fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl text-cream
               overflow-y-auto overscroll-contain"
        role="dialog" aria-modal="true" aria-label="Hauptmenü"
      >
        <!-- min-h-full statt h-full: bei wenig Höhe (Querformat) wächst der Inhalt
             und das Overlay wird scrollbar, statt abgeschnitten zu werden.
             pt-24 hält den Bereich unter der Navleiste frei — sonst liegt das Logo
             über dem ersten Link. -->
        <div class="min-h-full flex flex-col pt-24 [@media(max-height:520px)]:pt-20">
          <div class="flex-1 flex flex-col justify-center px-[8vw] py-4 gap-1">
            <NuxtLink
              v-for="(l, i) in links" :key="l.to" :to="l.to"
              class="menu-item font-display leading-tight py-1.5 flex items-center gap-4
                     text-[clamp(1.75rem,min(10vw,6.4vh),3.25rem)]
                     hover:text-terracotta transition-colors"
              :style="{ animationDelay: (80 + i * 70) + 'ms' }"
              @click="open = false"
            >
              <span class="text-terracotta text-base font-sans tabular-nums opacity-60">0{{ i + 1 }}</span>
              {{ l.label }}
            </NuxtLink>
          </div>

          <div
            class="menu-item px-[8vw] pb-10 pt-6 border-t border-cream/15"
            :style="{ animationDelay: (80 + links.length * 70) + 'ms' }"
          >
            <NuxtLink to="/kontakt" class="btn btn-primary w-full" @click="open = false">
              Tisch reservieren →
            </NuxtLink>
            <NuxtLink
              to="/" class="mt-6 inline-block" @click="open = false"
              aria-label="Der Schildbacherhof — Startseite"
            >
              <img
                src="/images/schildbacherhof-logo.png" alt="Der Schildbacherhof"
                class="h-11 w-auto opacity-80 transition-opacity hover:opacity-100"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1); }
.overlay-enter-from, .overlay-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
