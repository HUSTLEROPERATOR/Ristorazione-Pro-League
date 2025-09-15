# Ristorazione Pro League (RPL)

## Project Overview
Ristorazione Pro League (RPL) is a backend application designed to manage restaurant data and user authentication. It provides a robust API for CRUD operations, user management, and more.

## Features
- User authentication with JWT.
- CRUD operations for users and restaurants.
- Zod validation for request payloads.
- SQLite database with Prisma ORM.
- Seed script for populating the database with sample data.
- API smoke-test script for endpoint validation.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- SQLite (for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HUSTLEROPERATOR/Ristorazione-Pro-League.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd Ristorazione-Pro-League/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the `backend` directory and configure the following variables:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
```

### Database Setup
1. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
2. Push the Prisma schema to the database:
   ```bash
   npx prisma db push
   ```
3. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

### Running the Server
Start the development server:
```bash
npx tsx src/simple-server.ts
```
The server will run at `http://localhost:4000`.

### Testing the API
Run the API smoke-test script:
```bash
npx tsx src/scripts/test-api.ts
```

## Usage Examples

### Authentication
- **Login**: Send a POST request to `/auth/login` with `email` and `password`.
- **Register**: Send a POST request to `/auth/register` with user details.

### CRUD Operations
- **Users**: Use `/users` endpoints for creating, reading, updating, and deleting users.
- **Restaurants**: Use `/restaurants` endpoints for managing restaurant data.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Submit a pull request.

## License
This project is licensed under the MIT License.

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