# RPL Backend API Documentation (Aggiornato)

Documentazione completa delle API REST per Ristorazione Pro League.

**Versione**: 2.0.0  
**Base URL**: `http://localhost:3000/api`  
**Data Ultimo Aggiornamento**: Febbraio 2025

## Indice
1. [Autenticazione](#autenticazione)
2. [Utenti](#utenti)
3. [Ristoranti](#ristoranti)
4. [Workers](#workers)
5. [Modelli di Risposta](#modelli-di-risposta)

---

## Autenticazione

Tutti gli endpoint protetti richiedono un header `Authorization` con il token JWT:
```
Authorization: Bearer <access_token>
```

### POST /api/auth/register
**Descrizione**: Registra un nuovo utente nel sistema.

**Richiesta**:
```json
{
  "email": "mario.rossi@example.com",
  "password": "SecureP@ss123",
  "firstName": "Mario",
  "lastName": "Rossi",
  "role": "USER"
}
```

**Risposta** (201 Created):
```json
{
  "success": true,
  "message": "Registrazione completata con successo",
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

**Errori**:
- `409 Conflict` - Email già registrata
- `400 Bad Request` - Dati non validi

---

### POST /api/auth/login
**Descrizione**: Effettua il login e ottiene i token JWT.

**Richiesta**:
```json
{
  "email": "mario.rossi@example.com",
  "password": "SecureP@ss123"
}
```

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Login effettuato con successo",
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

**Errori**:
- `401 Unauthorized` - Credenziali non valide
- `401 Unauthorized` - Account disabilitato

---

### POST /api/auth/refresh
**Descrizione**: Rinnova il token di accesso usando il refresh token.

**Richiesta**:
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Token rinnovato con successo",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

---

### POST /api/auth/logout
**Descrizione**: Effettua il logout (client-side token invalidation).

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Logout effettuato con successo"
}
```

---

### GET /api/auth/profile
**Descrizione**: Ottiene il profilo dell'utente autenticato.  
**Autenticazione**: Richiesta

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-20T14:22:00.000Z"
    }
  }
}
```

---

## Utenti

### GET /api/users/profile
**Descrizione**: Ottiene il profilo completo dell'utente con relazioni.  
**Autenticazione**: Richiesta

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-20T14:22:00.000Z",
      "restaurants": [
        {
          "id": "clx456def",
          "name": "Ristorante La Piazzetta",
          "city": "Cagliari",
          "region": "Sardegna",
          "cuisine": "Italiana"
        }
      ],
      "workerProfiles": []
    }
  }
}
```

---

### PUT /api/users/profile
**Descrizione**: Aggiorna il profilo dell'utente.  
**Autenticazione**: Richiesta

**Richiesta**:
```json
{
  "firstName": "Mario",
  "lastName": "Rossi",
  "email": "nuovo.email@example.com",
  "currentPassword": "OldPass123",
  "newPassword": "NewSecureP@ss456"
}
```

**Nota**: Tutti i campi sono opzionali. Per cambiare password è richiesta la password attuale.

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Profilo aggiornato con successo",
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "nuovo.email@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true,
      "updatedAt": "2025-02-17T21:15:00.000Z"
    }
  }
}
```

---

### GET /api/users
**Descrizione**: Lista tutti gli utenti (solo Admin/Moderator).  
**Autenticazione**: Richiesta (ADMIN o MODERATOR)

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 10, max: 100)

**Esempio**: `/api/users?page=1&limit=20`

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "clx123abc",
        "email": "mario.rossi@example.com",
        "firstName": "Mario",
        "lastName": "Rossi",
        "role": "USER",
        "isActive": true,
        "createdAt": "2025-01-15T10:30:00.000Z",
        "_count": {
          "restaurants": 1,
          "workerProfiles": 0
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### GET /api/users/:id
**Descrizione**: Ottiene dettagli di un utente specifico (solo Admin/Moderator).  
**Autenticazione**: Richiesta (ADMIN o MODERATOR)

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-20T14:22:00.000Z",
      "restaurants": [...],
      "workerProfiles": [...]
    }
  }
}
```

---

### PATCH /api/users/:id/status
**Descrizione**: Attiva o disattiva un utente (solo Admin).  
**Autenticazione**: Richiesta (ADMIN)

**Richiesta**:
```json
{
  "isActive": false
}
```

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Utente disattivato con successo",
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "mario.rossi@example.com",
      "firstName": "Mario",
      "lastName": "Rossi",
      "role": "USER",
      "isActive": false
    }
  }
}
```

---

## Ristoranti

### GET /api/restaurants
**Descrizione**: Lista tutti i ristoranti attivi con paginazione.  
**Autenticazione**: Opzionale

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 10, max: 100)

**Esempio**: `/api/restaurants?page=2&limit=15`

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "clx456def",
        "name": "Ristorante La Piazzetta",
        "description": "Cucina tradizionale sarda",
        "address": "Via Roma 123",
        "city": "Cagliari",
        "region": "Sardegna",
        "postalCode": "09100",
        "phone": "+39 070 123456",
        "email": "info@lapiazzetta.it",
        "website": "https://lapiazzetta.it",
        "cuisine": "Italiana, Sarda",
        "priceRange": "MEDIO",
        "isActive": true,
        "createdAt": "2025-01-10T08:00:00.000Z",
        "owner": {
          "id": "clx123abc",
          "firstName": "Mario",
          "lastName": "Rossi",
          "email": "mario.rossi@example.com"
        }
      }
    ],
    "pagination": {
      "page": 2,
      "limit": 15,
      "total": 87,
      "totalPages": 6
    }
  }
}
```

