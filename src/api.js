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

