from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from app.database import Base

class RestaurantSettings(Base):
    __tablename__ = "restaurant_settings"

    id = Column(Integer, primary_key=True, index=True)

    restaurantId = Column(Integer, ForeignKey("restaurants.id"), nullable=False)

    # Operational
    acceptingOrders = Column(Boolean, default=True)
    busyMode = Column(Boolean, default=False)
    prepTime = Column(Integer, default=20)

    # Timing
    openTime = Column(String(20), default="10:00 AM")
    closeTime = Column(String(20), default="10:00 PM")

    # Notifications
    orderAlert = Column(Boolean, default=True)
    ringtone = Column(String(50), default="Default Bell")
    notificationInterval = Column(String(50), default="60 seconds")

    # Auto Accept
    autoAccept = Column(Boolean, default=False)