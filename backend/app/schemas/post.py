from pydantic import BaseModel
from datetime import datetime


class PostCreate(BaseModel):
    """
    Schema used to create a post.
    """

    caption: str
    image_url: str
    cat_id: int


class PostResponse(BaseModel):
    """
    Schema returned by the API for posts.
    """

    id: int
    caption: str
    image_url: str
    cat_id: int

    class Config:
        from_attributes = True