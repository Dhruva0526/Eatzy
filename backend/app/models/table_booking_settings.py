from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class TableBookingSettings(Base):
    __tablename__ = "table_booking_settings"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    # CORE SETTINGS

    accept_bookings = Column(Boolean, default=True)

    booking_mode = Column(
        String(50),
        default="instant_confirm"
    )

    booking_notifications = Column(
        Boolean,
        default=True
    )

    # TIME SLOTS

    booking_start_time = Column(
        String(20),
        default="10:00 AM"
    )

    booking_end_time = Column(
        String(20),
        default="11:00 PM"
    )

    slot_duration = Column(
        Integer,
        default=30
    )

    # TABLE SETTINGS

    total_tables = Column(Integer, default=10)

    max_guests_per_table = Column(
        Integer,
        default=4
    )

    parallel_bookings = Column(
        Integer,
        default=5
    )

    # ADVANCE PAYMENT

    advance_payment_enabled = Column(
        Boolean,
        default=False
    )

    advance_payment_type = Column(
        String(20),
        default="fixed"
    )

    advance_payment_value = Column(
        Integer,
        default=0
    )

    # WAITLIST

    waitlist_enabled = Column(
        Boolean,
        default=True
    )

    auto_promote_waitlist = Column(
        Boolean,
        default=True
    )

    waitlist_notifications = Column(
        Boolean,
        default=True
    )

    max_waitlist_size = Column(
        Integer,
        default=20
    )

    # AUTO ASSIGN

    auto_assign_tables = Column(
        Boolean,
        default=True
    )

    smart_capacity_matching = Column(
        Boolean,
        default=True
    )

    merge_tables = Column(
        Boolean,
        default=False
    )

    vip_table_priority = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    restaurant = relationship(
        "Restaurant",
        back_populates="table_booking_settings"
    )