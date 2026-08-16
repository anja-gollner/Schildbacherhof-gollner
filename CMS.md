# Schildbacherhof CMS

Ein schlankes, selbstgehostetes CMS (PHP) zum Pflegen der **Basisdaten**, der
**Events**, der **Speisekarten-PDFs** und der **Feiertage/Urlaubszeiten** — ohne
Code, hinter einem Passwort. Läuft auf eurem klassischen Webspace (Apache + PHP),
genau wie die Website selbst.

Vergangene Events und abgelaufene Ausnahmetage blendet die Website automatisch
aus — nichts manuell löschen.

Erreichbar unter: **`https://schildbacherhof.at/admin/`**

## Was das CMS kann
- **Basisdaten** ändern: Telefon, E-Mail, Adresse, Öffnungszeiten, Instagram- und
  Facebook-Adresse — siehe gleich unten.
- **Events** anlegen, bearbeiten, löschen (Titel, Datum/Uhrzeit, Untertitel,
  Beschreibung, Preis, Bild). Änderungen sind **sofort live** — kein neuer Upload nötig,
  weil die Website die Events zur Laufzeit aus `content/events.json` lädt.
- **Bilder** aus dem Bestand auswählen **oder** neue hochladen.
- **PDFs** für *Wochenmenü* und *À la carte* hochladen (landen unter `/pdf/`).
- **Feiertage & Urlaub** eintragen — siehe unten.
- **Passwort ändern.**

## Basisdaten ändern

Im Abschnitt **Basisdaten** stehen die Angaben, die an vielen Stellen gleichzeitig
auftauchen. Ändert man hier die Telefonnummer, ändert sie sich überall: in der
Fußzeile, auf der Kontaktseite, im Impressum, in der Datenschutzerklärung und in
den unsichtbaren Daten, aus denen Google die Trefferanzeige baut.

| Feld | wirkt sich aus auf |
|---|---|
| Telefon | die angezeigte Nummer auf allen Seiten |
| Telefon zum Anwählen | was passiert, wenn man am Handy draufdrückt |
| E-Mail | alle `mailto:`-Links und das Impressum |
| Straße / PLZ / Ort | Fußzeile, Impressum, Datenschutz **und die Kartenlinks** |
| Instagram / Facebook | die Knöpfe in der Fußzeile |
| Öffnungszeiten | Startseite, Kontaktseite, Fußzeile und die Anzeige „Jetzt geöffnet" |

Danach **Basisdaten speichern** — sofort live.

Drei Dinge, die oft gefragt werden:

- **Die Kartenlinks muss man nicht extra pflegen.** „Route planen" und „Auf der
  Karte" werden aus Hausname und Adresse zusammengebaut. Ändert sich die Adresse,
  ändern sich die Links automatisch mit.
- **Ein Feld leeren setzt es zurück.** Gespeichert wird nur, was tatsächlich
  drinsteht; ist ein Feld leer, gilt wieder der Wert, der beim Bauen der Website
  eingetragen war. Man kann sich also nicht dauerhaft „verstellen".
- **Öffnungszeiten sind der Dauerplan, nicht der Einzelfall.** Wer nur am 24.12.
  zusperrt, trägt das weiter unten unter *Feiertage & Urlaub* ein — dort
  überschreibt es diesen Plan für die betroffenen Tage. Der Wochenplan bleibt
  dabei unangetastet.

Pro Tag gibt es zwei Zeitfenster („Mittag" und „Abend"). Wer durchgehend geöffnet
hat, füllt nur „Mittag" aus und lässt „Abend" leer. Ein angehakter **Ruhetag**
bedeutet: an diesem Wochentag ist grundsätzlich geschlossen.

### Warum das ohne neues Hochladen funktioniert

Die Website ist eine statische Seite: sie wird einmal gebaut und dann als fertige
Dateien hochgeladen. Am Webspace läuft kein Node, es kann also nichts neu gebaut
werden, wenn ihr etwas ändert.

