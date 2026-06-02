from pydantic import BaseModel, EmailStr
from typing import Optional


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


#  VERY IMPORTANT
class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str

    class Config:
        from_attributes = True


# for JWT response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SendOTPRequest(BaseModel):
    phone: str


class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

class CompleteProfileRequest(BaseModel):
    name: str
    phone: str