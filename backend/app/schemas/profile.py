from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProfileCreate(BaseModel):
    """
    Schema used when creating a profile.
    """

    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class ProfileUpdate(BaseModel):
    """
    Schema used when updating a profile.
    """

    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class ProfileResponse(BaseModel):
    """
    Profile response schema returned by the API.
    """

    id: int
    user_id: int
    bio: Optional[str]
    avatar_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True