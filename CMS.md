# Schildbacherhof CMS

Ein schlankes, selbstgehostetes CMS (PHP) zum Pflegen der **Events** und der
**Speisekarten-PDFs** — ohne Code, hinter einem Passwort. Läuft auf eurem
klassischen Webspace (Apache + PHP), genau wie die Website selbst.

Erreichbar unter: **`https://schildbacherhof.at/admin/`**

## Was das CMS kann
- **Events** anlegen, bearbeiten, löschen (Titel, Datum/Uhrzeit, Untertitel,
  Beschreibung, Preis, Bild). Änderungen sind **sofort live** — kein neuer Upload nötig,
  weil die Website die Events zur Laufzeit aus `content/events.json` lädt.
- **Bilder** aus dem Bestand auswählen **oder** neue hochladen.
- **PDFs** für *Wochenmenü* und *À la carte* hochladen (landen unter `/pdf/`).
- **Passwort ändern.**

Vergangene Events blendet die Website automatisch aus — nichts manuell löschen.

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
  - `content/`  (Events + Backup)
  - `pdf/`      (Speisekarten; wird bei Bedarf automatisch angelegt)
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

- `content/events.json`   ← die gepflegten Events
- `pdf/`                  ← hochgeladene Speisekarten
- `images/events/`        ← hochgeladene Event-Bilder
- `api/auth.php`          ← der Login (existiert lokal gar nicht)

**Praxis:** Beim Re-Upload in FileZilla diese Ordner/Dateien einfach abwählen bzw.
„nicht überschreiben" wählen. Code-/Design-Änderungen (alles andere) kannst du
normal drüberspielen.

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
                password.php · events.php · images.php · upload.php
                menus.php  ← öffentlich, ohne Login: Änderungsdatum der Karten-PDFs
                auth.php   ← wird beim ersten Login erzeugt (nicht im Repo)
```
