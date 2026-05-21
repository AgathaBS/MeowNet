from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.schemas.cat import CatCreate, CatResponse
from app.services import cat_service
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/cats", tags=["Cats"])


@router.post("/", response_model=CatResponse)
def create_cat(
    payload: CatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a cat linked to current user.
    """

    return cat_service.create_cat(
        db,
        current_user,
        payload
    )


@router.get("/me", response_model=List[CatResponse])
def get_my_cats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve authenticated user's cats.
    """

    return cat_service.get_user_cats(
        db,
        current_user
    )