# Import create_engine to establish database connection
from sqlalchemy import create_engine

# Import SQLAlchemy ORM utilities
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

# Import application settings
from app.core.config import settings



# PostgreSQL connection URL format:
# postgresql://user:password@host:port/database
DATABASE_URL = "postgresql://meownet:meownet@localhost:5432/meownet"


# Create the SQLAlchemy engine
# The engine is responsible for communicating with PostgreSQL
engine = create_engine(DATABASE_URL)


# Create a local session factory
# A session is used to execute ORM database operations
SessionLocal = sessionmaker(
    autocommit=False,   # Changes must be committed manually
    autoflush=False,    # Prevent automatic synchronization with the DB
    bind=engine         # Bind the session to the PostgreSQL engine
)


# Base class for all ORM models
# Every SQLAlchemy model will inherit from Base
Base = declarative_base()

# Dependency injection for FastAPI routes
# Automatically opens and closes DB sessions
def get_db():

    # Create new database session
    db = SessionLocal()

    try:
        yield db

    finally:
        # Always close session after request
        db.close()