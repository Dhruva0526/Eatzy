from pydantic import BaseModel, EmailStr
from typing import Optional
from typing import Literal


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str
    role: Literal["user", "restaurant"] = "user"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str