---

### GET /api/restaurants/:id
**Descrizione**: Ottiene dettagli completi di un ristorante specifico.  
**Autenticazione**: Opzionale

**Risposta** (200 OK):
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "clx456def",
      "name": "Ristorante La Piazzetta",
      "description": "Cucina tradizionale sarda",
      "address": "Via Roma 123",
      "city": "Cagliari",
      "region": "Sardegna",
      "postalCode": "09100",
      "phone": "+39 070 123456",
      "email": "info@lapiazzetta.it",
      "website": "https://lapiazzetta.it",
      "cuisine": "Italiana, Sarda",
      "priceRange": "MEDIO",
      "isActive": true,
      "createdAt": "2025-01-10T08:00:00.000Z",
      "updatedAt": "2025-02-15T12:30:00.000Z",
      "owner": {
        "id": "clx123abc",
        "firstName": "Mario",
        "lastName": "Rossi",
        "email": "mario.rossi@example.com"
      },
      "jobOffers": [
        {
          "id": "clx789ghi",
          "title": "Cuoco di linea",
          "position": "COOK",
          "contractType": "FULL_TIME",
          "salary": "1800.00",
          "isActive": true,
          "createdAt": "2025-02-10T09:00:00.000Z"
        }
      ]
    }
  }
}
```

---

### POST /api/restaurants
**Descrizione**: Crea un nuovo ristorante.  
**Autenticazione**: Richiesta

**Richiesta**:
```json
{
  "name": "Trattoria del Mare",
  "description": "Specialità di pesce fresco",
  "address": "Lungomare Poetto 45",
  "city": "Cagliari",
  "region": "Sardegna",
  "postalCode": "09126",
  "phone": "+39 070 987654",
  "email": "info@trattoriadelmare.it",
  "website": "https://trattoriadelmare.it",
  "cuisine": "Pesce, Mediterranea",
  "priceRange": "MEDIO_ALTO"
}
```

**Campi obbligatori**: name, address, city, region, postalCode, cuisine, priceRange

**Risposta** (201 Created):
```json
{
  "success": true,
  "message": "Ristorante creato con successo",
  "data": {
    "restaurant": {
      "id": "clx999jkl",
      "name": "Trattoria del Mare",
      ...
      "owner": {
        "id": "clx123abc",
        "firstName": "Mario",
        "lastName": "Rossi",
        "email": "mario.rossi@example.com"
      }
    }
  }
}
```

---

### PUT /api/restaurants/:id
**Descrizione**: Aggiorna un ristorante esistente.  
**Autenticazione**: Richiesta (Owner o Admin)

**Richiesta** (tutti i campi opzionali):
```json
{
  "name": "Trattoria del Mare - Nuovo Nome",
  "description": "Nuova descrizione",
  "phone": "+39 070 111222",
  "isActive": true
}
```

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Ristorante aggiornato con successo",
  "data": {
    "restaurant": { ... }
  }
}
```

**Errori**:
- `403 Forbidden` - Non sei il proprietario
- `404 Not Found` - Ristorante non trovato

---

### DELETE /api/restaurants/:id
**Descrizione**: Disattiva un ristorante (soft delete).  
**Autenticazione**: Richiesta (Owner o Admin)

**Risposta** (200 OK):
```json
{
  "success": true,
  "message": "Ristorante eliminato con successo"
}
```

---

## Workers

### GET /api/workers
**Descrizione**: Lista workers disponibili (placeholder - da implementare).

---

## Modelli di Risposta

### Risposta di Successo
```json
{
  "success": true,
  "message": "Messaggio opzionale",
  "data": { ... }
}
```

### Risposta di Errore
```json
{
  "success": false,
  "error": {
    "message": "Descrizione dell'errore",
    "code": "ERROR_CODE",
    "details": "Dettagli aggiuntivi (opzionale)"
  }
}
```

### Codici di Errore Comuni
- `AUTHENTICATION_REQUIRED` - Token mancante
- `INVALID_TOKEN` - Token non valido
- `TOKEN_EXPIRED` - Token scaduto
- `FORBIDDEN` - Permessi insufficienti
- `USER_NOT_FOUND` - Utente non trovato
- `RESTAURANT_NOT_FOUND` - Ristorante non trovato
- `VALIDATION_ERROR` - Errore di validazione dati
- `EMAIL_ALREADY_EXISTS` - Email già registrata

---

## Note di Sicurezza

1. **Password**: Devono contenere almeno 8 caratteri, 1 maiuscola, 1 minuscola, 1 numero e 1 carattere speciale.
2. **Access Token**: Scade dopo 15 minuti.
3. **Refresh Token**: Scade dopo 7 giorni (configurabile).
4. **Rate Limiting**: Max 100 richieste per IP ogni 15 minuti.
5. **CORS**: Configurato per origini specifiche (vedi .env).

---

## Health Check

### GET /health
**Descrizione**: Verifica lo stato del server.

**Risposta** (200 OK):
```json
{
  "status": "OK",
  "message": "RPL Backend API is running",
  "timestamp": "2025-02-17T21:03:00.753Z",
  "version": "1.0.0"
}
```

---

**Ultimo Aggiornamento**: 17 Febbraio 2025  
**Supporto**: Per domande o segnalazioni, apri una issue su GitHub.
