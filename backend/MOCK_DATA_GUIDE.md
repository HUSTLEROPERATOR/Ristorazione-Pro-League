# Mock Data Guide - RPL Backend

## Overview
The RPL backend is now populated with comprehensive mock data for testing and development purposes. This guide explains what data is available and how to use it.

## Database Seeding

To populate the database with mock data, run:
```bash
npm run db:seed
```

This will:
1. Clear existing data
2. Create 11 users (1 admin, 6 restaurant owners, 4 workers)
3. Create 6 restaurants with realistic Italian restaurant data
4. Create 4 worker profiles
5. Create 3 job offers
6. Create 1 job application

## Mock Data Summary

### Users (11 total)

#### Admin User
- **Email**: admin@rpl.local
- **Password**: Admin123!
- **Role**: ADMIN

#### Restaurant Owners (6)
- owner.ponte@rpl.local / Password123! (Trattoria del Ponte, Roma)
- owner.gourmet@rpl.local / Password123! (Gourmet Futuro, Milano)
- owner.piazza@rpl.local / Password123! (Bistrot La Piazza, Firenze)
- owner.borgo@rpl.local / Password123! (Osteria del Borgo, Bologna)
- owner.seastars@rpl.local / Password123! (Sea & Stars, Napoli)
- owner.radice@rpl.local / Password123! (Nuova Radice, Torino)

#### Workers (4)
- mario.rossi@rpl.local / Password123! (Chef de Partie at Trattoria del Ponte)
- anna.verdi@rpl.local / Password123! (Cameriera di Sala at Trattoria del Ponte)
- luca.neri@rpl.local / Password123! (Sommelier at Trattoria del Ponte)
- giulia.gialli@rpl.local / Password123! (Apprendista Cuoca, available)

### Restaurants (6)

1. **Trattoria del Ponte** - Roma, Tradizionale, MID_RANGE
2. **Gourmet Futuro** - Milano, Innovativa, HIGH_END
3. **Bistrot La Piazza** - Firenze, Toscana, MID_RANGE
4. **Osteria del Borgo** - Bologna, Emiliana, MID_RANGE
5. **Sea & Stars** - Napoli, Pesce, HIGH_END
6. **Nuova Radice** - Torino, Vegana, BUDGET

### Job Offers (3)

1. **Sous Chef** at Gourmet Futuro (Milano)
2. **Pizzaiolo** at Sea & Stars (Napoli)
3. **Cuoco Vegano** at Nuova Radice (Torino)

## API Endpoints

### Restaurants

#### List all restaurants
```bash
GET /api/restaurants
```

Example response:
```json
{
  "success": true,
  "data": [...],
  "count": 6
}
```

#### Get restaurant by ID
```bash
GET /api/restaurants/:id
```

Returns restaurant with owner info, workers, and active job offers.

#### Create restaurant
```bash
POST /api/restaurants
Content-Type: application/json

{
  "name": "Restaurant Name",
  "address": "Via Example 123",
  "city": "Rome",
  "region": "Lazio",
  "cuisine": "Italian",
  "priceRange": "MID_RANGE",
  "ownerId": "user-id-here"
}
```

#### Update restaurant
```bash
PUT /api/restaurants/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete restaurant
```bash
DELETE /api/restaurants/:id
```

### Workers

#### List all worker profiles
```bash
GET /api/workers
```

#### Get worker profile by ID
```bash
GET /api/workers/:id
```

Returns worker profile with user info, current restaurant, and applications.

#### Create worker profile
```bash
POST /api/workers
Content-Type: application/json

{
  "userId": "user-id-here",
  "experience": 5,
  "skills": "Cooking, Pasta making",
  "languages": "Italian, English",
  "availability": "Mon-Fri",
  "hourlyRate": 15.00,
  "bio": "Experienced chef",
  "isAvailable": true
}
```

#### Update worker profile
```bash
PUT /api/workers/:id
Content-Type: application/json

{
  "hourlyRate": 18.00,
  "isAvailable": false
}
```

### Job Offers

#### List all active job offers
```bash
GET /api/workers/jobs
```

Example response:
```json
{
  "success": true,
  "data": [
    {
      "id": "job-id",
      "title": "Sous Chef",
      "position": "Sous Chef",
      "restaurant": {
        "name": "Gourmet Futuro",
        "city": "Milano"
      },
      "salary": 2500.00
    }
  ],
  "count": 3
}
```

#### Apply for a job
```bash
POST /api/workers/:workerId/apply/:jobId
Content-Type: application/json

{
  "message": "I'm interested in this position"
}
```

## Testing the API

You can test the endpoints using curl:

```bash
# Health check
curl http://localhost:3000/health

# List restaurants
curl http://localhost:3000/api/restaurants | jq .

# List workers
curl http://localhost:3000/api/workers | jq .

# List jobs
curl http://localhost:3000/api/workers/jobs | jq .
```

Or use tools like:
- Postman
- Insomnia
- HTTPie
- VS Code REST Client extension

## Notes

- All mock data uses realistic Italian restaurant names and locations
- Passwords are hashed using bcrypt
- The database is SQLite (dev.db) for easy local development
- Mock data follows the same schema as production data
- Data relationships are properly set up (restaurants -> owners, workers -> restaurants, etc.)

## Next Steps

1. Integrate authentication endpoints to allow login with mock users
2. Add frontend integration to display mock data
3. Implement filtering and search capabilities
4. Add pagination support for large datasets
5. Create admin dashboard to manage mock data