Deshalb holt die Seite die Basisdaten beim Laden im Browser vom Server nach und
setzt sie ein. Für Besucher ist das unsichtbar. Nur der reine Quelltext trägt bis
zum nächsten Hochladen noch den alten Stand — für Gäste ohne Bedeutung.

> Wenn ein Wert dauerhaft geändert bleiben soll, sagt trotzdem einmal Bescheid:
> dann wandert er zusätzlich in `composables/useBetrieb.ts` und ist danach auch
> ohne den Umweg über den Server der neue Ausgangswert.

## Feiertage, Urlaub, geschlossene Gesellschaft

Im Abschnitt **Öffnungszeiten → Feiertage & Urlaub** tragt ihr Tage ein, an denen
der normale Wochenplan nicht gilt. Pro Eintrag:

- **Von / Bis** — für einen einzelnen Tag beide gleich lassen
- **Grund** — erscheint so auf der Website („Weihnachtsfeiertag", „Betriebsurlaub")
- **ganztägig geschlossen** — Haken setzen, oder abwählen und stattdessen
  abweichende Öffnungszeiten angeben (z. B. 11:00–14:00 bei Frühschluss)

Danach **Ausnahmen speichern** — sofort live.

Die Startseite berücksichtigt das an drei Stellen: die Anzeige „Jetzt geöffnet"
springt auf „Gerade geschlossen" um und nennt den nächsten wirklich offenen Termin,
die Wochentabelle zeigt statt der Uhrzeit den Grund, und über den Öffnungszeiten
erscheint ein Kasten mit den nächsten Abweichungen.

**Ohne Eintrag behauptet die Website am Feiertag „Jetzt geöffnet".** Sie kennt nur
den festen Wochenplan. Vergangene Einträge verschwinden automatisch — nichts löschen.

## Speisekarte austauschen (der normale Weg)

1. `/admin/` öffnen, einloggen.
2. Unter **Speisekarten** bei *Wochenmenü* bzw. *À la carte* die neue PDF-Datei
   auswählen und auf **Hochladen** klicken.
3. Fertig — die Karte ist sofort live.

**Der Dateiname ist dabei völlig egal.** Die Datei darf `Menü KW34.pdf`,
`scan_002.pdf` oder sonst wie heißen; das CMS legt sie serverseitig unter dem
richtigen Namen ab (`wochenmenue.pdf` bzw. `a-la-carte.pdf`). Genau deshalb ist
das CMS der bessere Weg als FileZilla: dort müsste man den Namen exakt treffen,
und ein `Wochenmenue.pdf` oder `wochenmenue.PDF` würde stillschweigend nicht
greifen.

Die Website zeigt unter der Karte automatisch **„Stand: <Datum>"** — das kommt aus
dem Änderungsdatum der Datei am Server (`api/menus.php`), da muss nichts gepflegt
werden. Derselbe Zeitstempel hängt als `?v=…` an der PDF-Adresse. Das ist wichtig,
weil der Dateiname ja gleich bleibt: ohne diesen Zusatz würden Gäste, die die alte
Karte schon einmal geöffnet haben, sie aus dem Browser-Cache weiter angezeigt
bekommen — teils tagelang.

> Falls doch einmal per FileZilla getauscht wird: Datei exakt `wochenmenue.pdf`
> bzw. `a-la-carte.pdf` nennen, in den Ordner `pdf/` legen. „Stand:" und
> Cache-Busting funktionieren auch dann, weil beides am Änderungsdatum der Datei
> hängt und nicht an einem Eintrag im CMS.

> Die fixen Formate auf der Events-Seite (Candlelight Dinner, Business Dinner,
> Geburtstagstafeln, Agape, Firmenfeiern …) sind bewusst **fest im Code** und werden
> nicht übers CMS gepflegt. Wenn sich die ändern sollen: kurz Bescheid geben.

