# Pilot DevOps Project

A comprehensive DevOps demonstration project showcasing CI/CD best practices with Docker, automated testing, and multi-service orchestration.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   React     │────▶│   API       │────▶│  PostgreSQL  │
│  Frontend   │     │  Backend    │     │   Database   │
│ (Port 5173) │     │ (Port 3000) │     │ (Port 5432)  │
└─────────────┘     └─────────────┘     └──────────────┘
```

## Project Structure

```
pilot-dev-ops/
├── pilot-react/        # React frontend application
├── pilot-api/          # Node.js/Express API backend
├── pilot-database/     # Database migrations and seeds
├── docker-compose.yml  # Multi-container orchestration
├── .github/
│   └── workflows/      # CI/CD pipeline definitions
└── scripts/            # DevOps utility scripts
```

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 16
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest (API) + Vitest (React) + Cypress (E2E)

## Quick Start

```bash
# Start all services
docker-compose up

# Run in development mode
docker-compose -f docker-compose.dev.yml up

# Run tests
docker-compose -f docker-compose.test.yml up
```

## Development

### Frontend (React)
```bash
cd pilot-react
yarn dev          # Start dev server
yarn test         # Run unit tests
yarn build        # Build for production
```

### Backend (API)
```bash
cd pilot-api
yarn dev          # Start with nodemon
yarn test         # Run unit tests
yarn test:e2e     # Run integration tests
```

## DevOps Features

- **Containerization**: All services run in Docker containers
- **Environment Management**: Dev, test, and production configurations
- **Automated Testing**: Unit, integration, and E2E test suites
- **CI/CD Pipeline**: Automated build, test, and deployment
- **Database Migrations**: Version-controlled schema changes
- **Health Checks**: Service availability monitoring
- **Logging**: Centralized logging with proper log levels
- **Security**: Environment variable management, security scanning

## CI/CD Pipeline

The pipeline automatically:
1. Runs linting and type checking
2. Executes unit tests for all services
3. Builds Docker images
4. Runs integration tests
5. Performs security scans
6. Deploys to staging/production (based on branch)

## Best Practices Demonstrated

- **12-Factor App**: Environment-based configuration
- **Microservices**: Service separation and communication
- **Infrastructure as Code**: Docker and docker-compose configurations
- **Automated Testing**: Multiple test levels (unit, integration, E2E)
- **Continuous Integration**: Automated quality checks
- **Continuous Deployment**: Automated deployment pipeline
- **Monitoring Ready**: Health endpoints and structured logging