# Import SQLAlchemy column types and foreign key utility
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

# Import the Base class from the database configuration
from app.db.database import Base


# Define the Cat model
# This class represents the "cats" table in PostgreSQL
class Cat(Base):

    # Name of the SQL table
    __tablename__ = "cats"

    # Primary key column
    # Automatically indexed for faster queries
    id = Column(Integer, primary_key=True, index=True)

    # Cat name column
    name = Column(String)

    # Cat mood column
    # Example values: happy, sleepy, hungry
    mood = Column(String)

    # Cat breed column
    breed = Column(String, nullable=True)

    # Cat age column
    age = Column(Integer, nullable=True)

    # Cat description column
    description = Column(String, nullable=True)

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc))

    # Foreign key linking each cat to a user
    # References the "id" column in the "users" table
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relationship back to user
    user = relationship("User", back_populates="Cat")