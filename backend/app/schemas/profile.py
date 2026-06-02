from pydantic import BaseModel
from typing import Optional

class ProfileResponse(BaseModel):
    ownerName: str
    phone: str
    email: str
    shopName: str
    address: str
    state: str
    city: str
    pincode: str
    gst: str | None = None
    profile_url: str | None = None

class ProfileUpdate(BaseModel):
    ownerName: str
    email: str
    shopName: str
    address: str
    state: str
    city: str
    pincode: str
    gst: Optional[str] = None