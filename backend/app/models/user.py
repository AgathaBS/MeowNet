# Import SQLAlchemy column types
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
# Import the Base class from the database configuration
from app.db.database import Base


# Define the User model
# This class represents the "users" table in PostgreSQL
class User(Base):

    # Name of the SQL table
    __tablename__ = "users"

    # Primary key column
    # Automatically indexed for faster lookups
    id = Column(Integer, primary_key=True, index=True)

    # Unique username
    username = Column(String, unique=True, index=True)

    # User email column
    # unique=True prevents duplicate emails
    # index=True improves search performance
    email = Column(String, unique=True, index=True)

    # Hashed password only
    password = Column(String)

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc))

    # One-to-one relationship with profile
    profile = relationship(
        "Profile",
        back_populates="user",
        uselist=False
    )

    # One-to-many relationship with cats
    cats = relationship(
        "Cat",
        back_populates="owner"
    )
