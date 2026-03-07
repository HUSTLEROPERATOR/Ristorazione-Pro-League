// --- FUNZIONI DI RENDERING / COMPONENTI ---

function getLegaClass(lega) {
  switch (lega.toUpperCase()) {
    case 'ELITE': return 'lega-elite';
    case 'A': return 'lega-a';
    case 'B': return 'lega-b';
    case 'C': return 'lega-c';
    case 'D': return 'lega-d';
    default: return 'lega-d';
  }
}

function renderRestaurantList() {
  const listContainer = document.getElementById('restaurant-list');
  if (!listContainer) return;

  let content = '';
  ristoranti.forEach(r => {
    content += `
      <a href="#dettaglio-ristorante/${r.id}" class="card overflow-hidden block">
        <img src="${r.img}" alt="${r.nome}" class="w-full h-48 object-cover">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-slate-800">${r.nome}</h3>
            <span class="lega-badge ${getLegaClass(r.lega)}">Lega ${r.lega}</span>
          </div>
          <p class="text-slate-600 mt-1">${r.citta}</p>
          <p class="mt-4 text-sm text-slate-500">${r.descrizione}</p>
        </div>
      </a>
    `;
  });
  listContainer.innerHTML = content;
}

function renderDettaglioRistorante(id) {
  const container = document.getElementById('dettaglio-ristorante');
  const ristorante = ristoranti.find(r => r.id === id);

  if (!ristorante) {
    container.innerHTML = `<p class="text-center text-red-500">Ristorante non trovato.</p>`;
    return;
  }

  container.innerHTML = `
    <a href="#cerca-ristoranti" class="inline-flex items-center gap-2 text-teal-700 font-semibold mb-6 hover:underline">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Torna alla ricerca
    </a>
    <div class="card overflow-hidden">
      <img src="${ristorante.img}" alt="${ristorante.nome}" class="w-full h-64 md:h-96 object-cover">
      <div class="p-6 md:p-10">
        <div class="flex flex-col md:flex-row justify-between md:items-center">
          <h1 class="text-4xl font-extrabold text-slate-800">${ristorante.nome}</h1>
          <span class="lega-badge ${getLegaClass(ristorante.lega)} mt-4 md:mt-0">Lega ${ristorante.lega}</span>
        </div>
        <p class="text-lg text-slate-600 mt-2">${ristorante.citta} - Cucina ${ristorante.cucina}</p>

        <div class="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">La nostra filosofia</h2>
            <p class="text-slate-700 leading-relaxed">${ristorante.descrizione}</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Impegno per la Sostenibilità</h2>
            <p class="text-slate-700 leading-relaxed">${ristorante.sostenibilita}</p>
          </div>
        </div>

        <div class="mt-8 border-t pt-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-4">Il nostro Team</h2>
          <p class="text-slate-600">Un team di professionisti con percorsi di crescita chiari grazie al sistema iProfile.</p>
        </div>
      </div>
    </div>
  `;
  // Re-inizializza le icone
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function renderStaffList() {
  const listContainer = document.getElementById('staff-list-ristoratore');
  if (!listContainer) return;
  let content = '';
  staffTrattoriaDelPonte.forEach(membro => {
    content += `
      <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg">
        <div class="flex items-center space-x-4">
          <img src="${membro.img}" alt="${membro.nome}" class="h-12 w-12 rounded-full">
          <div>
            <p class="font-bold text-slate-800">${membro.nome}</p>
            <p class="text-sm text-slate-500">${membro.ruolo}</p>
          </div>
        </div>
        <a href="#dashboard-lavoratore" class="text-teal-700 font-semibold text-sm hover:underline">Vedi iProfile</a>
      </div>
    `;
  });
  listContainer.innerHTML = content;
}

function getRplStatusClass(status) {
  switch (status) {
    case 'Partner': return 'bg-emerald-100 text-emerald-800 border border-emerald-400';
    case 'In Valutazione': return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
    default: return 'bg-slate-100 text-slate-700 border border-slate-300';
  }
}

function renderCateneFood() {
  const listContainer = document.getElementById('catene-food-list');
  if (!listContainer) return;

  let content = '';
  cateneFood.forEach(catena => {
    content += `
      <a href="#dettaglio-catena/${catena.id}" class="card overflow-hidden block">
        <img src="${catena.img}" alt="${catena.nome}" class="w-full h-48 object-cover">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-slate-800">${catena.nome}</h3>
            <span class="lega-badge ${getRplStatusClass(catena.rplStatus)}">${catena.rplStatus}</span>
          </div>
          <p class="text-slate-500 text-sm mt-1">${catena.settore}</p>
          <p class="mt-3 text-sm text-slate-600">${catena.descrizione}</p>
          <div class="mt-4 flex gap-6 text-sm text-slate-700">
            <span class="flex items-center gap-1"><i data-lucide="store" class="w-4 h-4 text-teal-600"></i> ${catena.sedi} sedi</span>
            <span class="flex items-center gap-1"><i data-lucide="users" class="w-4 h-4 text-teal-600"></i> ${catena.dipendenti.toLocaleString('it-IT')} dipendenti</span>
          </div>
        </div>
      </a>
    `;
  });
  listContainer.innerHTML = content;
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function renderDettaglioCatena(id) {
  const container = document.getElementById('dettaglio-catena');
  const catena = cateneFood.find(c => c.id === id);

  if (!catena) {
    container.innerHTML = `<p class="text-center text-red-500">Catena non trovata.</p>`;
    return;
  }

  const ruoliHtml = catena.ruoliPrincipali.map(r => `<span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium text-sm">${r}</span>`).join('');
  const beneficiHtml = catena.benefici.map(b => `<li class="flex items-start gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0"></i><span>${b}</span></li>`).join('');

  const dipendentiCatena = dipendentiCateneFood.filter(d => d.catena === catena.nome);
  const dipendentiHtml = dipendentiCatena.length > 0 ? dipendentiCatena.map(d => `
    <div class="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg">
      <div class="flex items-center space-x-4">
        <img src="${d.img}" alt="${d.nome}" class="h-12 w-12 rounded-full">
        <div>
          <p class="font-bold text-slate-800">${d.nome}</p>
          <p class="text-sm text-slate-500">${d.ruolo} · ${d.anniEsperienza} anni di esperienza</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-xs text-slate-400">iProfile Score</p>
        <p class="font-bold text-teal-700">${d.iProfileScore}/100</p>
      </div>
    </div>
  `).join('') : `<p class="text-slate-500 text-sm">Nessun dipendente RPL registrato per questa catena.</p>`;

  container.innerHTML = `
    <a href="#catene-food" class="inline-flex items-center gap-2 text-teal-700 font-semibold mb-6 hover:underline">
      <i data-lucide="arrow-left" class="w-4 h-4"></i> Torna alle Catene
    </a>
    <div class="card overflow-hidden">
      <img src="${catena.img}" alt="${catena.nome}" class="w-full h-64 md:h-80 object-cover">
      <div class="p-6 md:p-10">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 class="text-4xl font-extrabold text-slate-800">${catena.nome}</h1>
          <span class="lega-badge ${getRplStatusClass(catena.rplStatus)}">${catena.rplStatus}</span>
        </div>
        <p class="text-lg text-slate-500 mt-1">${catena.settore}</p>
        <p class="mt-4 text-slate-700 leading-relaxed">${catena.descrizione}</p>

        <div class="mt-8 grid md:grid-cols-3 gap-6">
          <div class="card p-6 text-center">
            <p class="text-3xl font-extrabold text-teal-700">${catena.sedi}</p>
            <p class="text-slate-500 mt-1 text-sm">Sedi in Italia</p>
          </div>
          <div class="card p-6 text-center">
            <p class="text-3xl font-extrabold text-teal-700">${catena.dipendenti.toLocaleString('it-IT')}</p>
            <p class="text-slate-500 mt-1 text-sm">Dipendenti Totali</p>
          </div>
          <div class="card p-6 text-center">
            <p class="text-3xl font-extrabold text-teal-700">${catena.dipendentiRPL}</p>
            <p class="text-slate-500 mt-1 text-sm">Dipendenti con iProfile RPL</p>
          </div>
        </div>

        <div class="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-3">Ruoli Principali</h2>
            <div class="flex flex-wrap gap-2">${ruoliHtml}</div>

            <h2 class="text-2xl font-bold text-slate-800 mt-6 mb-3">Sfide per i Dipendenti</h2>
            <p class="text-slate-700 leading-relaxed">${catena.sfide}</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-3">Benefici & Welfare</h2>
            <ul class="space-y-2 text-slate-700">${beneficiHtml}</ul>

            <div class="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p class="text-sm font-semibold text-teal-800">Stipendio Medio</p>
              <p class="text-2xl font-extrabold text-teal-700 mt-1">${catena.stipendioMedio}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t pt-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-4">Dipendenti con iProfile RPL</h2>
          <div class="space-y-2">${dipendentiHtml}</div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

