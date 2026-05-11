from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # Database URL
    DATABASE_URL: str

    # JWT settings
    JWT_SECRET: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"


settings = Settings()