## Voraussetzungen am Server
- **PHP** aktiviert (Standard bei klassischem Hosting wie world4you, easyname, Hetzner …).
- **Schreibrechte** für PHP auf diese Ordner:
  - `content/`  (Events, Feiertage/Urlaub + Backup)
  - `pdf/`      (Speisekarten + Unterordner `pdf/seiten/`; werden bei Bedarf angelegt)
  - `images/`   (für hochgeladene Event-Bilder, Unterordner `images/events/`)
  - `api/`      (einmalig, um beim ersten Login die Zugangsdatei `auth.php` zu schreiben)

  Falls ein Upload „Schreibrechte?" meldet: die Ordner per FileZilla auf **755**
  (Dateien 644) setzen; auf manchen Hosts ist **775** nötig.

## Erste Einrichtung
1. Website ganz normal hochladen (`npm run generate` → Inhalt von `.output/public/`
   per FileZilla in den Webroot).
2. `https://schildbacherhof.at/admin/` öffnen.
3. Beim **ersten** Aufruf legst du ein Passwort fest (mind. 8 Zeichen).
   Dabei wird serverseitig `api/auth.php` mit dem **Hash** des Passworts erzeugt
   (das Klartext-Passwort wird nie gespeichert).
4. Fertig — ab jetzt meldest du dich mit diesem Passwort an.

Passwort vergessen? Per FileZilla die Datei `api/auth.php` löschen — beim nächsten
Aufruf von `/admin/` kannst du ein neues festlegen.

## ⚠️ Wichtig beim erneuten Hochladen (Re-Deploy)
Sobald das CMS live genutzt wird, „leben" diese Dinge **nur am Server** und werden
vom CMS gepflegt. Beim erneuten Hochladen der Website **NICHT überschreiben**, sonst
sind die Pflege-Änderungen weg:

- `content/events.json`     ← die gepflegten Events
- `content/ausnahmen.json`  ← Feiertage & Urlaub (existiert lokal gar nicht)
- `content/stammdaten.json` ← die im CMS geänderten Basisdaten (existiert lokal gar nicht)
- `pdf/`                    ← hochgeladene Speisekarten
- `pdf/seiten/`             ← die daraus erzeugten Seitenbilder fürs Handy
- `images/events/`          ← hochgeladene Event-Bilder
- `api/auth.php`            ← der Login (existiert lokal gar nicht)

**Praxis:** Beim Re-Upload in FileZilla diese Ordner/Dateien einfach abwählen bzw.
„nicht überschreiben" wählen. Code-/Design-Änderungen (alles andere) kannst du
normal drüberspielen.

Eine Datei müsst ihr dagegen unbedingt **mit** hochladen: **`.htaccess`**.
FileZilla blendet Dateien mit einem Punkt am Anfang standardmäßig aus — unter
„Server → Versteckte Dateien anzeigen" einschalten. Ohne sie fehlen HTTPS-Zwang,
die eigene Fehlerseite und die Komprimierung.

## Sicherheit
- Passwort wird nur als **bcrypt-Hash** in `api/auth.php` abgelegt; diese Datei wird
  vom Server als PHP ausgeführt und **nie als Quelltext ausgeliefert**.
- Schreibende Aktionen erfordern Login (Session) **und** ein CSRF-Token.
- Uploads sind auf PDF bzw. Bildformate begrenzt und größenbeschränkt (25 MB).
- Die Seite ist auf `noindex` gesetzt (taucht nicht bei Google auf).

## Lokal testen (optional)
Da das CMS PHP braucht, läuft es nicht im Nuxt-Dev-Server. Zum Testen:
```bash
npm run generate
php -S localhost:8000 -t .output/public
# dann http://localhost:8000/admin/ öffnen
```
(`php` muss installiert sein.)

## Dateien
```
public/admin/   index.php · admin.css · app.js     ← Oberfläche
public/api/     _bootstrap.php · session.php · login.php · logout.php
                password.php · events.php · images.php · upload.php · status.php
                menus.php      ← öffentlich: Änderungsdatum + Seitenbilder der Karten
                ausnahmen.php  ← öffentlich lesen, Speichern nur eingeloggt
                stammdaten.php ← öffentlich lesen, Speichern nur eingeloggt
                vorgabe.json   ← beim Bauen erzeugt: die Ausgangswerte fürs CMS
                auth.php       ← wird beim ersten Login erzeugt (nicht im Repo)
```
