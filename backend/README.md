# RPL Backend

Questo è il backend per il progetto Ristorazione Pro League (RPL), un'API RESTful costruita con Node.js, TypeScript, Express e Prisma.

## 🚀 Getting Started

### Prerequisiti

- Node.js (v18+)
- PostgreSQL (v13+)
- npm o yarn

### Installazione

1. **Clona il repository e vai nella cartella backend:**
   ```bash
   cd backend
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente:**
   ```bash
   cp .env.example .env
   ```
   
   Modifica il file `.env` con i tuoi dati:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/rpl_db?schema=public"
   JWT_SECRET=your_super_secret_jwt_key_here
   # ... altre variabili
   ```

4. **Configura il database:**
   ```bash
   # Genera il client Prisma
   npm run db:generate
   
   # Applica le migrazioni
   npm run db:push
   
   # (Opzionale) Apri Prisma Studio per visualizzare i dati
   npm run db:studio
   ```

5. **Avvia il server in modalità sviluppo:**
   ```bash
   npm run dev
   ```

Il server sarà disponibile su `http://localhost:3000`

### Build per produzione

```bash
# Build del progetto
npm run build

# Avvia il server di produzione
npm run start
```

## 📁 Struttura del progetto

```
src/
├── config/          # Configurazioni
├── controllers/     # Logica dei controller
├── middleware/      # Middleware personalizzati
├── routes/          # Definizione delle route API
├── services/        # Logica di business
├── types/          # Definizioni TypeScript
├── utils/          # Utilities
└── index.ts        # Entry point

prisma/
├── schema.prisma   # Schema del database
└── migrations/     # Migrazioni del database
```

## 🛠 API Endpoints

### Autenticazione
- `POST /api/auth/register` - Registrazione utente
- `POST /api/auth/login` - Login utente
- `POST /api/auth/logout` - Logout utente
- `POST /api/auth/refresh` - Refresh del token

### Utenti
- `GET /api/users/profile` - Profilo utente
- `PUT /api/users/profile` - Aggiorna profilo

### Ristoranti
- `GET /api/restaurants` - Lista ristoranti
- `POST /api/restaurants` - Crea ristorante
- `GET /api/restaurants/:id` - Dettagli ristorante

### Lavoratori
- `GET /api/workers/profile` - Profilo lavoratore
- `PUT /api/workers/profile` - Aggiorna profilo lavoratore
- `GET /api/workers/jobs` - Lista lavori disponibili

### Health Check
- `GET /health` - Status dell'API

## 🗄 Schema Database

Il progetto utilizza Prisma ORM con PostgreSQL. I modelli principali sono:

- **User**: Utenti del sistema (ristoratori e lavoratori)
- **Restaurant**: Ristoranti registrati
- **WorkerProfile**: Profili dei lavoratori
- **JobOffer**: Offerte di lavoro
- **JobApplication**: Candidature ai lavori

## 🔒 Sicurezza

- Rate limiting configurato
- Helmet per header di sicurezza
- CORS configurabile
- Hash delle password con bcrypt
- JWT per autenticazione
- Validation con Zod

## 📊 Scripts Disponibili

- `npm run dev` - Avvia il server in modalità sviluppo con hot-reload
- `npm run build` - Build del progetto TypeScript
- `npm run start` - Avvia il server di produzione
- `npm run lint` - Esegue ESLint
- `npm run format` - Formatta il codice con Prettier
- `npm run db:generate` - Genera il client Prisma
- `npm run db:push` - Applica le modifiche dello schema al database
- `npm run db:migrate` - Crea e applica nuove migrazioni
- `npm run db:studio` - Apre Prisma Studio
- `npm run test` - Esegue i test
- `npm run test:watch` - Esegue i test in modalità watch

## 🔧 Configurazione

Le configurazioni sono gestite tramite variabili d'ambiente. Vedi il file `.env.example` per tutte le opzioni disponibili.

## 📝 Note di Sviluppo

- Il progetto utilizza TypeScript in modalità strict
- Tutti gli endpoint attualmente restituiscono status 501 (Not Implemented) in attesa dello sviluppo
- I middleware di error handling e not found sono configurati
- La configurazione Prisma è pronta per PostgreSQL

## 🚧 TODO

- [ ] Implementare autenticazione JWT
- [ ] Completare i controller per tutti gli endpoint
- [ ] Aggiungere validazione con Zod
- [ ] Implementare test unitari e di integrazione
- [ ] Configurare CI/CD
- [ ] Aggiungere logging strutturato
- [ ] Implementare cache con Redis
- [ ] Aggiungere documentazione Swagger/OpenAPI