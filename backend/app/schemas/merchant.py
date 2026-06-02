from pydantic import BaseModel, EmailStr
from typing import Optional


class MerchantRegisterRequest(BaseModel):
    owner_name: str
    phone: str
    email: EmailStr
    password: str

class MerchantLoginRequest(BaseModel):
    email_or_phone: str
    password: str

class MerchantRestaurantRegisterRequest(BaseModel):
    # Merchant fields
    owner_name: str
    phone: str
    email: EmailStr
    password: str

    # Restaurant fields
    shop_name: str
    shop_address: str
    state: str
    city: str
    pincode: str
    gst: Optional[str]
    id_type: str