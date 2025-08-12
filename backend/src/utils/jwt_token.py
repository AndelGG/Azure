from datetime import datetime, timedelta
from enum import Enum

import jwt
import bcrypt

from src.core.config import settings
from src.exceptions.service_error import TokenTypeError, VerificationError
from src.schemas.auth import TokenResponse, Payload


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"


def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())
    except Exception as e:
        print(f"Password verification error: {e}")
        return False


def create_access_token(
        data: dict,
        timeout: int = 15,
        secret: str = settings.SECRET_KEY,
        algorithm: str = "HS256"
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=timeout)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, secret, algorithm=algorithm)


def create_refresh_token(
        data: dict,
        timeout: int = 14,
        secret: str = settings.SECRET_KEY,
        algorithm: str = "HS256"
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=timeout)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, secret, algorithm=algorithm)


def verify_token(token: str, token_type: TokenType, secret: str = settings.SECRET_KEY, algorithm: str = "HS256") -> Payload:
    try:
        # Decode the token without validation first to see what's inside
        payload = jwt.decode(token, secret, algorithms=[algorithm], options={"verify_sub": False})

        print(payload)
        if payload.get("type") != token_type:
            raise TokenTypeError(f"Invalid token type: expected {token_type}, got {payload.get('type')}")

        return Payload(
            sub=payload.get("sub"),
            name=payload.get("name")
        )
    except TokenTypeError as e:
        raise
    except Exception as e:
        raise VerificationError(f"Verification failed: {e}")

def create_tokens(data: Payload) -> TokenResponse:
    token_data = {
        "sub": data.sub,
        "name": data.name,
    }
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )
