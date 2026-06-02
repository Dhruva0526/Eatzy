from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class TableBooking(Base):
    __tablename__ = "table_bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        CHAR(36),
        ForeignKey("users.id"),
        nullable=False
    )

    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )

    booking_date = Column(String(50), nullable=False)

    booking_time = Column(String(50), nullable=False)

    people_count = Column(Integer, nullable=False)

    status = Column(
        String(50),
        default="pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # relationships
    user = relationship(
        "User",
        back_populates="table_bookings"
    )

    restaurant = relationship(
        "Restaurant",
        back_populates="table_bookings"
    )