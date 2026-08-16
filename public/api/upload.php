<?php
// Datei-Upload: PDFs (Speisekarten) und Event-Bilder.
require __DIR__ . '/_bootstrap.php';
require_auth();
require_csrf();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'method not allowed'], 405);
if (!isset($_FILES['file'])) json_out(['error' => 'Keine Datei erhalten.'], 422);

$type = (string)($_POST['type'] ?? '');
$f    = $_FILES['file'];

if ($f['error'] !== UPLOAD_ERR_OK) json_out(['error' => 'Upload-Fehler (' . $f['error'] . ').'], 422);
if ($f['size'] > 25 * 1024 * 1024) json_out(['error' => 'Datei zu groß (max. 25 MB).'], 422);
if (!is_uploaded_file($f['tmp_name'])) json_out(['error' => 'Ungültiger Upload.'], 422);

// ── PDF (Wochenmenü / À la carte) ──
if ($type === 'pdf') {
  $target  = (string)($_POST['target'] ?? '');
  $allowed = ['wochenmenue.pdf', 'a-la-carte.pdf'];
  if (!in_array($target, $allowed, true)) json_out(['error' => 'Unbekanntes Ziel.'], 422);

  $fh = fopen($f['tmp_name'], 'rb');
  $head = $fh ? fread($fh, 5) : '';
  if ($fh) fclose($fh);
  if (strncmp($head, '%PDF-', 5) !== 0) json_out(['error' => 'Das ist keine gültige PDF-Datei.'], 422);

  if (!is_dir(PDF_DIR)) @mkdir(PDF_DIR, 0775, true);
  if (!move_uploaded_file($f['tmp_name'], PDF_DIR . '/' . $target)) {
    json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /pdf?'], 500);
  }
  json_out(['ok' => true, 'path' => '/pdf/' . $target]);
}

// ── Event-Bild ──
if ($type === 'image') {
  $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
  if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'avif'], true)) {
    json_out(['error' => 'Nur Bilder erlaubt (jpg, png, webp, avif).'], 422);
  }
  if (@getimagesize($f['tmp_name']) === false && !in_array($ext, ['webp', 'avif'], true)) {
    json_out(['error' => 'Keine gültige Bilddatei.'], 422);
  }

  $base = preg_replace('/[^a-z0-9\-]+/', '-', strtolower(pathinfo($f['name'], PATHINFO_FILENAME)));
  $base = trim((string)$base, '-') ?: 'bild';
  $ext  = ($ext === 'jpeg') ? 'jpg' : $ext;

  $dir = IMG_DIR . '/events';
  if (!is_dir($dir)) @mkdir($dir, 0775, true);

  $name = $base . '.' . $ext;
  $i = 1;
  while (is_file($dir . '/' . $name)) { $name = $base . '-' . (++$i) . '.' . $ext; }

  if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
    json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /images?'], 500);
  }
  json_out(['ok' => true, 'path' => '/images/events/' . $name]);
}

json_out(['error' => 'Unbekannter Upload-Typ.'], 422);
