# 60frameworks-back1

Production-ready, horizontally scalable REST API backend for the **IMPACT Experiential Marketing & Creative Agency Platform**. Built with **Node.js, Express, TypeScript, and MongoDB**.

---

## 🏛️ Architecture & Features

- **Stateless Express Architecture**: Ready for horizontal scaling across multiple instances.
- **RESTful API v1**: Versioned under `/api/v1`.
- **Database Layer**: MongoDB via Mongoose with connection pooling (`maxPoolSize: 20`) and compound indexes.
- **Security & Reliability**:
  - `Helmet` for secure HTTP headers
  - `express-rate-limit` for anti-abuse and endpoint DDoS mitigation
  - `compression` for gzip response optimization
  - `zod` schema validation for incoming payloads
  - Centralized error handling and graceful shutdown listeners
- **Containerization**: Multi-stage `Dockerfile` and `docker-compose` orchestration.
- **Health Check**: `/api/v1/health` with real-time uptime, memory usage, and DB status.

---

## 📡 API Endpoints (`/api/v1`)

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health, uptime, memory, and database status |
| `GET` | `/projects` | List case studies (supports `?category=...&featured=true`) |
| `GET` | `/projects/:slug` | Retrieve single project details by slug |
| `GET` | `/services` | List all 6 core agency capabilities and deliverables |
| `GET` | `/sectors` | List all 8 specialized industry verticals |
| `GET` | `/clients` | List trusted brand partners |
| `GET` | `/testimonials` | List client quotes and impact metrics |
| `POST` | `/contact` | Submit client inquiry (Zod validated, rate-limited, stored in MongoDB) |

---

## 🛠️ Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
MONGODB_URI=mongodb://127.0.0.1:27017/creative_agency
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CONTACT_RATE_LIMIT_MAX=5
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Server
```bash
# Development mode with hot-reload
npm run dev

# Production build and run
npm run build
npm run start
```
