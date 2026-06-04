
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.profile import (
    ProfileCreate,
    ProfileResponse
)
from app.services import profile_service
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=ProfileResponse)
def create_profile(
    payload: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create profile for authenticated user.
    """

    return profile_service.create_profile(
        db,
        current_user,
        payload
    )


@router.get("/me", response_model=ProfileResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve authenticated user's profile.
    """

    return profile_service.get_my_profile(
        db,
        current_user
    )