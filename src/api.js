// --- DATA MOCK ---
const ristoranti = [
  { id: 1, nome: "Trattoria del Ponte", citta: "Roma", lega: "B", punteggio: 88, cucina: "Tradizionale", img: "https://placehold.co/600x400/0f766e/FFFFFF?text=Trattoria", staff: [ { nome: 'Mario Rossi', ruolo: 'Chef de Partie' }, { nome: 'Anna Verdi', ruolo: 'Cameriera di Sala' } ], descrizione: 'Un angolo di tradizione romana con un impegno etico certificato RPL.', sostenibilita: 'Riduzione sprechi del 20%, filiera a km 0 per le verdure.' },
  { id: 2, nome: "Gourmet Futuro", citta: "Milano", lega: "A", punteggio: 95, cucina: "Innovativa", img: "https://placehold.co/600x400/854d0e/FFFFFF?text=Gourmet", staff: [], descrizione: 'Cucina d\'avanguardia che rispetta il pianeta e i suoi lavoratori.', sostenibilita: 'Certificazione B-Corp, menu 100% stagionale.' },
  { id: 3, nome: "Bistrot La Piazza", citta: "Firenze", lega: "C", punteggio: 75, cucina: "Toscana", img: "https://placehold.co/600x400/991b1b/FFFFFF?text=Bistrot", staff: [], descrizione: 'Un locale emergente nel cuore di Firenze, in percorso di crescita RPL.', sostenibilita: 'Adozione doggy bag, conversione a fornitori locali.' },
  { id: 4, nome: "Osteria del Borgo", citta: "Bologna", lega: "B", punteggio: 85, cucina: "Emiliana", img: "https://placehold.co/600x400/075985/FFFFFF?text=Osteria", staff: [], descrizione: 'Sapori autentici in un ambiente che valorizza il personale.', sostenibilita: 'Programma di formazione continua, partnership con produttori locali.' },
  { id: 5, nome: "Sea & Stars", citta: "Napoli", lega: "A", punteggio: 92, cucina: "Pesce", img: "https://placehold.co/600x400/065f46/FFFFFF?text=Sea+%26+Stars", staff: [], descrizione: 'L\'eccellenza del mare con un forte impegno sociale.', sostenibilita: 'Uso esclusivo di pesce sostenibile, progetti di inclusione lavorativa.' },
  { id: 6, nome: "Nuova Radice", citta: "Torino", lega: "D", punteggio: 68, cucina: "Vegana", img: "https://placehold.co/600x400/374151/FFFFFF?text=Nuova+Radice", staff: [], descrizione: 'Start-up vegana appena entrata nel circuito formativo RPL.', sostenibilita: 'Focus su riduzione impronta idrica e packaging compostabile.' }
];

const staffTrattoriaDelPonte = [
  { id: 101, nome: "Mario Rossi", ruolo: "Chef de Partie", img: "https://placehold.co/64x64/0d9488/FFFFFF?text=MR" },
  { id: 102, nome: "Anna Verdi", ruolo: "Cameriera di Sala", img: "https://placehold.co/64x64/0d9488/FFFFFF?text=AV" },
  { id: 103, nome: "Luca Neri", ruolo: "Sommelier", img: "https://placehold.co/64x64/0d9488/FFFFFF?text=LN" },
  { id: 104, nome: "Giulia Gialli", ruolo: "Apprendista Cuoca", img: "https://placehold.co/64x64/0d9488/FFFFFF?text=GG" },
];

