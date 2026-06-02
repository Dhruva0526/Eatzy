import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=True)
    phone = Column(String(15), unique=True, nullable=False)

    password_hash = Column(String(255), nullable=True)

    # role = Column(String(20), default="user")  # user / restaurant

    addresses = relationship(
        "Address",
        back_populates="user",
        cascade="all, delete"
    )

    orders = relationship("Order", back_populates="user", cascade="all, delete")

    table_bookings = relationship(
        "TableBooking",
        back_populates="user",
        cascade="all, delete"
    )