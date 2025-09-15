# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Comprehensive README with setup instructions, usage examples, and contribution guidelines.
- API documentation for authentication, user, and restaurant endpoints.

### Changed
- Updated Prisma schema for SQLite compatibility.

### Fixed
- Resolved type-checking errors in routes and scripts.

## [1.0.0] - 2025-09-16
### Added
- Initial release with backend MVP.
- User authentication with JWT.
- CRUD operations for users and restaurants.
- Zod validation for request payloads.
- SQLite database with Prisma ORM.
- Seed script for populating the database with sample data.
- API smoke-test script for endpoint validation.