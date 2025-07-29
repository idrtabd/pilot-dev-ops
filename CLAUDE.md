# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-service DevOps demonstration project with React frontend, Node.js API backend, and PostgreSQL database, all containerized with Docker and orchestrated via docker-compose.

## Tech Stack

### Frontend (pilot-react/)
- **React 19.1.0** - UI framework
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.4** - Build tool and dev server

### Backend (pilot-api/)
- **Node.js + Express** - API server
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Zod** - Runtime validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Jest/Supertest** - Testing

## Commands

### Docker Commands (from root)
```bash
# Production
docker-compose up                      # Start all services
docker-compose down                     # Stop all services

# Development
docker-compose -f docker-compose.dev.yml up    # Start with hot reload
docker-compose -f docker-compose.dev.yml down  # Stop dev environment

# Testing
docker-compose -f docker-compose.test.yml up   # Run all tests
```

### Frontend Commands (from pilot-react/)
```bash
yarn dev          # Start dev server (http://localhost:5173)
yarn build        # Build for production
yarn lint         # Run ESLint
yarn test         # Run tests (when configured)
```

### API Commands (from pilot-api/)
```bash
yarn dev          # Start with nodemon (http://localhost:3000)
yarn build        # Compile TypeScript
yarn start        # Run production build
yarn test         # Run unit tests
yarn test:e2e     # Run integration tests
yarn lint         # Run ESLint
```

## Architecture

### Service Architecture
```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   React     │────▶│   API       │────▶│  PostgreSQL  │
│  Frontend   │     │  Backend    │     │   Database   │
│ (Port 80)   │     │ (Port 3000) │     │ (Port 5432)  │
└─────────────┘     └─────────────┘     └──────────────┘
```

### Directory Structure
```
pilot-dev-ops/
├── pilot-react/          # React frontend
│   ├── src/             # Source code
│   ├── Dockerfile       # Production container
│   └── Dockerfile.dev   # Development container
├── pilot-api/           # Express API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Express middleware
│   │   ├── config/      # Configuration
│   │   └── index.ts     # Entry point
│   ├── tests/           # Test files
│   ├── Dockerfile       # Production container
│   └── Dockerfile.dev   # Development container
├── pilot-database/      # Database scripts
│   └── init.sql         # Schema initialization
├── docker-compose.yml   # Production orchestration
├── docker-compose.dev.yml   # Development orchestration
├── docker-compose.test.yml  # Test orchestration
└── .github/workflows/   # CI/CD pipelines
```

### Key API Endpoints
- `GET /health` - Service health check
- `GET /health/ready` - Readiness probe (includes DB check)
- `GET /api/items` - List all items
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get single item
- `DELETE /api/items/:id` - Delete item

### Environment Variables
- `NODE_ENV` - Environment (development/test/production)
- `PORT` - API server port
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - Allowed CORS origin
- `LOG_LEVEL` - Logging verbosity

### CI/CD Pipeline

The GitHub Actions pipeline performs:
1. Code quality checks (linting, type checking)
2. Unit tests for all services
3. Integration tests with docker-compose
4. Docker image building
5. Security scanning with Trivy
6. Deployment to staging/production

### Development Workflow

1. Start development environment: `docker-compose -f docker-compose.dev.yml up`
2. Frontend runs on http://localhost:5173 with hot reload
3. API runs on http://localhost:3000 with auto-restart
4. Database runs on localhost:5432
5. Make changes and see them reflected immediately
6. Run tests: `docker-compose -f docker-compose.test.yml up`