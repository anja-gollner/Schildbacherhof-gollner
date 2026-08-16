<?php
// Schildbacherhof CMS – Admin-Oberfläche.
// Reine HTML-Hülle; die Logik läuft in app.js und spricht /api/* an.
header('Cache-Control: no-store');
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>CMS · Schildbacherhof</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="admin.css" />
</head>
<body>
  <div id="app" class="loading">Lädt …</div>
  <div id="toast" class="toast" hidden></div>
  <script src="app.js" defer></script>
</body>
</html>
