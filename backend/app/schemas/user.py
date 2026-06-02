from pydantic import BaseModel, EmailStr
from typing import Optional


# -------------------------
# Base Schema
# -------------------------
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str = "user"


# -------------------------
# Create (Register)
# -------------------------
class UserCreate(UserBase):
    password: str


# -------------------------
# Response Schema
# -------------------------
class UserResponse(BaseModel):
    id: str
    name: str
    email: Optional[str] = None
    phone: str

    class Config:
        from_attributes = True


# -------------------------
# Update Schema
# -------------------------
class UserUpdate(BaseModel):
    name: str | None = None
    email: str | None = None