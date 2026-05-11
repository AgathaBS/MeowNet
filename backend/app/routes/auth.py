from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.auth import RegisterRequest
from app.schemas.auth import LoginRequest
from app.schemas.auth import TokenResponse

from app.services.auth_service import create_user
from app.services.auth_service import authenticate_user

from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):

    # Create new user
    user = create_user(
        db=db,
        username=payload.username,
        email=payload.email,
        password=payload.password
    )

    return {
        "message": "User created successfully",
        "user_id": user.id
    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    # Authenticate credentials
    user = authenticate_user(
        db=db,
        email=payload.email,
        password=payload.password
    )

    # Invalid credentials
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    # Generate JWT token
    access_token = create_access_token(
        data={
            "sub": str(user.id)
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }