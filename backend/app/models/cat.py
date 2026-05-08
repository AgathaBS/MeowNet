# Import SQLAlchemy column types and foreign key utility
from sqlalchemy import Column, Integer, String, ForeignKey

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

    # Foreign key linking each cat to a user
    # References the "id" column in the "users" table
    owner_id = Column(Integer, ForeignKey("users.id"))