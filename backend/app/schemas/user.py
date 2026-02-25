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
class UserResponse(UserBase):
    id: str

    class Config:
        from_attributes = True


# -------------------------
# Update Schema
# -------------------------
class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None