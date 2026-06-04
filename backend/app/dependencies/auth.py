from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials,
)

from jose import JWTError
from jose import jwt

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.core.config import settings


# -----------------------------------------------------
# BEARER AUTHENTICATION SCHEME
# -----------------------------------------------------

bearer_scheme = HTTPBearer()


# -----------------------------------------------------
# GET CURRENT AUTHENTICATED USER
# -----------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    ),
    db: Session = Depends(get_db),
) -> User:
    """
    Validate JWT token and return the
    authenticated user from the database.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:
        # Extract JWT token from Authorization header
        token = credentials.credentials

        # Decode JWT payload
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[
                settings.JWT_ALGORITHM
            ],
        )

        # Retrieve user id stored in token
        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # Retrieve user from database
    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if user is None:
        raise credentials_exception

    return user