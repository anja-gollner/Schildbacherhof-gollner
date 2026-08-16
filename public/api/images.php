<?php
// Liste verfügbarer Bilder für die Auswahl im Event-Editor.
require __DIR__ . '/_bootstrap.php';
require_auth();

$out = [];
$scan = function (string $dir, string $prefix) use (&$out) {
  if (!is_dir($dir)) return;
  foreach (scandir($dir) ?: [] as $f) {
    if (preg_match('/\.(jpe?g|png|webp|avif)$/i', $f)) $out[] = $prefix . '/' . $f;
  }
};

$scan(IMG_DIR,              '/images');
$scan(IMG_DIR . '/marquee', '/images/marquee');
$scan(IMG_DIR . '/events',  '/images/events');

sort($out, SORT_STRING);
json_out(['images' => array_values(array_unique($out))]);
