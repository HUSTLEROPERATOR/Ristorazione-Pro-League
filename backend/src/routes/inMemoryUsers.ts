import { Router, Request, Response } from 'express';

const router = Router();

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'restaurant' | 'worker' | 'admin';
  isActive: boolean;
  createdAt: string;
}

const users: User[] = [
  { id: 1, email: 'ristoratore@rpl.example', firstName: 'Trattoria', lastName: 'del Ponte', role: 'restaurant', isActive: true, createdAt: '2024-01-15T10:00:00Z' },
  { id: 2, email: 'mario.rossi@rpl.example', firstName: 'Mario',     lastName: 'Rossi',     role: 'worker',     isActive: true, createdAt: '2024-02-20T09:30:00Z' },
  { id: 3, email: 'gourmet@rpl.example',     firstName: 'Gourmet',   lastName: 'Futuro',    role: 'restaurant', isActive: true, createdAt: '2024-03-01T14:00:00Z' },
];

let nextId = 4;

// GET /api/users
router.get('/', (_req: Request, res: Response) => {
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const u = users.find(x => x.id === id);
  if (!u) return res.status(404).json({ error: 'not found' });
  return res.json(u);
});

// POST /api/users
router.post('/', (req: Request, res: Response) => {
  const body = req.body as Partial<User>;
  if (!body.email) return res.status(400).json({ error: 'email obbligatoria' });
  if (users.find(u => u.email === body.email)) {
    return res.status(409).json({ error: 'email già registrata' });
  }
  const newUser: User = {
    id: nextId++,
    email: body.email,
    firstName: body.firstName ?? '',
    lastName: body.lastName ?? '',
    role: body.role ?? 'worker',
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// PUT /api/users/:id
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const idx = users.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  users[idx] = { ...users[idx], ...(req.body as Partial<User>), id } as User;
  return res.json(users[idx]);
});

// DELETE /api/users/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params['id'] ?? '', 10);
  const idx = users.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const [removed] = users.splice(idx, 1);
  return res.json(removed);
});

export { users };
export default router;
