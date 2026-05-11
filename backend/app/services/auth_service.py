from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password
from app.core.security import verify_password


# Create new user
def create_user(
    db: Session,
    username: str,
    email: str,
    password: str
):

    # Hash password before saving
    hashed_password = hash_password(password)

    # Create user instance
    user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    # Save user
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# Authenticate user credentials
def authenticate_user(
    db: Session,
    email: str,
    password: str
):

    # Find user by email
    user = db.query(User).filter(
        User.email == email
    ).first()

    # User not found
    if not user:
        return None

    # Invalid password
    if not verify_password(
        password,
        user.password
    ):
        return None

    return user