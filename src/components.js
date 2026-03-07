// ===========================
// RPL – UI Rendering Components
// ===========================

// ---- Helpers ----
function getLegaClass(lega) {
  switch (lega.toUpperCase()) {
    case 'ELITE': return 'lega-elite';
    case 'A':     return 'lega-a';
    case 'B':     return 'lega-b';
    case 'C':     return 'lega-c';
    case 'D':     return 'lega-d';
    default:      return 'lega-d';
  }
}

function getRplStatusClass(status) {
  switch (status) {
    case 'Partner':       return 'bg-emerald-100 text-emerald-800 border border-emerald-400';
    case 'In Valutazione': return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
    default:              return 'bg-slate-100 text-slate-700 border border-slate-300';
  }
}

function reinitIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

// ---- Restaurant List ----
function renderRestaurantList(searchQuery = '', legaFilter = '') {
  const container = document.getElementById('restaurant-list');
  const countEl   = document.getElementById('search-count');
  if (!container) return;

  const q = (searchQuery || '').toLowerCase().trim();
  const l = (legaFilter  || '').toUpperCase().trim();

  const filtered = ristoranti.filter(r => {
    const matchQuery = !q ||
      r.nome.toLowerCase().includes(q) ||
      r.citta.toLowerCase().includes(q) ||
      r.cucina.toLowerCase().includes(q);
    const matchLega = !l || r.lega.toUpperCase() === l;
    return matchQuery && matchLega;
  });

  if (countEl) {
    countEl.textContent = filtered.length > 0
      ? `${filtered.length} ristorante${filtered.length !== 1 ? 'i' : ''} trovato${filtered.length !== 1 ? 'i' : ''}`
      : '';
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center py-16 text-slate-500">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-4 text-slate-300"></i>
        <p class="text-lg font-semibold">Nessun ristorante trovato</p>
        <p class="text-sm mt-1">Prova con criteri di ricerca diversi</p>
      </div>
    `;
    reinitIcons();
    return;
  }

  container.innerHTML = filtered.map(r => `
    <a href="#dettaglio-ristorante/${r.id}" class="card overflow-hidden block fade-in-up">
      <img src="${r.img}" alt="${r.nome}" class="w-full h-48 object-cover">
      <div class="p-5">
        <div class="flex justify-between items-start gap-2">
          <h3 class="text-lg font-bold text-slate-800 leading-tight">${r.nome}</h3>
          <span class="lega-badge ${getLegaClass(r.lega)} shrink-0">Lega ${r.lega}</span>
        </div>
        <p class="text-slate-500 mt-1 text-sm flex items-center gap-1">
          <i data-lucide="map-pin" class="w-3 h-3"></i>${r.citta} · ${r.cucina}
        </p>
        <div class="flex items-center gap-1 mt-3">
          <div class="score-bar-bg flex-grow" style="height:0.375rem;">
            <div class="score-bar-fill" style="width:${r.punteggio}%; height:100%;"></div>
          </div>
          <span class="text-xs font-bold text-teal-700 ml-2">${r.punteggio}/100</span>
        </div>
        <p class="mt-3 text-sm text-slate-500 line-clamp-2">${r.descrizione}</p>
      </div>
    </a>
  `).join('');

  reinitIcons();
}

// ---- Restaurant Detail ----
function renderDettaglioRistorante(id) {
  const container = document.getElementById('dettaglio-ristorante');
  const ristorante = ristoranti.find(r => r.id === id);

  if (!ristorante) {
    container.innerHTML = `<p class="text-center text-red-500 py-16">Ristorante non trovato.</p>`;
    return;
  }

  const staffHtml = (ristorante.staff && ristorante.staff.length > 0)
    ? ristorante.staff.map(s => `
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div class="bg-teal-200 h-10 w-10 rounded-full flex items-center justify-center text-teal-800 font-bold text-sm">
            ${s.nome.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p class="font-semibold text-slate-800 text-sm">${s.nome}</p>
            <p class="text-xs text-slate-500">${s.ruolo}</p>
          </div>
        </div>
      `).join('')
    : `<p class="text-slate-500 text-sm">Staff non disponibile pubblicamente.</p>`;

  container.innerHTML = `
    <a href="#cerca-ristoranti" class="inline-flex items-center gap-2 text-teal-700 font-semibold mb-6 hover:underline text-sm">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Torna alla ricerca
    </a>
    <div class="card overflow-hidden">
      <img src="${ristorante.img}" alt="${ristorante.nome}" class="w-full h-56 md:h-80 object-cover">
      <div class="p-6 md:p-10">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-800">${ristorante.nome}</h1>
          <span class="lega-badge ${getLegaClass(ristorante.lega)}">Lega ${ristorante.lega}</span>
        </div>
        <p class="text-slate-500 mt-2 flex items-center gap-1">
          <i data-lucide="map-pin" class="w-4 h-4"></i>${ristorante.citta} · Cucina ${ristorante.cucina}
        </p>

        <!-- Score bar -->
        <div class="mt-5 flex items-center gap-3">
          <div class="flex-grow score-bar-bg">
            <div class="score-bar-fill" style="width:${ristorante.punteggio}%"></div>
          </div>
          <span class="text-lg font-extrabold text-teal-700 shrink-0">${ristorante.punteggio}/100</span>
        </div>

        <div class="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-bold text-slate-800 mb-3">La nostra filosofia</h2>
            <p class="text-slate-600 leading-relaxed">${ristorante.descrizione}</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-800 mb-3">🌿 Impegno Sostenibilità</h2>
            <p class="text-slate-600 leading-relaxed">${ristorante.sostenibilita}</p>
          </div>
        </div>

        <div class="mt-8 border-t border-slate-100 pt-8">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Il nostro Team</h2>
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            ${staffHtml}
          </div>
        </div>
      </div>
    </div>
  `;
  reinitIcons();
}

// ---- Staff List (Dashboard) ----
function renderStaffList() {
  const container = document.getElementById('staff-list-ristoratore');
  if (!container) return;

  container.innerHTML = staffTrattoriaDelPonte.map(m => `
    <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
      <div class="flex items-center gap-3">
        <img src="${m.img}" alt="${m.nome}" class="h-10 w-10 rounded-full object-cover">
        <div>
          <p class="font-semibold text-slate-800 text-sm">${m.nome}</p>
          <p class="text-xs text-slate-500">${m.ruolo}</p>
        </div>
      </div>
      <a href="#dashboard-lavoratore" class="text-teal-700 font-semibold text-xs hover:underline">iProfile →</a>
    </div>
  `).join('');
}

// ---- Food Chains List ----
function renderCateneFood() {
  const container = document.getElementById('catene-food-list');
  if (!container) return;

  container.innerHTML = cateneFood.map(c => `
    <a href="#dettaglio-catena/${c.id}" class="card overflow-hidden block fade-in-up">
      <img src="${c.img}" alt="${c.nome}" class="w-full h-44 object-cover">
      <div class="p-5">
        <div class="flex justify-between items-start gap-2">
          <h3 class="text-lg font-bold text-slate-800">${c.nome}</h3>
          <span class="lega-badge ${getRplStatusClass(c.rplStatus)} shrink-0 text-xs">${c.rplStatus}</span>
        </div>
        <p class="text-slate-400 text-xs mt-1 font-medium uppercase tracking-wide">${c.settore}</p>
        <p class="mt-3 text-sm text-slate-600 leading-relaxed">${c.descrizione}</p>
        <div class="mt-4 flex gap-4 text-sm text-slate-600">
          <span class="flex items-center gap-1">
            <i data-lucide="store" class="w-3.5 h-3.5 text-teal-600"></i>
            ${c.sedi} sedi
          </span>
          <span class="flex items-center gap-1">
            <i data-lucide="users" class="w-3.5 h-3.5 text-teal-600"></i>
            ${c.dipendenti.toLocaleString('it-IT')} dipendenti
          </span>
        </div>
      </div>
    </a>
  `).join('');

  reinitIcons();
}

// ---- Chain Detail ----
function renderDettaglioCatena(id) {
  const container = document.getElementById('dettaglio-catena');
  const catena = cateneFood.find(c => c.id === id);

  if (!catena) {
    container.innerHTML = `<p class="text-center text-red-500 py-16">Catena non trovata.</p>`;
    return;
  }

  const ruoliHtml = catena.ruoliPrincipali
    .map(r => `<span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium text-sm">${r}</span>`)
    .join('');

  const beneficiHtml = catena.benefici
    .map(b => `
      <li class="flex items-start gap-2">
        <i data-lucide="check-circle" class="w-4 h-4 text-teal-600 mt-0.5 shrink-0"></i>
        <span class="text-sm">${b}</span>
      </li>
    `).join('');

  const dipendentiCatena = dipendentiCateneFood.filter(d => d.catena === catena.nome);
  const dipendentiHtml = dipendentiCatena.length > 0
    ? dipendentiCatena.map(d => `
        <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
          <div class="flex items-center gap-3">
            <img src="${d.img}" alt="${d.nome}" class="h-10 w-10 rounded-full object-cover">
            <div>
              <p class="font-semibold text-slate-800 text-sm">${d.nome}</p>
              <p class="text-xs text-slate-500">${d.ruolo} · ${d.anniEsperienza} anni</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-400">iProfile</p>
            <p class="font-bold text-teal-700 text-sm">${d.iProfileScore}/100</p>
          </div>
        </div>
      `).join('')
    : `<p class="text-slate-500 text-sm">Nessun dipendente RPL registrato per questa catena.</p>`;

  container.innerHTML = `
    <a href="#catene-food" class="inline-flex items-center gap-2 text-teal-700 font-semibold mb-6 hover:underline text-sm">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Torna alle Catene
    </a>
    <div class="card overflow-hidden">
      <img src="${catena.img}" alt="${catena.nome}" class="w-full h-56 md:h-72 object-cover">
      <div class="p-6 md:p-10">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-800">${catena.nome}</h1>
          <span class="lega-badge ${getRplStatusClass(catena.rplStatus)}">${catena.rplStatus}</span>
        </div>
        <p class="text-slate-400 text-sm mt-1 font-medium uppercase tracking-wide">${catena.settore}</p>
        <p class="mt-4 text-slate-600 leading-relaxed">${catena.descrizione}</p>

        <div class="mt-8 grid sm:grid-cols-3 gap-4">
          <div class="card p-5 text-center">
            <p class="text-2xl font-extrabold text-teal-700">${catena.sedi}</p>
            <p class="text-slate-500 mt-1 text-xs">Sedi in Italia</p>
          </div>
          <div class="card p-5 text-center">
            <p class="text-2xl font-extrabold text-teal-700">${catena.dipendenti.toLocaleString('it-IT')}</p>
            <p class="text-slate-500 mt-1 text-xs">Dipendenti Totali</p>
          </div>
          <div class="card p-5 text-center">
            <p class="text-2xl font-extrabold text-teal-700">${catena.dipendentiRPL}</p>
            <p class="text-slate-500 mt-1 text-xs">iProfile RPL</p>
          </div>
        </div>

        <div class="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-bold text-slate-800 mb-3">Ruoli Principali</h2>
            <div class="flex flex-wrap gap-2">${ruoliHtml}</div>

            <h2 class="text-xl font-bold text-slate-800 mt-6 mb-3">Sfide per i Dipendenti</h2>
            <p class="text-slate-600 leading-relaxed text-sm">${catena.sfide}</p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-800 mb-3">Benefici & Welfare</h2>
            <ul class="space-y-2 text-slate-700">${beneficiHtml}</ul>
            <div class="mt-5 bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p class="text-xs font-semibold text-teal-700 uppercase tracking-wide">Stipendio Medio</p>
              <p class="text-2xl font-extrabold text-teal-700 mt-1">${catena.stipendioMedio}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-slate-100 pt-8">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Dipendenti con iProfile RPL</h2>
          <div class="space-y-1">${dipendentiHtml}</div>
        </div>
      </div>
    </div>
  `;

  reinitIcons();
}
