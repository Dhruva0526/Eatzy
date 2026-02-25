from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    merchant_id = Column(
    String(36),
    ForeignKey("restaurant_merchants.id", ondelete="CASCADE"),
    nullable=False,
    index=True
    )

    name = Column(String(150), nullable=False)
    description = Column(String(255))
    address = Column(String(255))
    phone = Column(String(20))

    image_url = Column(String(255))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    merchant = relationship("RestaurantMerchant", backref="restaurants")
    menu_items = relationship(
        "MenuItem",
        back_populates="restaurant",
        cascade="all, delete-orphan"
    )
    user = relationship("User", back_populates="orders")