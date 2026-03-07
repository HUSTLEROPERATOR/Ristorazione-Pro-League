import { Router, Request, Response } from 'express';

const router = Router();

interface Restaurant {
  id: number;
  nome: string;
  citta: string;
  lega: string;
  punteggio: number;
  cucina: string;
  descrizione: string;
  sostenibilita: string;
}

const ristoranti: Restaurant[] = [
  { id: 1, nome: 'Trattoria del Ponte', citta: 'Roma',    lega: 'B', punteggio: 88, cucina: 'Tradizionale', descrizione: 'Un angolo di tradizione romana con un impegno etico certificato RPL.',       sostenibilita: 'Riduzione sprechi del 20%, filiera a km 0 per le verdure.' },
  { id: 2, nome: 'Gourmet Futuro',      citta: 'Milano',  lega: 'A', punteggio: 95, cucina: 'Innovativa',   descrizione: "Cucina d'avanguardia che rispetta il pianeta e i suoi lavoratori.",          sostenibilita: 'Certificazione B-Corp, menu 100% stagionale.' },
  { id: 3, nome: 'Bistrot La Piazza',   citta: 'Firenze', lega: 'C', punteggio: 75, cucina: 'Toscana',      descrizione: 'Un locale emergente nel cuore di Firenze, in percorso di crescita RPL.',     sostenibilita: 'Adozione doggy bag, conversione a fornitori locali.' },
  { id: 4, nome: 'Osteria del Borgo',   citta: 'Bologna', lega: 'B', punteggio: 85, cucina: 'Emiliana',     descrizione: 'Sapori autentici in un ambiente che valorizza il personale.',                sostenibilita: 'Programma di formazione continua, partnership con produttori locali.' },
  { id: 5, nome: 'Sea & Stars',         citta: 'Napoli',  lega: 'A', punteggio: 92, cucina: 'Pesce',        descrizione: "L'eccellenza del mare con un forte impegno sociale.",                       sostenibilita: 'Uso esclusivo di pesce sostenibile, progetti di inclusione lavorativa.' },
  { id: 6, nome: 'Nuova Radice',        citta: 'Torino',  lega: 'D', punteggio: 68, cucina: 'Vegana',       descrizione: 'Start-up vegana appena entrata nel circuito formativo RPL.',                sostenibilita: 'Focus su riduzione impronta idrica e packaging compostabile.' },
];

let nextId = 7;

// GET /api/restaurants
router.get('/', (_req: Request, res: Response) => {
  res.json(ristoranti);
});

// GET /api/restaurants/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const r = ristoranti.find(x => x.id === id);
  if (!r) return res.status(404).json({ error: 'not found' });
  return res.json(r);
});

// POST /api/restaurants
router.post('/', (req: Request, res: Response) => {
  const body = req.body as Partial<Restaurant>;
  if (!body.nome || !body.citta) {
    return res.status(400).json({ error: 'nome e citta sono obbligatori' });
  }
  const newR: Restaurant = {
    id: nextId++,
    nome: body.nome,
    citta: body.citta,
    lega: body.lega ?? 'D',
    punteggio: 60,
    cucina: body.cucina ?? 'Varia',
    descrizione: body.descrizione ?? '',
    sostenibilita: body.sostenibilita ?? '',
  };
  ristoranti.push(newR);
  return res.status(201).json(newR);
});

// PUT /api/restaurants/:id
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const idx = ristoranti.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  ristoranti[idx] = { ...ristoranti[idx], ...(req.body as Partial<Restaurant>), id } as Restaurant;
  return res.json(ristoranti[idx]);
});

// DELETE /api/restaurants/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const idx = ristoranti.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const [removed] = ristoranti.splice(idx, 1);
  return res.json(removed);
});

export default router;
