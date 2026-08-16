<script setup>
useHead({ title: 'Kontakt & Anfrage — Schildbacherhof' })

const form = reactive({
  anliegen: 'Tischreservierung',
  name: '', email: '', phone: '', message: '',
  datum: '', personen: '', bis: '', ort: '',
  website: '' // Honeypot (muss leer bleiben)
})
const sent = ref(false)
const error = ref('')

const anliegenOptionen = ['Tischreservierung', 'Zimmeranfrage', 'Catering', 'Event / Menü', 'Foodtruck', 'Sonstiges']

async function submit() {
  error.value = ''
  if (form.website) return // Bot
  if (!form.name || !form.email) { error.value = 'Bitte Name und E-Mail angeben.'; return }
  try {
    await $fetch('/api/contact.php', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e) {
    // Fallback, falls der Mailversand am Server scheitert (z. B. PHP-Mail deaktiviert):
    error.value = 'Senden ist gerade nicht möglich. Bitte per E-Mail an office@schildbacherhof.at.'
  }
}
</script>

<template>
  <div>
    <PageHeader eyebrow="Kontakt" title="Schreibt uns." text="Tisch, Zimmer, Catering, Event oder Foodtruck — sagt uns, worum es geht, wir melden uns rasch zurück." />

    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <!-- Formular -->
        <div v-reveal>
          <form v-if="!sent" @submit.prevent="submit" class="space-y-5">
            <div>
              <label class="eyebrow block mb-2">Dein Anliegen</label>
              <select v-model="form.anliegen" class="w-full bg-beige border border-ink/15 rounded-lg px-4 py-3">
                <option v-for="o in anliegenOptionen" :key="o">{{ o }}</option>
              </select>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <input v-model="form.name" placeholder="Name" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
              <input v-model="form.email" type="email" placeholder="E-Mail" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
            </div>
            <input v-model="form.phone" placeholder="Telefon (optional)" class="w-full bg-beige border border-ink/15 rounded-lg px-4 py-3" />

            <!-- Bedingte Felder -->
            <div v-if="form.anliegen === 'Zimmeranfrage'" class="grid sm:grid-cols-3 gap-5">
              <input v-model="form.datum" type="date" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" aria-label="Anreise" />
              <input v-model="form.bis" type="date" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" aria-label="Abreise" />
              <input v-model="form.personen" type="number" min="1" placeholder="Personen" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
            </div>
            <div v-else-if="['Catering','Event / Menü','Foodtruck'].includes(form.anliegen)" class="grid sm:grid-cols-3 gap-5">
              <input v-model="form.datum" type="date" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" aria-label="Datum" />
              <input v-model="form.personen" type="number" min="1" placeholder="Gäste" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
              <input v-model="form.ort" placeholder="Ort" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
            </div>
            <div v-else-if="form.anliegen === 'Tischreservierung'" class="grid sm:grid-cols-2 gap-5">
              <input v-model="form.datum" type="datetime-local" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" aria-label="Wunschtermin" />
              <input v-model="form.personen" type="number" min="1" placeholder="Personen" class="bg-beige border border-ink/15 rounded-lg px-4 py-3" />
            </div>

            <textarea v-model="form.message" rows="4" placeholder="Nachricht" class="w-full bg-beige border border-ink/15 rounded-lg px-4 py-3"></textarea>

            <!-- Honeypot -->
            <input v-model="form.website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

            <p v-if="error" class="text-terracotta text-sm">{{ error }}</p>
            <button type="submit" class="btn btn-primary">Anfrage senden</button>
          </form>

          <div v-else class="bg-beige rounded-2xl p-10 text-center">
            <div class="font-display text-3xl mb-2">Danke!</div>
            <p class="text-muted">Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich.</p>
          </div>
        </div>

        <!-- Kontaktinfos -->
        <aside v-reveal:120 class="space-y-6">
          <div>
            <h3 class="eyebrow text-sage mb-2">Direkt</h3>
            <p class="text-ink leading-relaxed">
              <a href="tel:+436641785544" class="hover:text-terracotta">+43 664 1785544</a><br>
              <a href="mailto:office@schildbacherhof.at" class="hover:text-terracotta">office@schildbacherhof.at</a><br>
              Schildbach 42, 8230 Hartberg
            </p>
          </div>
          <div>
            <h3 class="eyebrow text-sage mb-2">Öffnungszeiten</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">Mo, Mi–Sa · 11–15 &amp; 17–21:30<br>So · 11–16 · <span class="text-terracotta">Di Ruhetag</span></p>
          </div>
          <p class="text-muted text-sm">Catering &amp; Feste begleiten wir gemeinsam mit Gollner Gastro — der Schildbacherhof bleibt ansonsten eigenständig.</p>
        </aside>
      </div>
    </section>
  </div>
</template>
