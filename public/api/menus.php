<?php
// Öffentlich lesbar (kein Login): liefert nur das Änderungsdatum der beiden
// Speisekarten-PDFs. Die Restaurant-Seite hängt den Zeitstempel als ?v= an die
// PDF-URL — damit sehen Gäste nach einem Upload sofort die neue Karte statt
// einer alten aus dem Browser-Cache. Zusätzlich wird daraus das "Stand:"-Datum.
//
// Bewusst auf filemtime() gestützt und nicht auf eine vom CMS geschriebene
// Datei: so stimmt der Zeitstempel auch dann, wenn eine Karte ausnahmsweise
// per FileZilla statt übers CMS ausgetauscht wird.
require __DIR__ . '/_bootstrap.php';

header('Cache-Control: no-cache, max-age=0');

$out = [];
foreach (['wochenmenue', 'a-la-carte'] as $key) {
  $file = PDF_DIR . '/' . $key . '.pdf';
  if (is_file($file)) {
    $t = @filemtime($file) ?: 0;
    $out[$key] = ['v' => $t, 'updated' => $t ? date('c', $t) : null];
  }
}

json_out($out);
