from fastapi import FastAPI

from app.db.database import engine, Base

from app.models import user, cat, post

# Create FastAPI application instance
app = FastAPI()

# Create all database tables based on ORM models
# This runs at startup and ensures tables exist in PostgreSQL
Base.metadata.create_all(bind=engine)


# Root endpoint
# Simple health check / welcome route
@app.get("/")
def root():
    return {"message": "MeowNet API"}