from pydantic import BaseModel
from typing import Optional

class AddressCreate(BaseModel):
    label: str
    address: str
    city: str | None = None
    pincode: str | None = None


class AddressUpdate(BaseModel):
    label: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None
    is_default: Optional[bool] = None


class AddressResponse(BaseModel):
    id: str
    label: str
    address: str
    city: str | None = None
    pincode: str | None = None
    is_default: bool