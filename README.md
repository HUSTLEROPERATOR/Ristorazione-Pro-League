# Ristorazione Pro League (RPL)

Ecosistema meritocratico per la ristorazione: profili verificati, auditing, reputazione, premi, crescita professionale e sostenibilità.

## 🎯 Perché
Il settore soffre frammentazione, turnover, poca trasparenza e digitale incompleto. RPL propone una "lega" con regole, incentivi e strumenti moderni.

## ✨ Novità - Febbraio 2025

**Backend API v2.0.0 ora disponibile!** 🚀
- ✅ Autenticazione JWT completa
- ✅ CRUD Users & Restaurants funzionante
- ✅ Documentazione API completa
- ✅ CI/CD con GitHub Actions
- ✅ Seed script con dati di test

👉 **[Leggi gli aggiornamenti completi](AGGIORNAMENTI_2025.md)**

## 🏗️ Moduli Core (fase iniziale)
- ✅ **Profili & Identità Professionale** - Backend implementato
- ✅ **Sistema di Autenticazione** - JWT con refresh tokens
- 🚧 **Sistema di Auditing e Reputazione** - In sviluppo
- 🚧 **Fair Play Finanziario** - Pianificato
- 📋 **Premi & Riconoscimenti** - Pianificato
- 📋 **Formazione & Crescita** - Pianificato
- 🎯 **Progetto Pilota (Sardegna)** - Q2 2025
- 📋 **Piano B (RPL Lite)** - Definito
- 🔮 **Sviluppi Futuri** (API pubblica, marketplace, analytics avanzati)

## 📊 Stato Attuale

### Backend
- **Status**: ✅ Production-ready (core features)
- **Versione**: 2.0.0
- **Tecnologie**: Node.js, TypeScript, Express, Prisma, SQLite/PostgreSQL
- **Endpoint**: 15+ REST APIs documentate
- **[Documentazione API](backend/API_DOCS_v2.md)**
- **[Guida Sviluppo](backend/DEVELOPMENT_GUIDE.md)**

### Frontend
- **Status**: 🟡 Prototipo in JavaScript vanilla
- **Pianificato**: Migrazione a React + TypeScript (Q1 2025)

### Database
- **Modelli**: User, Restaurant, WorkerProfile, JobOffer, JobApplication
- **ORM**: Prisma con schema completo
- **Dev**: SQLite | **Prod**: PostgreSQL (ready)

## 🚀 Quick Start

### Per Sviluppatori

```bash
# Clone repository
git clone https://github.com/HUSTLEROPERATOR/Ristorazione-Pro-League.git
cd Ristorazione-Pro-League/backend

# Setup
npm install
npm run db:generate
npm run db:push
npm run db:seed

# Sviluppo
npm run build
JWT_SECRET=dev-secret npm start

# Test API
curl http://localhost:3000/health
```

**Credenziali di test:**
- Admin: `admin@rpl.local` / `AdminPass123!`
- Owner: `owner@rpl.local` / `OwnerPass123!`
- Worker: `worker@rpl.local` / `WorkerPass123!`

## 📚 Documentazione

### Guide Principali
- **[Aggiornamenti 2025](AGGIORNAMENTI_2025.md)** - Sommario completo aggiornamenti
- **[API Documentation v2](backend/API_DOCS_v2.md)** - Endpoint REST completi
- **[Development Guide](backend/DEVELOPMENT_GUIDE.md)** - Best practices e workflow
- **[Changelog](backend/CHANGELOG.md)** - Storia versioni
- **[Strategic Update 2025](docs/00_RPL_Strategic_Update_2025.md)** - Roadmap strategica

### Documenti Tecnici
- [Architettura Tecnica](docs/03_Architettura_Tecnica.md)
- [Piano di Fattibilità](docs/02_Piano_di_Fattibilita.md)
- [Regolamento Generale](docs/Regolamento_Generale/)

## 🗺️ Roadmap

### ✅ Completato (v2.0.0 - Feb 2025)
- Backend API con autenticazione JWT
- CRUD completo Users & Restaurants
- Database schema e seed script
- Documentazione completa
- CI/CD GitHub Actions

### 🚧 In Corso (Q1 2025)
- Worker & Job Management endpoints
- Test automatizzati (Jest)
- Audit logging centralizzato
- Frontend React + TypeScript

### 📋 Pianificato (Q2-Q4 2025)
- Sistema di reputazione e rating
- Dashboard analytics con KPI
- AI Governance framework
- Metriche sostenibilità
- Progetto Pilota Sardegna
- Marketplace tematico

**Roadmap dettagliata**: vedi [ROADMAP.md](ROADMAP.md)

## 🤝 Come Contribuire

1. Leggi [CONTRIBUTING.md](CONTRIBUTING.md)
2. Consulta la [Development Guide](backend/DEVELOPMENT_GUIDE.md)
3. Cerca issue con label `good-first-issue`
4. Segui conventional commits
5. Apri PR piccole e mirate

## 🔐 Sicurezza & Privacy

- ✅ Password hashing con bcrypt
- ✅ JWT con scadenza configurabile
- ✅ Rate limiting implementato
- ✅ CORS configurabile
- ✅ Helmet.js per security headers
- ⚠️ **NON** commitare secrets (chiavi/token)
- 📖 Vedi [SECURITY.md](SECURITY.md)

## 📜 Licenza

MIT License - vedi [LICENSE](LICENSE)

## 📞 Contatti & Community

- **GitHub Issues**: Bug reports e feature requests
- **Email**: (da definire)
- **Discord/Slack**: (TBD)

---

**Versione**: 2.0.0 | **Ultimo aggiornamento**: Febbraio 2025  
Sviluppato con ❤️ per la comunità della ristorazione italiana