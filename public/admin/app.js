/* Schildbacherhof CMS – Frontend-Logik (Vanilla JS, spricht /api/*). */
(() => {
  const app = document.getElementById('app');
  const toastEl = document.getElementById('toast');

  const state = { csrf: '', events: [], images: [], ausnahmen: [], editIndex: null };

  // ── Helpers ─────────────────────────────────────────────
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let toastTimer;
  function toast(msg, isErr = false) {
    toastEl.textContent = msg;
    toastEl.className = 'toast' + (isErr ? ' err' : '');
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastEl.hidden = true), 3200);
  }

  async function api(path, { method = 'GET', body = null, form = null } = {}) {
    const opts = { method, headers: {} };
    if (state.csrf) opts.headers['X-CSRF'] = state.csrf;
    if (form) { opts.body = form; }
    else if (body) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    const res = await fetch('/api/' + path, opts);
    let data = {};
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) throw new Error(data.error || ('Fehler ' + res.status));
    return data;
  }

  const fmtDate = (iso) => {
    if (!iso) return 'kein Datum';
    try {
      return new Date(iso).toLocaleString('de-AT',
        { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' Uhr';
    } catch (_) { return iso; }
  };

  // ── Boot ────────────────────────────────────────────────
  async function boot() {
    try {
      const s = await api('session.php');
      state.csrf = s.csrf;
      if (s.setupNeeded) return renderSetup();
      if (!s.authenticated) return renderLogin();
      return renderDashboard();
    } catch (e) {
      app.className = '';
      app.innerHTML = `<div class="auth"><div class="card"><h2>Verbindung fehlgeschlagen</h2>
        <p class="muted">${esc(e.message)}</p>
        <p class="hint">Läuft die Seite auf einem Server mit PHP? Lokal: <code>php -S localhost:8000</code> im Ordner <code>public/</code>.</p>
      </div></div>`;
    }
  }

  // ── Setup (Erstanmeldung) ───────────────────────────────
  function renderSetup() {
    app.className = '';
    app.innerHTML = `<div class="auth"><form class="card" id="f">
      <p class="eyebrow">Erste Einrichtung</p>
      <h2>Passwort festlegen</h2>
      <p class="hint">Lege ein Passwort für dein CMS fest (mind. 8 Zeichen). Merk es dir gut.</p>
      <div class="field" style="margin-top:1rem">
        <label>Neues Passwort</label>
        <input type="password" id="p1" autocomplete="new-password" required minlength="8" />
      </div>
      <div class="field">
        <label>Passwort wiederholen</label>
        <input type="password" id="p2" autocomplete="new-password" required minlength="8" />
      </div>
      <button class="btn btn-primary" style="width:100%">Einrichten &amp; anmelden</button>
      <p class="err-text" id="err"></p>
    </form></div>`;
    document.getElementById('f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = document.getElementById('p1').value, p2 = document.getElementById('p2').value;
      const err = document.getElementById('err');
      if (p1 !== p2) { err.textContent = 'Die Passwörter stimmen nicht überein.'; return; }
      try {
        const r = await api('login.php', { method: 'POST', body: { action: 'setup', password: p1 } });
        state.csrf = r.csrf; toast('Eingerichtet – willkommen!'); renderDashboard();
      } catch (ex) { err.textContent = ex.message; }
    });
  }

  // ── Login ───────────────────────────────────────────────
  function renderLogin() {
    app.className = '';
    app.innerHTML = `<div class="auth"><form class="card" id="f">
      <p class="eyebrow">Der Schildbacherhof</p>
      <h2>CMS-Login</h2>
      <div class="field" style="margin-top:1rem">
        <label>Passwort</label>
        <input type="password" id="p" autocomplete="current-password" required />
      </div>
      <button class="btn btn-primary" style="width:100%">Anmelden</button>
      <p class="err-text" id="err"></p>
    </form></div>`;
    document.getElementById('f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = document.getElementById('err');
      try {
        const r = await api('login.php', { method: 'POST', body: { password: document.getElementById('p').value } });
        state.csrf = r.csrf; renderDashboard();
      } catch (ex) { err.textContent = ex.message; }
    });
  }

  // ── Dashboard ───────────────────────────────────────────
  async function renderDashboard() {
    app.className = '';
    app.innerHTML = `
      <div class="topbar">
        <div class="brand">Schildbacherhof <small>CMS</small></div>
        <div class="actions">
          <a class="btn btn-ghost btn-sm" href="/events" target="_blank">Events ansehen ↗</a>
          <button class="btn btn-ghost btn-sm" id="pw">Passwort ändern</button>
          <button class="btn btn-ghost btn-sm" id="logout">Abmelden</button>
        </div>
      </div>
      <div class="wrap stack">
        <section>
          <div class="section-title">
            <div><p class="eyebrow">Events</p><h2>Themenabende verwalten</h2></div>
            <button class="btn btn-primary" id="add">+ Neuer Event</button>
          </div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Vergangene Termine werden auf der Website automatisch ausgeblendet – nichts löschen nötig.
          </p>
          <div class="events" id="list"></div>
        </section>

        <div class="divider"></div>

        <section>
          <div class="section-title"><div><p class="eyebrow">Speisekarten</p><h2>PDFs hochladen</h2></div></div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Der Dateiname ist egal – die Datei wird beim Hochladen automatisch richtig abgelegt.
          </p>
          <div class="row">
            ${pdfCard('Wochenmenü', 'wochenmenue.pdf')}
            ${pdfCard('À la carte', 'a-la-carte.pdf')}
          </div>
        </section>

        <div class="divider"></div>

        <section>
          <div class="section-title">
            <div><p class="eyebrow">Öffnungszeiten</p><h2>Feiertage & Urlaub</h2></div>
            <button class="btn btn-primary" id="addAus">+ Neuer Eintrag</button>
          </div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Hier eingetragene Tage überschreiben den normalen Wochenplan. Ohne Eintrag zeigt
            die Website am Feiertag „Jetzt geöffnet“. Vergangenes verschwindet von selbst.
          </p>
          <div id="ausListe"></div>
        </section>

        <div class="divider"></div>

        <section>
          <div class="section-title"><div><p class="eyebrow">Server</p><h2>Funktioniert hier alles?</h2></div></div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Prüft, ob dieser Webhoster alles kann, was die Website braucht. Einmal nach
            dem Umzug ansehen – danach nur noch, wenn etwas klemmt.
          </p>
          <div id="statusListe"><p class="muted">wird geprüft …</p></div>
        </section>
      </div>`;

    document.getElementById('logout').onclick = async () => { await api('logout.php', { method: 'POST' }); renderLogin(); };
    document.getElementById('pw').onclick = renderPasswordModal;
    document.getElementById('add').onclick = () => openEditor(null);
    document.getElementById('addAus').onclick = () => addAusnahme();
    document.querySelectorAll('[data-pdf]').forEach((el) => el.addEventListener('submit', onPdfUpload));

    try {
      const [ev, im, au] = await Promise.all([api('events.php'), api('images.php'), api('ausnahmen.php')]);
      state.events = ev.events || [];
      state.images = im.images || [];
      state.ausnahmen = au.ausnahmen || [];
    } catch (e) { toast(e.message, true); }
    renderList();
    renderAusnahmen();
    renderStatus();
  }

  // ── Server-Diagnose ─────────────────────────────────────
  async function renderStatus() {
    const el = document.getElementById('statusListe');
    if (!el) return;
    try {
      const d = await api('status.php');
      el.innerHTML = `<div class="card">${d.pruefungen.map((p) => `
        <div style="display:flex;gap:.7rem;align-items:flex-start;padding:.55rem 0;border-bottom:1px solid rgba(0,0,0,.07)">
          <span style="font-size:1.05rem;line-height:1.4">${p.ok ? '✅' : '⚠️'}</span>
          <div style="flex:1;min-width:0">
            <div><strong>${esc(p.name)}</strong> — <span class="muted">${esc(p.wert)}</span></div>
            ${p.ok ? '' : `<div class="hint" style="margin-top:.15rem">${esc(p.hilfe)}</div>`}
          </div>
        </div>`).join('')}
        <p class="muted" style="margin-top:.8rem;font-size:.9rem">
          ${d.alles_ok
            ? 'Alles in Ordnung — der Server kann alles, was gebraucht wird.'
            : 'Die markierten Punkte bitte beim Hoster klären. Die Website läuft trotzdem, einzelne Funktionen aber eingeschränkt.'}
        </p>
      </div>`;
    } catch (e) {
      el.innerHTML = `<p class="muted">Diagnose nicht möglich: ${esc(e.message)}</p>`;
    }
  }

  // ── Feiertage & Urlaub ──────────────────────────────────
  const heuteISO = () => new Date().toISOString().slice(0, 10);

  function addAusnahme() {
    state.ausnahmen.push({ von: heuteISO(), bis: heuteISO(), text: '', zu: true, von_zeit: '', bis_zeit: '' });
    renderAusnahmen();
  }

  function renderAusnahmen() {
    const el = document.getElementById('ausListe');
    if (!el) return;
    if (!state.ausnahmen.length) {
      el.innerHTML = `<div class="empty">Keine Ausnahmen eingetragen – es gilt der normale Wochenplan.</div>`;
      return;
    }
    el.innerHTML = state.ausnahmen.map((a, i) => `
      <div class="card" style="margin-bottom:.7rem">
        <div class="row">
          <div class="field"><label>Von</label>
            <input type="date" data-a="von" data-i="${i}" value="${esc(a.von)}" /></div>
          <div class="field"><label>Bis <span class="hint">(gleicher Tag = ein Tag)</span></label>
            <input type="date" data-a="bis" data-i="${i}" value="${esc(a.bis || a.von)}" /></div>
        </div>
        <div class="field"><label>Grund <span class="hint">(erscheint auf der Website)</span></label>
          <input type="text" data-a="text" data-i="${i}" value="${esc(a.text)}"
                 placeholder="z. B. Weihnachtsfeiertag, Betriebsurlaub" /></div>
        <div class="field">
          <label class="inline"><input type="checkbox" data-a="zu" data-i="${i}" ${a.zu ? 'checked' : ''} /> ganztägig geschlossen</label>
        </div>
        <div class="row" ${a.zu ? 'hidden' : ''} data-zeiten="${i}">
          <div class="field"><label>Geöffnet von</label>
            <input type="time" data-a="von_zeit" data-i="${i}" value="${esc(a.von_zeit)}" /></div>
          <div class="field"><label>bis</label>
            <input type="time" data-a="bis_zeit" data-i="${i}" value="${esc(a.bis_zeit)}" /></div>
        </div>
        <button class="btn btn-ghost btn-sm" data-del-a="${i}">Löschen</button>
      </div>`).join('') +
      `<button class="btn btn-primary" id="saveAus">Ausnahmen speichern</button>`;

    el.querySelectorAll('[data-a]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const i = +inp.dataset.i, feld = inp.dataset.a;
        state.ausnahmen[i][feld] = inp.type === 'checkbox' ? inp.checked : inp.value;
        if (feld === 'zu') {
          const zeilen = el.querySelector(`[data-zeiten="${i}"]`);
          if (zeilen) zeilen.hidden = inp.checked;
        }
      });
    });
    el.querySelectorAll('[data-del-a]').forEach((b) => {
      b.onclick = () => { state.ausnahmen.splice(+b.dataset.delA, 1); renderAusnahmen(); };
    });
    el.querySelector('#saveAus').onclick = saveAusnahmen;
  }

  async function saveAusnahmen() {
    try {
      const res = await api('ausnahmen.php', { method: 'POST', body: { ausnahmen: state.ausnahmen } });
      state.ausnahmen = res.ausnahmen || [];
      renderAusnahmen();
      toast('Ausnahmen gespeichert');
    } catch (e) { toast(e.message, true); }
  }

  function pdfCard(label, target) {
    return `<form class="card" data-pdf="${target}">
      <h3 style="font-size:1.15rem;margin-bottom:.3rem">${label}</h3>
      <p class="hint">Aktuelle Datei: <a href="/pdf/${target}" target="_blank">/pdf/${target}</a></p>
      <div class="field" style="margin-top:.8rem"><input type="file" accept="application/pdf" required /></div>
      <button class="btn btn-dark btn-sm">Hochladen</button>
      <span class="muted" style="font-size:.82rem;margin-left:.6rem" data-status></span>
    </form>`;
  }

  async function onPdfUpload(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const target = formEl.getAttribute('data-pdf');
    const file = formEl.querySelector('input[type=file]').files[0];
    const status = formEl.querySelector('[data-status]');
    if (!file) return;
    status.textContent = 'lädt …';
    const fd = new FormData(); fd.append('type', 'pdf'); fd.append('target', target); fd.append('file', file);
    try { await api('upload.php', { method: 'POST', form: fd }); status.textContent = '✓ aktualisiert'; toast(target + ' aktualisiert'); }
    catch (ex) { status.textContent = ''; toast(ex.message, true); }
  }

  function renderList() {
    const list = document.getElementById('list');
    if (!list) return;
    if (!state.events.length) { list.innerHTML = `<div class="empty">Noch keine Events angelegt.</div>`; return; }
    list.innerHTML = state.events.map((e, i) => `
      <div class="ev">
        <img class="thumb" src="${esc(e.image || '')}" alt="" onerror="this.style.visibility='hidden'" />
        <div>
          <div class="meta">${esc(fmtDate(e.date))}</div>
          <h3>${esc(e.title || '(ohne Titel)')}</h3>
          <div class="sub">${esc(e.subtitle || '')}${e.price ? ' · ' + esc(e.price) : ''}</div>
        </div>
        <div class="ev-actions">
          <button class="btn btn-ghost btn-sm" data-edit="${i}">Bearbeiten</button>
          <button class="btn btn-danger btn-sm" data-del="${i}">Löschen</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('[data-edit]').forEach((b) => b.onclick = () => openEditor(+b.dataset.edit));
    list.querySelectorAll('[data-del]').forEach((b) => b.onclick = () => deleteEvent(+b.dataset.del));
  }

  async function deleteEvent(i) {
    const e = state.events[i];
    if (!confirm(`Event „${e.title || ''}" wirklich löschen?`)) return;
    state.events.splice(i, 1);
    await persist('Event gelöscht');
    renderList();
  }

  // ── Editor (Modal) ──────────────────────────────────────
  function openEditor(index) {
    state.editIndex = index;
    const e = index === null
      ? { id: '', title: '', date: '', subtitle: '', text: '', price: '', image: '' }
      : { ...state.events[index] };

    const imgOptions = ['<option value="">— Bild wählen —</option>']
      .concat(state.images.map((p) => `<option value="${esc(p)}"${p === e.image ? ' selected' : ''}>${esc(p)}</option>`))
      .join('');

    const bg = document.createElement('div');
    bg.className = 'modal-bg';
    bg.innerHTML = `<form class="card modal" id="ef">
      <h2>${index === null ? 'Neuer Event' : 'Event bearbeiten'}</h2>
      <div class="field"><label>Titel</label><input id="title" value="${esc(e.title)}" required /></div>
      <div class="row">
        <div class="field"><label>Datum &amp; Uhrzeit</label><input id="date" type="datetime-local" value="${esc((e.date || '').slice(0, 16))}" required /></div>
        <div class="field"><label>Preis</label><input id="price" value="${esc(e.price)}" placeholder="z. B. 89 € pro Person" /></div>
      </div>
      <div class="field"><label>Untertitel</label><input id="subtitle" value="${esc(e.subtitle)}" placeholder="z. B. 5-Gang-Menü bei Kerzenschein" /></div>
      <div class="field"><label>Beschreibung</label><textarea id="text">${esc(e.text)}</textarea></div>
      <div class="field">
        <label>Bild</label>
        <div class="imgpick">
          <img id="preview" src="${esc(e.image || '')}" alt="" onerror="this.style.visibility='hidden'" />
          <select id="image">${imgOptions}</select>
        </div>
        <p class="hint">Oder neues Bild hochladen: <input type="file" id="imgfile" accept="image/*" style="display:inline-block;width:auto;padding:.3rem" /></p>
        <p class="err-text" id="imgerr"></p>
      </div>
      <p class="err-text" id="eferr"></p>
      <div style="display:flex;gap:.6rem;justify-content:flex-end;margin-top:.5rem">
        <button type="button" class="btn btn-ghost" id="cancel">Abbrechen</button>
        <button class="btn btn-primary" id="save">Speichern</button>
      </div>
    </form>`;
    document.body.appendChild(bg);

    const close = () => bg.remove();
    bg.addEventListener('click', (ev) => { if (ev.target === bg) close(); });
    bg.querySelector('#cancel').onclick = close;

    const sel = bg.querySelector('#image');
    const prev = bg.querySelector('#preview');
    sel.onchange = () => { prev.src = sel.value; prev.style.visibility = sel.value ? 'visible' : 'hidden'; };

    bg.querySelector('#imgfile').onchange = async (ev) => {
      const file = ev.target.files[0]; if (!file) return;
      const imgerr = bg.querySelector('#imgerr'); imgerr.textContent = 'lädt …';
      const fd = new FormData(); fd.append('type', 'image'); fd.append('file', file);
      try {
        const r = await api('upload.php', { method: 'POST', form: fd });
        if (!state.images.includes(r.path)) { state.images.push(r.path); state.images.sort(); }
        sel.insertAdjacentHTML('beforeend', `<option value="${esc(r.path)}">${esc(r.path)}</option>`);
        sel.value = r.path; sel.onchange(); imgerr.textContent = '';
        toast('Bild hochgeladen');
      } catch (ex) { imgerr.textContent = ex.message; }
    };

    bg.querySelector('#ef').addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const obj = {
        id: e.id,
        title: bg.querySelector('#title').value.trim(),
        date: bg.querySelector('#date').value.trim(),
        subtitle: bg.querySelector('#subtitle').value.trim(),
        text: bg.querySelector('#text').value.trim(),
        price: bg.querySelector('#price').value.trim(),
        image: bg.querySelector('#image').value.trim(),
      };
      if (!obj.title) { bg.querySelector('#eferr').textContent = 'Titel fehlt.'; return; }
      if (index === null) state.events.push(obj); else state.events[index] = obj;
      try { await persist(index === null ? 'Event angelegt' : 'Event gespeichert'); close(); renderList(); }
      catch (ex) { bg.querySelector('#eferr').textContent = ex.message; }
    });
  }

  // ── Speichern (komplette Liste) ─────────────────────────
  async function persist(msg) {
    const r = await api('events.php', { method: 'POST', body: { events: state.events } });
    const fresh = await api('events.php'); // zurücklesen, damit IDs/Reihenfolge stimmen
    state.events = fresh.events || [];
    toast(msg || 'Gespeichert');
    return r;
  }

  // ── Passwort ändern ─────────────────────────────────────
  function renderPasswordModal() {
    const bg = document.createElement('div');
    bg.className = 'modal-bg';
    bg.innerHTML = `<form class="card modal" id="pf" style="max-width:440px">
      <h2>Passwort ändern</h2>
      <div class="field"><label>Aktuelles Passwort</label><input type="password" id="cur" autocomplete="current-password" required /></div>
      <div class="field"><label>Neues Passwort</label><input type="password" id="nw" autocomplete="new-password" required minlength="8" /></div>
      <p class="err-text" id="pferr"></p>
      <div style="display:flex;gap:.6rem;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" id="pcancel">Abbrechen</button>
        <button class="btn btn-primary">Ändern</button>
      </div>
    </form>`;
    document.body.appendChild(bg);
    const close = () => bg.remove();
    bg.addEventListener('click', (e) => { if (e.target === bg) close(); });
    bg.querySelector('#pcancel').onclick = close;
    bg.querySelector('#pf').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await api('password.php', { method: 'POST', body: { current: bg.querySelector('#cur').value, next: bg.querySelector('#nw').value } });
        toast('Passwort geändert'); close();
      } catch (ex) { bg.querySelector('#pferr').textContent = ex.message; }
    });
  }

  boot();
})();
