from pydantic import BaseModel, EmailStr, Field

# Payload for registration
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    # Prevent bcrypt overflow issue
    password: str = Field(min_length=6, max_length=72)


# Payload for login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# JWT response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str