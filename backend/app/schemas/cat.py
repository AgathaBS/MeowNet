from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CatCreate(BaseModel):
    """
    Schema used for cat creation.
    """

    name: str
    mood: str
    breed: Optional[str] = None
    age: Optional[int] = None
    description: Optional[str] = None


class CatResponse(BaseModel):
    """
    Schema returned when fetching cats.
    """

    id: int
    name: str
    mood: str
    breed: Optional[str]
    age: Optional[int]
    description: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True