// --- CATENE DEL FOOD ---
const cateneFood = [
  {
    id: 1,
    nome: "BurgerNation",
    settore: "Burger & Fast Food",
    sedi: 320,
    dipendenti: 8500,
    img: "https://placehold.co/600x400/b45309/FFFFFF?text=BurgerNation",
    descrizione: "Una delle principali catene di burger in Italia, presente in tutti i capoluoghi di regione.",
    rplStatus: "Partner",
    stipendioMedio: "€1.150/mese",
    ruoliPrincipali: ["Crew Member", "Shift Manager", "Store Manager", "Responsabile Cucina"],
    benefici: ["Formazione continua", "Buoni pasto", "Sconti dipendenti", "Piano di crescita interno"],
    sfide: "Alto turnover tra i crew member giovani; orari spesso part-time involontario.",
    dipendentiRPL: 430,
  },
  {
    id: 2,
    nome: "PizzaExpress Italia",
    settore: "Pizza & Casual Dining",
    sedi: 185,
    dipendenti: 5200,
    img: "https://placehold.co/600x400/991b1b/FFFFFF?text=PizzaExpress",
    descrizione: "Catena di ristoranti di pizza con format casual dining diffusa nel centro-nord Italia.",
    rplStatus: "In Valutazione",
    stipendioMedio: "€1.280/mese",
    ruoliPrincipali: ["Pizzaiolo", "Cuoco di Linea", "Cameriere", "Responsabile di Sala"],
    benefici: ["Accordo integrativo aziendale", "Corsi HACCP gratuiti", "Ticket restaurant"],
    sfide: "Necessità di standardizzare la formazione tra le diverse sedi franchise.",
    dipendentiRPL: 210,
  },
  {
    id: 3,
    nome: "FreshBowl",
    settore: "Healthy Food & Bowls",
    sedi: 95,
    dipendenti: 1800,
    img: "https://placehold.co/600x400/065f46/FFFFFF?text=FreshBowl",
    descrizione: "Catena emergente specializzata in bowl salutistiche e cucina plant-based.",
    rplStatus: "Partner",
    stipendioMedio: "€1.350/mese",
    ruoliPrincipali: ["Bowl Chef", "Nutritional Coach", "Store Manager", "Addetto Cassa"],
    benefici: ["Smart working per ruoli amministrativi", "Pasto gratuito per turno", "Certificazioni nutrizionali pagate"],
    sfide: "Espansione rapida che richiede un solido sistema di onboarding del personale.",
    dipendentiRPL: 320,
  },
  {
    id: 4,
    nome: "AutorouteFood",
    settore: "Ristorazione Autostradale",
    sedi: 210,
    dipendenti: 9200,
    img: "https://placehold.co/600x400/075985/FFFFFF?text=AutorouteFood",
    descrizione: "Leader nella ristorazione in aree di servizio autostradali, con offerta multi-brand.",
    rplStatus: "In Valutazione",
    stipendioMedio: "€1.100/mese",
    ruoliPrincipali: ["Operatore di Servizio", "Addetto Bar", "Responsabile di Punto Vendita", "Cook"],
    benefici: ["Turni su rotazione documentati", "Alloggio per sedi remote", "Premi di presenza"],
    sfide: "Orari notturni e festivi elevati; distanza dalle sedi centrali di formazione.",
    dipendentiRPL: 180,
  },
  {
    id: 5,
    nome: "Sushi&Go",
    settore: "Sushi & Asian Fusion",
    sedi: 140,
    dipendenti: 3100,
    img: "https://placehold.co/600x400/374151/FFFFFF?text=Sushi%26Go",
    descrizione: "Catena di ristoranti di sushi fusion in rapida crescita nelle principali città italiane.",
    rplStatus: "Partner",
    stipendioMedio: "€1.220/mese",
    ruoliPrincipali: ["Sushi Chef", "Roll Artisan", "Food Runner", "Responsabile Sala"],
    benefici: ["Programma di scambio culturale", "Formazione specialistica in Giappone", "Bonus qualità"],
    sfide: "Difficoltà nel reperire sushi chef qualificati; gap tra domanda e offerta formativa.",
    dipendentiRPL: 260,
  },
];

const dipendentiCateneFood = [
  { id: 201, nome: "Chiara Fontana", ruolo: "Shift Manager", catena: "BurgerNation", img: "https://placehold.co/64x64/b45309/FFFFFF?text=CF", anniEsperienza: 4, iProfileScore: 82 },
  { id: 202, nome: "Roberto Mancini", ruolo: "Pizzaiolo Senior", catena: "PizzaExpress Italia", img: "https://placehold.co/64x64/991b1b/FFFFFF?text=RM", anniEsperienza: 7, iProfileScore: 91 },
  { id: 203, nome: "Sara Galli", ruolo: "Bowl Chef", catena: "FreshBowl", img: "https://placehold.co/64x64/065f46/FFFFFF?text=SG", anniEsperienza: 2, iProfileScore: 74 },
  { id: 204, nome: "Davide Serra", ruolo: "Store Manager", catena: "AutorouteFood", img: "https://placehold.co/64x64/075985/FFFFFF?text=DS", anniEsperienza: 9, iProfileScore: 88 },
  { id: 205, nome: "Elisa Bruno", ruolo: "Sushi Chef", catena: "Sushi&Go", img: "https://placehold.co/64x64/374151/FFFFFF?text=EB", anniEsperienza: 5, iProfileScore: 86 },
];

