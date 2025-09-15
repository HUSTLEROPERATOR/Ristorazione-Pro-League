# API Documentation

This document provides an overview of the API endpoints available in the Ristorazione Pro League (RPL) backend. Each endpoint includes details about its purpose, request parameters, and response structure.

## Base URL
```
http://localhost:4000
```

## Authentication Endpoints

### 1. Login
**POST** `/auth/login`

**Description**: Authenticate a user and return a JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "<JWT_TOKEN>"
}
```

### 2. Register
**POST** `/auth/register`

**Description**: Register a new user.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

## User Endpoints

### 1. Get All Users
**GET** `/users`

**Description**: Retrieve a list of all users.

**Response**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
]
```

### 2. Get User by ID
**GET** `/users/:id`

**Description**: Retrieve details of a specific user.

**Response**:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

### 3. Create User
**POST** `/users`

**Description**: Create a new user.

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

### 4. Update User
**PUT** `/users/:id`

**Description**: Update details of an existing user.

**Request Body**:
```json
{
  "name": "Jane Smith"
}
```

**Response**:
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane.doe@example.com"
}
```

### 5. Delete User
**DELETE** `/users/:id`

**Description**: Delete a user.

**Response**:
```json
{
  "message": "User deleted successfully."
}
```

## Restaurant Endpoints

### 1. Get All Restaurants
**GET** `/restaurants`

**Description**: Retrieve a list of all restaurants.

**Response**:
```json
[
  {
    "id": 1,
    "name": "Pizza Palace",
    "location": "New York"
  }
]
```

### 2. Get Restaurant by ID
**GET** `/restaurants/:id`

**Description**: Retrieve details of a specific restaurant.

**Response**:
```json
{
  "id": 1,
  "name": "Pizza Palace",
  "location": "New York"
}
```

### 3. Create Restaurant
**POST** `/restaurants`

**Description**: Create a new restaurant.

**Request Body**:
```json
{
  "name": "Burger Barn",
  "location": "Los Angeles"
}
```

**Response**:
```json
{
  "id": 2,
  "name": "Burger Barn",
  "location": "Los Angeles"
}
```

### 4. Update Restaurant
**PUT** `/restaurants/:id`

**Description**: Update details of an existing restaurant.

**Request Body**:
```json
{
  "name": "Burger Haven"
}
```

**Response**:
```json
{
  "id": 2,
  "name": "Burger Haven",
  "location": "Los Angeles"
}
```

### 5. Delete Restaurant
**DELETE** `/restaurants/:id`

**Description**: Delete a restaurant.

**Response**:
```json
{
  "message": "Restaurant deleted successfully."
}
```

---

For more details, refer to the [README.md](./README.md) file.