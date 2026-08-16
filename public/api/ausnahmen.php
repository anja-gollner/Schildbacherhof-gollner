<?php
// Ausnahmetage: Feiertage, Betriebsurlaub, geschlossene Gesellschaften.
//
// GET  = öffentlich lesen (die Website fragt das beim Laden ab)
// POST = speichern, nur eingeloggt
//
// Ohne diese Liste rechnet die Startseite ausschließlich mit dem festen
// Wochenplan und behauptet am 25.12. fröhlich "Jetzt geöffnet".
//
// Format je Eintrag:
//   { "von": "2026-12-24", "bis": "2026-12-26", "text": "Weihnachten",
//     "zu": true, "von_zeit": "", "bis_zeit": "" }
// zu=false + Zeiten = abweichende Öffnungszeiten statt Schließtag.
require __DIR__ . '/_bootstrap.php';

define('AUSNAHMEN_FILE', CONTENT_DIR . '/ausnahmen.json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  header('Cache-Control: no-cache, max-age=0');
  $raw  = is_file(AUSNAHMEN_FILE) ? (file_get_contents(AUSNAHMEN_FILE) ?: '[]') : '[]';
  $data = json_decode($raw, true);
  if (!is_array($data)) $data = [];

  // Abgelaufene Einträge gar nicht erst ausliefern — die Website muss
  // nicht wissen, dass letztes Jahr Weihnachten war.
  $heute = date('Y-m-d');
  $data = array_values(array_filter($data, fn($e) => ($e['bis'] ?? $e['von'] ?? '') >= $heute));

  json_out(['ausnahmen' => $data]);
}

if ($method === 'POST') {
  require_auth();
  require_csrf();

  $body = read_json_body();
  $list = $body['ausnahmen'] ?? null;
  if (!is_array($list)) json_out(['error' => 'ausnahmen muss ein Array sein'], 422);
  if (count($list) > 200) json_out(['error' => 'zu viele Einträge'], 422);

  $istDatum = fn($s) => is_string($s) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $s) === 1;
  $istZeit  = fn($s) => is_string($s) && preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $s) === 1;

  $clean = [];
  foreach ($list as $e) {
    if (!is_array($e)) continue;
    $von = (string)($e['von'] ?? '');
    if (!$istDatum($von)) continue;

    $bis = (string)($e['bis'] ?? '');
    if (!$istDatum($bis) || $bis < $von) $bis = $von;   // einzelner Tag

    $zu = !empty($e['zu']);
    $vz = (string)($e['von_zeit'] ?? '');
    $bz = (string)($e['bis_zeit'] ?? '');
    if (!$istZeit($vz)) $vz = '';
    if (!$istZeit($bz)) $bz = '';
    // Abweichende Zeiten ergeben nur Sinn, wenn nicht geschlossen ist
    if ($zu) { $vz = ''; $bz = ''; }
    if (!$zu && ($vz === '' || $bz === '' || $bz <= $vz)) continue; // unbrauchbar

    $clean[] = [
      'von'      => $von,
      'bis'      => $bis,
      'text'     => mb_substr(trim((string)($e['text'] ?? '')), 0, 120),
      'zu'       => $zu,
      'von_zeit' => $vz,
      'bis_zeit' => $bz
    ];
  }

  usort($clean, fn($a, $b) => strcmp($a['von'], $b['von']));

  if (!is_dir(CONTENT_DIR)) @mkdir(CONTENT_DIR, 0775, true);
  $json = json_encode($clean, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  if (@file_put_contents(AUSNAHMEN_FILE, $json, LOCK_EX) === false) {
    json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /content?'], 500);
  }

  json_out(['ok' => true, 'ausnahmen' => $clean]);
}

json_out(['error' => 'method not allowed'], 405);
