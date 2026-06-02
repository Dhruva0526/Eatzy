from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional, Dict
from fastapi import HTTPException, status
import logging

from app.config import settings

logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# =========================
# PASSWORD FUNCTIONS
# =========================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


# =========================
# TOKEN CREATION
# =========================

def create_access_token(data: Dict) -> str:
    if "sub" not in data:
        raise ValueError("Token must contain 'sub' field")

    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode = {
        "sub": str(data["sub"]),
        "role": data.get("role", "merchant"),
        "type": "access",
        "exp": expire,
        "iat": datetime.utcnow()
    }

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def create_refresh_token(data: Dict) -> str:
    expire = datetime.utcnow() + timedelta(days=7)

    to_encode = {
        "sub": str(data["sub"]),
        "type": "refresh",
        "exp": expire,
        "iat": datetime.utcnow()
    }

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


# =========================
# TOKEN DECODE
# =========================

def decode_token(token: str) -> Optional[Dict]:
    try:
        return jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
    except JWTError as e:
        logger.error(f"Token decode error: {str(e)}")
        return None


def decode_access_token(token: str) -> Dict:
    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    if not is_access_token(payload):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )

    return payload


# =========================
# HELPERS
# =========================

def is_access_token(payload: Dict) -> bool:
    return payload.get("type") == "access"


def is_refresh_token(payload: Dict) -> bool:
    return payload.get("type") == "refresh"


def require_role(payload: Dict, role: str):
    if payload.get("role") != role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )