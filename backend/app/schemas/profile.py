from pydantic import BaseModel
from typing import Optional


class ProfileCreate(BaseModel):
    username: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class ProfileResponse(BaseModel):
    id: int
    username: str
    bio: Optional[str]
    avatar_url: Optional[str]

    class Config:
        from_attributes = True