# RPL Backend - Guida allo Sviluppo

Guida completa per sviluppatori che contribuiscono al progetto Ristorazione Pro League.

## Indice
1. [Setup Ambiente](#setup-ambiente)
2. [Struttura del Progetto](#struttura-del-progetto)
3. [Workflow di Sviluppo](#workflow-di-sviluppo)
4. [Best Practices](#best-practices)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## Setup Ambiente

### Prerequisiti
- **Node.js**: v18.x o superiore
- **PostgreSQL**: v13+ (produzione) o SQLite (sviluppo)
- **Git**: Per il version control
- **Editor**: VS Code raccomandato con estensioni:
  - ESLint
  - Prettier
  - Prisma

### Installazione

1. **Clona il repository**:
   ```bash
   git clone https://github.com/HUSTLEROPERATOR/Ristorazione-Pro-League.git
   cd Ristorazione-Pro-League/backend
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**:
   ```bash
   cp .env.example .env
   ```
   
   Modifica `.env` con i tuoi valori:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your-secret-key-here
   ```

4. **Configura il database**:
   ```bash
   # Genera il client Prisma
   npm run db:generate
   
   # Applica lo schema al database
   npm run db:push
   
   # Popola con dati di test
   npm run db:seed
   ```

5. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```
   
   Il server sarà disponibile su `http://localhost:3000`

### Test delle API

Usa il file `test-auth.html` o tool come Postman/Insomnia per testare gli endpoint.

Credenziali di test (dopo il seed):
- **Admin**: `admin@rpl.local` / `AdminPass123!`
- **Owner**: `owner@rpl.local` / `OwnerPass123!`
- **Worker**: `worker@rpl.local` / `WorkerPass123!`

---

## Struttura del Progetto

```
backend/
├── prisma/
│   ├── schema.prisma          # Schema del database
│   └── dev.db                 # SQLite database (development)
├── src/
│   ├── config/                # Configurazioni
│   │   ├── config.ts          # Configurazione generale
│   │   └── database.ts        # Connessione Prisma
│   ├── controllers/           # Logica di business
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── restaurantController.ts
│   ├── middleware/            # Middleware Express
│   │   ├── auth.ts            # Autenticazione JWT
│   │   ├── errorHandler.ts   # Gestione errori
│   │   └── notFound.ts        # Route 404
│   ├── routes/                # Definizione routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── restaurants.ts
│   │   └── workers.ts
│   ├── scripts/               # Script utility
│   │   ├── seed.ts            # Popolamento database
│   │   └── test-api.ts        # Test API automatizzati
│   ├── types/                 # TypeScript types
│   │   └── auth.ts
│   ├── utils/                 # Utilities
│   │   ├── auth.ts            # Funzioni auth
│   │   ├── validation.ts      # Schemi Zod
│   │   └── validators.ts
│   └── index.ts               # Entry point
├── tests/                     # Test suite
├── .env.example               # Template variabili ambiente
├── package.json
├── tsconfig.json
└── README.md
```

---

## Workflow di Sviluppo

### 1. Crea un nuovo branch
```bash
git checkout -b feature/nome-feature
```

### 2. Sviluppa la feature
- Scrivi codice pulito e ben documentato
- Segui le convenzioni del progetto
- Aggiungi test per nuove funzionalità

### 3. Testa localmente
```bash
# Lint del codice
npm run lint

# Type checking
npm run build

# Esegui i test
npm test
```

### 4. Commit le modifiche
```bash
git add .
git commit -m "feat: descrizione chiara della feature"
```

Usa i conventional commits:
- `feat:` - Nuova feature
- `fix:` - Bug fix
- `docs:` - Documentazione
- `style:` - Formattazione
- `refactor:` - Refactoring
- `test:` - Aggiunta test
- `chore:` - Manutenzione

### 5. Push e apri una Pull Request
```bash
git push origin feature/nome-feature
```

---

## Best Practices

### Codice TypeScript

1. **Usa tipi espliciti**:
   ```typescript
   // ✅ Buono
   function getUser(id: string): Promise<User | null> {
     return prisma.user.findUnique({ where: { id } });
   }
   
   // ❌ Evita
   async function getUser(id) {
     return prisma.user.findUnique({ where: { id } });
   }
   ```

2. **Gestisci sempre gli errori**:
   ```typescript
   try {
     const user = await prisma.user.create({ data });
     res.status(201).json({ success: true, data: { user } });
   } catch (error) {
     console.error('Create user error:', error);
     res.status(500).json({
       success: false,
       error: { message: 'Errore creazione utente', code: 'CREATE_ERROR' }
     });
   }
   ```

3. **Usa middleware per la validazione**:
   ```typescript
   router.post('/users', authenticateToken, validateUserInput, UserController.create);
   ```

### Database con Prisma

1. **Usa transazioni per operazioni multiple**:
   ```typescript
   await prisma.$transaction([
     prisma.user.create({ data: userData }),
     prisma.workerProfile.create({ data: profileData })
   ]);
   ```

2. **Seleziona solo i campi necessari**:
   ```typescript
   const user = await prisma.user.findUnique({
     where: { id },
     select: { id: true, email: true, firstName: true } // Non password
   });
   ```

3. **Usa pagination per liste**:
   ```typescript
   const users = await prisma.user.findMany({
     skip: (page - 1) * limit,
     take: limit,
   });
   ```

### Sicurezza

1. **Non loggare informazioni sensibili**:
   ```typescript
   // ❌ Evita
   console.log('User data:', user);
   
   // ✅ Buono
   console.log('User created:', user.id);
   ```

2. **Valida sempre l'input**:
   ```typescript
   const schema = z.object({
     email: z.string().email(),
     password: z.string().min(8)
   });
   const validated = schema.parse(req.body);
   ```

3. **Usa HTTPS in produzione**
4. **Configura CORS correttamente**
5. **Implementa rate limiting**

### API Design

1. **Risposte consistenti**:
   ```typescript
   // Success
   { success: true, data: { ... } }
   
   // Error
   { success: false, error: { message: '...', code: '...' } }
   ```

2. **Status codes appropriati**:
   - `200` - Success
   - `201` - Created
   - `400` - Bad Request
   - `401` - Unauthorized
   - `403` - Forbidden
   - `404` - Not Found
   - `500` - Internal Server Error

3. **Versioning**:
   - Usa `/api/v1/` per future versioni
   - Mantieni backward compatibility

---

## Testing

### Test Unitari

Crea test in `tests/`:
```typescript
// tests/auth.test.ts
import { AuthUtils } from '../src/utils/auth';

describe('AuthUtils', () => {
  it('should hash password correctly', async () => {
    const password = 'Test123!';
    const hash = await AuthUtils.hashPassword(password);
    expect(hash).not.toBe(password);
    
    const isValid = await AuthUtils.comparePassword(password, hash);
    expect(isValid).toBe(true);
  });
});
```

### Test di Integrazione

```typescript
// tests/integration/auth.test.ts
import request from 'supertest';
import app from '../src/index';

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Test123!',
        firstName: 'Test',
        lastName: 'User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

### Esegui i test
```bash
# Tutti i test
npm test

# Test specifico
npm test -- auth.test.ts

# Con coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

---

## Deployment

### Preparazione

1. **Build di produzione**:
   ```bash
   npm run build
   ```

2. **Test dell'ambiente di produzione**:
   ```bash
   NODE_ENV=production npm start
   ```

### Variabili d'Ambiente (Produzione)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:pass@host:5432/rpl_db"
JWT_SECRET=<strong-secret-here>
ALLOWED_ORIGINS=https://yourdomain.com
```

### PostgreSQL Setup

1. **Migrazione da SQLite a PostgreSQL**:
   ```bash
   # Aggiorna DATABASE_URL in .env
   DATABASE_URL="postgresql://..."
   
   # Crea le migrazioni
   npm run db:migrate
   
   # Applica le migrazioni
   npx prisma migrate deploy
   ```

### Docker (Opzionale)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Monitoring

- Usa PM2 per il process management
- Configura logging strutturato
- Imposta alert per errori critici
- Monitora metriche (CPU, memoria, latenza)

---

## Troubleshooting

### Errore: "Prisma Client not generated"
```bash
npm run db:generate
```

### Errore: "Port already in use"
```bash
# Cambia PORT in .env o killa il processo
lsof -ti:3000 | xargs kill
```

### Errore: "Cannot find module"
```bash
# Reinstalla dipendenze
rm -rf node_modules package-lock.json
npm install
```

### Database locked (SQLite)
```bash
# Riavvia il server
npm run dev
```

---

## Risorse Utili

- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Zod Documentation](https://zod.dev/)

---

## Supporto

Per domande o problemi:
1. Controlla la documentazione esistente
2. Cerca nelle issue esistenti su GitHub
3. Apri una nuova issue con dettagli completi
4. Contatta il team su Discord/Slack (TBD)

---

**Buon coding! 🚀**
