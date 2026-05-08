# Import SQLAlchemy column types and foreign key support
from sqlalchemy import Column, Integer, String, ForeignKey

# Import Base class used for ORM models
from app.db.database import Base


# Define the Post model
# This represents the "posts" table in the database
class Post(Base):

    # Table name in PostgreSQL
    __tablename__ = "posts"

    # Primary key (unique identifier for each post)
    id = Column(Integer, primary_key=True, index=True)

    # Text content of the post
    caption = Column(String)

    # URL of the image associated with the post
    image_url = Column(String)

    # Foreign key linking the post to a specific cat
    # References the "id" column of the "cats" table
    cat_id = Column(Integer, ForeignKey("cats.id"))