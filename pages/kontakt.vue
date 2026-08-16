<script setup>
useSeo({
  title: 'Kontakt, Anfahrt & Reservierung — Schildbacherhof',
  description: 'Tisch reservieren, Zimmer anfragen oder Catering planen. Schildbach 42, 8230 Hartberg — telefonisch unter +43 664 1785544 oder über das Formular.'
})

// Als computed, damit im CMS geänderte Öffnungszeiten auch hier ankommen.
const zeiten = computed(() => zeitenKompakt())

const form = reactive({
  anliegen: 'Tischreservierung',
  name: '', email: '', phone: '', message: '',
  datum: '', personen: '', bis: '', ort: '',
  website: '' // Honeypot (muss leer bleiben)
})
const sent = ref(false)
const sending = ref(false)
const error = ref('')

const anliegenOptionen = ['Tischreservierung', 'Zimmeranfrage', 'Catering', 'Event / Menü', 'Foodtruck', 'Sonstiges']

async function submit() {
  if (sending.value) return // schützt vor Doppelklick bei langsamer Verbindung
  error.value = ''
  if (form.website) return // Bot
  if (!form.name || !form.email) { error.value = 'Bitte Name und E-Mail angeben.'; return }
  sending.value = true
  try {
    await $fetch('/api/contact.php', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e) {
    // Fallback, falls der Mailversand am Server scheitert (z. B. PHP-Mail deaktiviert):
    error.value = `Senden ist gerade nicht möglich. Bitte ruft uns an unter ${BETRIEB.telefon} oder schreibt an ${BETRIEB.email}.`
  } finally {
    sending.value = false
  }
}

// Gemeinsame Klassen für alle Eingabefelder
const feld = 'w-full bg-beige border border-ink/15 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta'
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
              <label for="f-anliegen" class="eyebrow block mb-2">Dein Anliegen</label>
              <select id="f-anliegen" v-model="form.anliegen" :class="feld">
                <option v-for="o in anliegenOptionen" :key="o">{{ o }}</option>
              </select>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label for="f-name" class="eyebrow block mb-2">Name</label>
                <input id="f-name" v-model="form.name" required autocomplete="name" :class="feld" />
              </div>
              <div>
                <label for="f-email" class="eyebrow block mb-2">E-Mail</label>
                <input id="f-email" v-model="form.email" type="email" required autocomplete="email" :class="feld" />
              </div>
            </div>

            <div>
              <label for="f-phone" class="eyebrow block mb-2">Telefon <span class="text-muted normal-case tracking-normal">(optional)</span></label>
              <input id="f-phone" v-model="form.phone" type="tel" autocomplete="tel" :class="feld" />
            </div>

            <!-- Bedingte Felder -->
            <div v-if="form.anliegen === 'Zimmeranfrage'" class="grid sm:grid-cols-3 gap-5">
              <div>
                <label for="f-an" class="eyebrow block mb-2">Anreise</label>
                <input id="f-an" v-model="form.datum" type="date" :class="feld" />
              </div>
              <div>
                <label for="f-ab" class="eyebrow block mb-2">Abreise</label>
                <input id="f-ab" v-model="form.bis" type="date" :class="feld" />
              </div>
              <div>
                <label for="f-pers-z" class="eyebrow block mb-2">Personen</label>
                <input id="f-pers-z" v-model="form.personen" type="number" min="1" :class="feld" />
              </div>
            </div>

            <div v-else-if="['Catering','Event / Menü','Foodtruck'].includes(form.anliegen)" class="grid sm:grid-cols-3 gap-5">
              <div>
                <label for="f-datum" class="eyebrow block mb-2">Datum</label>
                <input id="f-datum" v-model="form.datum" type="date" :class="feld" />
              </div>
              <div>
                <label for="f-gaeste" class="eyebrow block mb-2">Gäste</label>
                <input id="f-gaeste" v-model="form.personen" type="number" min="1" :class="feld" />
              </div>
              <div>
                <label for="f-ort" class="eyebrow block mb-2">Ort</label>
                <input id="f-ort" v-model="form.ort" :class="feld" />
              </div>
            </div>

            <div v-else-if="form.anliegen === 'Tischreservierung'" class="grid sm:grid-cols-2 gap-5">
              <div>
                <label for="f-termin" class="eyebrow block mb-2">Wunschtermin</label>
                <input id="f-termin" v-model="form.datum" type="datetime-local" :class="feld" />
              </div>
              <div>
                <label for="f-pers-t" class="eyebrow block mb-2">Personen</label>
                <input id="f-pers-t" v-model="form.personen" type="number" min="1" :class="feld" />
              </div>
            </div>

            <div>
              <label for="f-msg" class="eyebrow block mb-2">Nachricht</label>
              <textarea id="f-msg" v-model="form.message" rows="4" :class="feld"></textarea>
            </div>

            <!-- Honeypot -->
            <input v-model="form.website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

            <p v-if="error" class="text-terracotta text-sm" role="alert">{{ error }}</p>

            <button type="submit" class="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="sending">
              {{ sending ? 'Wird gesendet …' : 'Anfrage senden' }}
            </button>
          </form>

          <div v-else class="bg-beige rounded-2xl p-10 text-center" role="status">
            <div class="font-display text-3xl mb-2">Danke!</div>
            <p class="text-muted">Wir haben deine Anfrage erhalten und melden uns so schnell wie möglich.</p>
          </div>
        </div>

        <!-- Kontaktinfos -->
        <aside v-reveal:120 class="space-y-6">
          <div>
            <h2 class="eyebrow text-sage mb-2">Direkt</h2>
            <p class="text-ink leading-relaxed">
              <a :href="'tel:' + BETRIEB.telefonRoh" class="hover:text-terracotta">{{ BETRIEB.telefon }}</a><br>
              <a :href="'mailto:' + BETRIEB.email" class="hover:text-terracotta">{{ BETRIEB.email }}</a>
            </p>
          </div>

          <div>
            <h2 class="eyebrow text-sage mb-2">Anfahrt</h2>
            <address class="not-italic text-ink leading-relaxed">
              {{ BETRIEB.adresse.strasse }}<br>{{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}
            </address>
            <p class="text-muted text-[0.92rem] mt-1">Direkt an der B54 · Parkplätze vor dem Haus</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <a :href="BETRIEB.route" target="_blank" rel="noopener" class="btn btn-primary !py-2 !px-5 text-sm">
                Route planen →
              </a>
              <a :href="BETRIEB.karte" target="_blank" rel="noopener" class="btn btn-ghost !py-2 !px-5 text-sm">
                Auf der Karte ↗
              </a>
            </div>
          </div>

          <div>
            <h2 class="eyebrow text-sage mb-2">Öffnungszeiten</h2>
            <dl class="text-[0.95rem] leading-relaxed">
              <div v-for="z in zeiten" :key="z.tage" class="flex gap-2">
                <dt class="text-muted w-12 shrink-0">{{ z.tage }}</dt>
                <dd class="m-0" :class="z.zu ? 'text-terracotta' : 'text-ink'">{{ z.text }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 class="eyebrow text-sage mb-2">Folgt uns</h2>
            <div class="flex flex-wrap gap-2">
              <a v-for="s in BETRIEB.social" :key="s.name" :href="s.url" target="_blank" rel="noopener"
                 class="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm
                        transition-colors hover:border-terracotta hover:text-terracotta">
                {{ s.name }} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <p class="text-muted text-sm">Catering &amp; Feste begleiten wir gemeinsam mit Gollner Gastro — der Schildbacherhof bleibt ansonsten eigenständig.</p>
        </aside>
      </div>
    </section>
  </div>
</template>
