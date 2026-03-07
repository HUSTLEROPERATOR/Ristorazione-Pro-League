import { Router, Request, Response } from 'express';
import { users } from './inMemoryUsers';

const router = Router();

const credentials: Record<string, { password: string; role: string }> = {
  'ristoratore@rpl.example': { password: 'rpl2025',   role: 'restaurant' },
  'mario.rossi@rpl.example': { password: 'rpl2025',   role: 'worker' },
  'gourmet@rpl.example':     { password: 'rpl2025',   role: 'restaurant' },
  'admin@rpl.example':       { password: 'admin2025', role: 'admin' },
};

function generateMockToken(userId: number, role: string): string {
  const payload = Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 86400000 })).toString('base64');
  return `mock.${payload}.signature`;
}

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email e password sono obbligatori.' });
  }

  const key = email.toLowerCase();
  const cred = credentials[key];
  if (!cred || cred.password !== password) {
    return res.status(401).json({ success: false, message: 'Credenziali non valide.' });
  }

  const user = users.find(u => u.email === key);
  const token = generateMockToken(user?.id ?? 0, cred.role);

  return res.json({
    success: true,
    message: 'Login effettuato con successo.',
    data: { token, refreshToken: `refresh.${token}`, user: user ?? { email, role: cred.role } },
  });
});

// POST /api/auth/register
router.post('/register', (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } =
    req.body as { email?: string; password?: string; firstName?: string; lastName?: string; role?: string };

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email e password sono obbligatori.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'La password deve essere di almeno 6 caratteri.' });
  }

  const key = email.toLowerCase();
  if (credentials[key]) {
    return res.status(409).json({ success: false, message: 'Email già registrata.' });
  }

  credentials[key] = { password, role: role ?? 'worker' };

  const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: nextId,
    email: key,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    role: (role ?? 'worker') as 'restaurant' | 'worker' | 'admin',
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);

  const token = generateMockToken(newUser.id, newUser.role);
  return res.status(201).json({
    success: true,
    message: 'Registrazione completata con successo.',
    data: { token, refreshToken: `refresh.${token}`, user: newUser },
  });
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logout effettuato.' });
});

// GET /api/auth/profile
router.get('/profile', (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer mock.')) {
    return res.status(401).json({ success: false, message: 'Token non valido o assente.' });
  }
  const parts = auth.split('.');
  const b64 = parts[1];
  if (!b64) {
    return res.status(401).json({ success: false, message: 'Token malformato.' });
  }
  try {
    const payload = JSON.parse(Buffer.from(b64, 'base64').toString()) as { userId: number; role: string };
    const user = users.find(u => u.id === payload.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Utente non trovato.' });
    return res.json({ success: true, data: { user } });
  } catch {
    return res.status(401).json({ success: false, message: 'Token malformato.' });
  }
});

export default router;
