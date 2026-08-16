<?php
// GET  = Eventliste lesen (öffentlich)
// POST = komplette Eventliste speichern (nur eingeloggt)
require __DIR__ . '/_bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $raw  = is_file(EVENTS_FILE) ? (file_get_contents(EVENTS_FILE) ?: '[]') : '[]';
  $data = json_decode($raw, true);
  json_out(['events' => is_array($data) ? $data : []]);
}

if ($method === 'POST') {
  require_auth();
  require_csrf();

  $body   = read_json_body();
  $events = $body['events'] ?? null;
  if (!is_array($events)) json_out(['error' => 'events muss ein Array sein'], 422);
  if (count($events) > 200) json_out(['error' => 'zu viele Einträge'], 422);

  $clean = [];
  $seen  = [];
  foreach ($events as $e) {
    if (!is_array($e)) continue;

    $title = trim((string)($e['title'] ?? ''));
    if ($title === '') continue; // leere Einträge überspringen

    $id = preg_replace('/[^a-z0-9\-]/', '', strtolower((string)($e['id'] ?? '')));
    if ($id === '' || $id === null) {
      $id = preg_replace('/[^a-z0-9]+/', '-', strtolower($title));
      $id = trim((string)$id, '-');
    }
    // Eindeutigkeit sicherstellen
    $base = $id ?: 'event';
    $n = 1;
    while (isset($seen[$id])) { $id = $base . '-' . (++$n); }
    $seen[$id] = true;

    $clean[] = [
      'id'       => $id,
      'title'    => $title,
      'date'     => trim((string)($e['date'] ?? '')),
      'subtitle' => trim((string)($e['subtitle'] ?? '')),
      'text'     => trim((string)($e['text'] ?? '')),
      'price'    => trim((string)($e['price'] ?? '')),
      'image'    => trim((string)($e['image'] ?? '')),
    ];
  }

  if (!is_dir(CONTENT_DIR)) @mkdir(CONTENT_DIR, 0775, true);
  if (is_file(EVENTS_FILE)) @copy(EVENTS_FILE, EVENTS_FILE . '.bak'); // einfaches Backup

  $json = json_encode($clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
  if (@file_put_contents(EVENTS_FILE, $json, LOCK_EX) === false) {
    json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /content?'], 500);
  }
  json_out(['ok' => true, 'count' => count($clean)]);
}

json_out(['error' => 'method not allowed'], 405);
