# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-02-17
### Added
- **Complete Authentication System**
  - Full JWT-based authentication with access and refresh tokens
  - Password strength validation
  - User registration with email uniqueness check
  - Login with credentials validation
  - Token refresh endpoint
  - Protected profile endpoint
- **User Management**
  - Get/Update user profile with password change support
  - List all users with pagination (Admin/Moderator only)
  - Get user by ID with relationships (Admin/Moderator only)
  - Update user status (activate/deactivate) (Admin only)
- **Restaurant Management**
  - List restaurants with pagination and filtering
  - Get restaurant details with job offers
  - Create restaurant (authenticated users)
  - Update restaurant (owner or admin only)
  - Soft delete restaurant (owner or admin only)
- **Enhanced Seed Script**
  - Comprehensive test data with multiple users and restaurants
  - Job offers creation
  - Worker profiles
  - Test credentials for all user types
- **Documentation**
  - Complete API documentation v2 (API_DOCS_v2.md)
  - Development guide with best practices (DEVELOPMENT_GUIDE.md)
  - CI/CD workflow for GitHub Actions
- **Security & Quality**
  - Authorization middleware with role-based access control
  - Input validation improvements
  - Error handling standardization
  - TypeScript strict mode compliance

### Changed
- Updated auth routes to use full AuthController instead of SimpleAuthController
- Improved error responses with consistent format
- Enhanced Prisma queries with proper field selection
- Updated database seed with realistic test data

### Fixed
- TypeScript compilation errors in controllers
- Query parameter access for strict mode
- ID validation in route parameters
- Import statement for native fetch in test script
- Cuisine field type compatibility in mock routes

### Security
- Implemented bcrypt password hashing with configurable rounds
- JWT token expiration (15m for access, 7d for refresh)
- Rate limiting on all endpoints
- CORS configuration with allowed origins
- Helmet.js for security headers

## [1.0.0] - 2025-09-16
### Added
- Initial release with backend MVP.
- User authentication with JWT.
- CRUD operations for users and restaurants.
- Zod validation for request payloads.
- SQLite database with Prisma ORM.
- Seed script for populating the database with sample data.
- API smoke-test script for endpoint validation.

### Changed
- Updated Prisma schema for SQLite compatibility.

### Fixed
- Resolved type-checking errors in routes and scripts.