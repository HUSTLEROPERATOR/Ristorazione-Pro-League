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

