from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TableBookingSettingsBase(BaseModel):

    accept_bookings: bool

    booking_mode: str

    booking_notifications: bool

    booking_start_time: str

    booking_end_time: str

    slot_duration: int

    total_tables: int

    max_guests_per_table: int

    parallel_bookings: int

    advance_payment_enabled: bool

    advance_payment_type: str

    advance_payment_value: int

    waitlist_enabled: bool

    auto_promote_waitlist: bool

    waitlist_notifications: bool

    max_waitlist_size: int

    auto_assign_tables: bool

    smart_capacity_matching: bool

    merge_tables: bool

    vip_table_priority: bool


class TableBookingSettingsUpdate(
    TableBookingSettingsBase
):
    pass


class TableBookingSettingsResponse(
    TableBookingSettingsBase
):

    id: int

    restaurant_id: int

    class Config:
        from_attributes = True


# BLACKOUT DATES

class BlackoutDateCreate(BaseModel):

    date: str

    reason: Optional[str] = None


class BlackoutDateResponse(BaseModel):

    id: int

    date: str

    reason: Optional[str]

    class Config:
        from_attributes = True

class TableBookingCreate(BaseModel):
    user_id: str
    restaurant_id: int
    booking_date: str
    booking_time: str
    people_count: int


class TableBookingResponse(BaseModel):
    id: int
    user_id: str
    restaurant_id: int
    booking_date: str
    booking_time: str
    people_count: int
    status: str

    class Config:
        from_attributes = True