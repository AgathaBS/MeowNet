from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base
from app.routes.auth import router as auth_router
from app.models import user, cat, post

# Create FastAPI application instance
app = FastAPI()

# Configure CORS middleware.
# This allows the React frontend running on localhost:5173
# to communicate with the FastAPI backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create all database tables based on ORM models.
# This runs at startup and ensures tables exist in PostgreSQL.
Base.metadata.create_all(bind=engine)

# Register authentication routes
app.include_router(auth_router)

# Root endpoint
# Simple health check / welcome route
@app.get("/")
def root():
    return {"message": "MeowNet API"}