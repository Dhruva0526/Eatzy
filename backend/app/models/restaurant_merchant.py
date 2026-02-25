from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.database import Base
import uuid


class RestaurantMerchant(Base):
    __tablename__ = "restaurant_merchants"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    restaurant_name = Column(String(150), nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone_number = Column(String(20), unique=True, nullable=False)

    address = Column(String(255))
    gst_number = Column(String(50))

    password_hash = Column(String(255), nullable=False)

    profile_url = Column(String(255))
    document_url = Column(String(255))

    created_at = Column(DateTime(timezone=True), server_default=func.now())