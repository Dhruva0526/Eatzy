from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# 🔹 Base Schema (common fields)
class StaffBase(BaseModel):
    name: str
    phone: Optional[str] = None
    role: Optional[str] = None


# 🔹 Create Staff (used in POST)
class StaffCreate(StaffBase):
    pass


# 🔹 Update Staff (used in PUT)
class StaffUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None


# 🔹 Response Schema (what API returns)
class StaffResponse(StaffBase):
    id: int
    merchant_id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True 