# Import SQLAlchemy column types
from sqlalchemy import Column, Integer, String

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

    # User email column
    # unique=True prevents duplicate emails
    # index=True improves search performance
    email = Column(String, unique=True, index=True)

    # User password column
    password = Column(String)