from pydantic import BaseModel
from pydantic import EmailStr


# Payload for registration
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


# Payload for login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# JWT response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str