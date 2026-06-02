from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)
    description = Column(String(500), nullable=True)

    price = Column(Numeric(10, 2), nullable=False)

    image_url = Column(String(300), nullable=True)

    is_available = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False)

    restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_items")

    order_items = relationship(
        "OrderItem",
        back_populates="menu_item",
        cascade="all, delete"
    )