from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from passlib.context import CryptContext

from fastapi import Depends, HTTPException, status
from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials,
)

from app.core.config import settings


# -----------------------------------------------------
# PASSWORD HASHING
# -----------------------------------------------------

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    """
    Hash a plain password using bcrypt.
    """
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    Verify a plain password against its hashed version.
    """
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )


# -----------------------------------------------------
# JWT / BEARER CONFIGURATION
# -----------------------------------------------------

bearer_scheme = HTTPBearer()


# -----------------------------------------------------
# CREATE JWT TOKEN
# -----------------------------------------------------

def create_access_token(data: dict) -> str:
    """
    Generate a JWT access token with expiration.
    """

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {
            "exp": expire,
        }
    )

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM,
    )

    return encoded_jwt
