# Import SQLAlchemy column types and foreign key support
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
# Import Base class used for ORM models
from app.db.database import Base


# Define the Post model
# This represents the "posts" table in the database
class Post(Base):
    """
    Social post created for a cat.
    """

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    caption = Column(String)

    image_url = Column(String)

    cat_id = Column(
        Integer,
        ForeignKey("cats.id", ondelete="CASCADE")
    )

    # Relationship to cat
    cat = relationship(
        "Cat"
    )