from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from datetime import datetime
from app.database import Base  # adjust import
from sqlalchemy.orm import relationship

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)

    # 🔗 Link to merchant
    merchant_id = Column(String(36), ForeignKey("restaurant_merchants.id"), nullable=False)

    # 👤 Basic Info
    name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=True)
    role = Column(String(50), nullable=True)

    # ⚙️ Status
    is_active = Column(Boolean, default=True)

    # 🕒 Timestamp
    created_at = Column(DateTime, default=datetime.utcnow)

    merchant = relationship("RestaurantMerchant", back_populates="staff")