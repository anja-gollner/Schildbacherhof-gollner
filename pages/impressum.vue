<script setup>
useSeo({
  title: 'Impressum — Schildbacherhof',
  description: 'Impressum und Offenlegung gemäß österreichischem Recht. Inhaberin Margit Maria Gollner, Schildbach 42, 8230 Hartberg.'
})
</script>
<template>
  <div>
    <PageHeader eyebrow="Impressum" title="Impressum" text="Angaben gemäß österreichischem Recht." />
    <section class="bg-cream py-16 md:py-24">
      <div class="container-x max-w-2xl space-y-8 leading-relaxed">
        <div>
          <p class="font-display text-xl">{{ BETRIEB.name }}</p>
          <address class="not-italic text-muted">
            {{ BETRIEB.inhaberin }}<br>
            {{ BETRIEB.adresse.strasse }}<br>
            {{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ortAmtlich }}, {{ BETRIEB.adresse.land }}
          </address>
          <p class="text-muted mt-2">
            E-Mail: <a :href="'mailto:' + BETRIEB.email" class="text-terracotta">{{ BETRIEB.email }}</a><br>
            Telefon: <a :href="'tel:' + BETRIEB.telefonRoh" class="text-terracotta">{{ BETRIEB.telefon }}</a>
          </p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-terracotta mb-2">Angaben</h2>
          <p class="text-muted">
            Unternehmensgegenstand: Gasthof<br>
            Rechtsform: Einzelunternehmen<br>
            UID-Nr.: {{ BETRIEB.uid }}<br>
            Behörde gem. ECG: {{ BETRIEB.behoerde }}<br>
            Aufsichts-/Gewerbebehörde: {{ BETRIEB.behoerde }}<br>
            Berufsrecht/Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener" class="text-terracotta">www.ris.bka.gv.at</a><br>
            Berufsbezeichnung: reglementiertes Gewerbe · Tätigkeitsbereich: Gastronomie<br>
            Inhaberin: {{ BETRIEB.inhaberin }}
          </p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-terracotta mb-2">Online-Streitbeilegung</h2>
          <p class="text-muted">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" class="text-terracotta">ec.europa.eu/consumers/odr</a>.
            Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-terracotta mb-2">Haftungsausschluss</h2>
          <p class="text-muted">Der Autor übernimmt keinerlei Gewähr für die Aktualität, Richtigkeit und Vollständigkeit der bereitgestellten Informationen. Haftungsansprüche, die sich auf Schäden materieller oder ideeller Art beziehen und durch die Nutzung oder Nichtnutzung der Informationen verursacht wurden, sind ausgeschlossen, sofern kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.</p>
        </div>
      </div>
    </section>
  </div>
</template>
