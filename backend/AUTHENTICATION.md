# 🔐 Sistema di Autenticazione RPL

Il backend RPL ora include un **sistema completo di autenticazione JWT** con tutte le funzionalità necessarie per la gestione sicura degli utenti.

## ✅ Componenti Implementati

### 🎯 **Controller di Autenticazione** (`authController.ts`)
- **Registrazione utente** con validazione completa
- **Login** con verifica credenziali
- **Refresh token** per rinnovo sessioni
- **Logout** con invalidazione token
- **Profilo utente** protetto da autenticazione

### 🛡 **Middleware di Sicurezza** (`auth.ts`)
- **`authenticateToken`**: Verifica JWT e protegge route
- **`authorizeRoles`**: Controllo permessi basato su ruoli
- **`optionalAuth`**: Autenticazione opzionale per route pubbliche

### 🧪 **Validazione Dati** (`validation.ts`)
- **Schema Registrazione**: Email, password sicura, nome/cognome
- **Schema Login**: Validazione credenziali
- **Schema Refresh**: Gestione token di rinnovo
- **Validazione Password**: Requisiti di sicurezza avanzati

### 🔧 **Utilità di Autenticazione** (`auth.ts`)
- **Hash Password**: Bcrypt con salt configurabile
- **Generazione JWT**: Access token (15min) e Refresh token (7d)
- **Verifica Token**: Validazione sicura con gestione errori
- **Estrazione Header**: Parsing Authorization Bearer

### 🗄 **Integrazione Database** (`database.ts`)
- **Prisma Client** configurato per development/production
- **Logging** queries in development
- **Connection pooling** ottimizzato

## 🔗 Endpoint API Implementati

### **Pubblici** (Non richiedono autenticazione)
```http
POST /api/auth/register    # Registrazione nuovo utente
POST /api/auth/login       # Login utente esistente  
POST /api/auth/refresh     # Rinnovo token con refresh token
```

### **Protetti** (Richiedono autenticazione)
```http
GET  /api/auth/profile     # Profilo utente corrente
POST /api/auth/logout      # Logout utente
GET  /api/users/profile    # Profilo utente (alternativo)
PUT  /api/users/profile    # Aggiorna profilo utente
```

### **Admin** (Richiedono ruolo ADMIN/MODERATOR)
```http
GET  /api/users           # Lista tutti gli utenti
```

## 🚀 Come Utilizzare

### 1. **Registrazione Utente**
```json
POST /api/auth/register
{
  "email": "mario.rossi@example.com",
  "password": "SecurePass123!",
  "firstName": "Mario",
  "lastName": "Rossi",
  "role": "USER"
}
```

**Risposta:**
```json
{
  "success": true,
  "message": "Registrazione completata con successo",
  "data": {
    "user": {
      "id": "clxxx...",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true
    },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ..."
    }
  }
}
```

### 2. **Login**
```json
POST /api/auth/login
{
  "email": "mario.rossi@example.com",
  "password": "SecurePass123!"
}
```

### 3. **Accesso a Route Protette**
```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. **Rinnovo Token**
```json
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🛡 Sicurezza Implementata

### **Password Policy**
- ✅ Minimo 8 caratteri
- ✅ Almeno 1 maiuscola, 1 minuscola, 1 numero, 1 carattere speciale
- ✅ Hash con bcrypt e salt (12 rounds)

### **JWT Tokens**
- ✅ **Access Token**: 15 minuti (short-lived)
- ✅ **Refresh Token**: 7 giorni (long-lived)
- ✅ **Issuer/Audience**: Validazione origine
- ✅ **Payload**: userId, email, role

### **Gestione Errori**
- ✅ **401 Unauthorized**: Token mancante/invalido/scaduto
- ✅ **403 Forbidden**: Permessi insufficienti
- ✅ **409 Conflict**: Utente già esistente
- ✅ **400 Bad Request**: Dati non validi

### **Validazione Input**
- ✅ **Zod Schema**: Validazione tipi e formato
- ✅ **Sanitizzazione**: Prevenzione injection
- ✅ **Rate Limiting**: Protezione brute force

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  firstName String
  lastName  String
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}
```

## 🧪 Testing

### **Script di Test Disponibile**
```bash
# PowerShell
./test-auth.ps1
```

### **Test Coperti**
- ✅ Registrazione utente (nuovo/esistente)
- ✅ Login con credenziali valide
- ✅ Accesso a profilo con token valido
- ✅ Rinnovo token con refresh token
- ✅ Logout utente
- ✅ Gestione token invalidi
- ✅ Protezione route senza autenticazione

## 🔧 Configurazione

### **Variabili d'Ambiente** (`.env`)
```env
# JWT Configuration
JWT_SECRET=rpl_super_secret_jwt_key_for_development_only_2025
JWT_EXPIRES_IN=7d

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rpl_db?schema=public"

# Security
BCRYPT_ROUNDS=12
```

## ✅ Status

**🎉 SISTEMA DI AUTENTICAZIONE COMPLETAMENTE IMPLEMENTATO**

- ✅ **JWT Authentication** funzionante
- ✅ **Role-based Access Control** implementato
- ✅ **Password Security** con bcrypt
- ✅ **Input Validation** con Zod
- ✅ **Error Handling** completo
- ✅ **Database Integration** con Prisma
- ✅ **Test Suite** disponibile

**Pronto per la produzione!** 🚀