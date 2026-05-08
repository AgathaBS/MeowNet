#  Project Setup

##  Tech Stack

### Frontend
- React + TypeScript
- TailwindCSS
- Framer Motion (animations)
- TanStack Query (data management)

### Backend
- FastAPI
- PostgreSQL
- Redis

### Infrastructure
- Docker Compose

---

# Run with Docker (Recommended)
Start all services (frontend + backend + database + redis)
docker-compose up --build

### Run in background
docker-compose up -d

### Stop all services
docker-compose down

# Frontend (React + TypeScript)
### Install dependencies
cd frontend
npm install
### Start development server
npm run dev
### Build production
npm run build

# Backend (FastAPI)
### Install dependencies
cd backend
pip install -r requirements.txt

### Run development server
uvicorn app.main:app --reload

### Backend runs at:

http://localhost:8000