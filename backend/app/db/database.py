# Import create_engine to establish the database connection
from sqlalchemy import create_engine

# Import SQLAlchemy ORM utilities
from sqlalchemy.orm import sessionmaker, declarative_base


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