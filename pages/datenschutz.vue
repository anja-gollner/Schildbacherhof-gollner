<script setup>
useSeo({
  title: 'Datenschutzerklärung — Schildbacherhof',
  description: 'Wie wir personenbezogene Daten verarbeiten: Server-Logfiles, Kontaktformular und eure Rechte nach der DSGVO.'
})
</script>
<template>
  <div>
    <PageHeader eyebrow="Datenschutz" title="Datenschutzerklärung" text="Informationen zur Verarbeitung personenbezogener Daten (DSGVO)." />
    <section class="bg-cream py-16 md:py-24">
      <div class="container-x max-w-2xl space-y-8 leading-relaxed text-muted">
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Verantwortliche Stelle</h2>
          <address class="not-italic">
            {{ BETRIEB.name }} · {{ BETRIEB.inhaberin }}<br>
            {{ BETRIEB.adresse.strasse }}, {{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ortAmtlich }}<br>
            Telefon: <a :href="'tel:' + BETRIEB.telefonRoh" class="text-terracotta">{{ BETRIEB.telefon }}</a> ·
            E-Mail: <a :href="'mailto:' + BETRIEB.email" class="text-terracotta">{{ BETRIEB.email }}</a>
          </address>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Hosting und Server-Logfiles</h2>
          <p>Diese Website wird bei der ALL-INKL.COM — Neue Medien Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland gehostet; die Server stehen in Deutschland. Beim Aufruf werden automatisch technische Daten verarbeitet (IP-Adresse, Datum und Uhrzeit, abgerufene Seite, Browsertyp), die der Auslieferung und Sicherheit dienen. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).</p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Kontakt- und Anfrageformular</h2>
          <p>Wenn Sie uns über das Formular oder per E-Mail kontaktieren, verarbeiten wir die angegebenen Daten (Name, E-Mail-Adresse, optional Telefonnummer sowie Ihre Angaben zum Anliegen) ausschließlich zur Bearbeitung der Anfrage. Die Übermittlung erfolgt an unsere E-Mail-Adresse; eine Weitergabe an Dritte findet nicht statt. Wir löschen die Daten, sobald keine gesetzliche Aufbewahrungspflicht entgegensteht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.</p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Schriftarten</h2>
          <p>Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert. Es besteht dabei <strong class="text-ink">keine Verbindung zu Google Fonts</strong> oder anderen externen Anbietern, und es wird keine IP-Adresse an Dritte übertragen.</p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Karten und externe Links</h2>
          <p>Wir binden keine Kartendienste direkt in die Website ein. Die Links „Route planen" und die Verweise auf unsere Profile bei Instagram und Facebook führen erst nach einem Klick zum jeweiligen Anbieter — dort gelten dessen Datenschutzbestimmungen. Ohne Klick werden keine Daten an diese Anbieter übermittelt.</p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Cookies</h2>
          <p>Die Website setzt keine Cookies zu Analyse- oder Werbezwecken. Lediglich im passwortgeschützten Verwaltungsbereich wird ein technisch notwendiges Sitzungs-Cookie verwendet; dieses betrifft ausschließlich angemeldete Mitarbeiter, nicht Besucherinnen und Besucher der Website.</p>
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung (Art. 15–18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie auf Widerspruch (Art. 21 DSGVO). Zudem können Sie sich bei der Aufsichtsbehörde beschweren (Art. 77 DSGVO) — in Österreich bei der Datenschutzbehörde, <a href="https://www.dsb.gv.at" target="_blank" rel="noopener" class="text-terracotta">dsb.gv.at</a>.</p>
        </div>
      </div>
    </section>
  </div>
</template>
