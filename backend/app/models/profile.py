from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base

#User public profile model.
# Contains editable public-facing information.

class Profile(Base):

   # Name of the SQL table
    __tablename__ = "profiles"

    # Primary key column
    id = Column(Integer, primary_key=True, index=True)

    #profile user related to
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    #Profile bio
    bio = Column(String, nullable=True)

    #profile avatar
    avatar_url = Column(String, nullable=True)

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc))

    # Relationship back to user
    user = relationship(
        "User",
        back_populates="profile"
    )
