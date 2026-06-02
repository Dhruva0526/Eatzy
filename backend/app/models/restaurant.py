from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)

    merchant_id = Column(
        CHAR(36),
        ForeignKey("restaurant_merchants.id", ondelete="CASCADE"),
        nullable=False
    )

    name = Column(String(150), nullable=False)  # shop name

    address = Column(String(255))
    state = Column(String(100))
    city = Column(String(100))
    pincode = Column(String(10))

    phone = Column(String(20))

    gst = Column(String(50))

    cuisine = Column(String(100))

    category = Column(String(100))

    rating = Column(String(10), default="4.0")

    time = Column(String(30), default="20-30 min")

    table_available = Column(String(10), default="yes")

    id_type = Column(String(50))
    id_file_url = Column(String(255))

    profile_url = Column(String(255))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    merchant = relationship("RestaurantMerchant", back_populates="restaurants")

    menu_items = relationship("MenuItem", back_populates="restaurant")

    orders = relationship("Order", back_populates="restaurant", cascade="all, delete")

    table_bookings = relationship(
        "TableBooking",
        back_populates="restaurant",
        cascade="all, delete"
    )

    table_booking_settings = relationship(
        "TableBookingSettings",
        back_populates="restaurant",
        uselist=False,
        cascade="all, delete"
    )















# from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
# from sqlalchemy.dialects.mysql import CHAR
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func
# from app.database import Base


# class Restaurant(Base):
#     __tablename__ = "restaurants"

#     id = Column(Integer, primary_key=True, index=True)

#     merchant_id = Column(
#         CHAR(36),
#         ForeignKey("restaurant_merchants.id", ondelete="CASCADE"),
#         nullable=False
#     )

#     name = Column(String(150), nullable=False)

#     address = Column(String(255))

#     phone = Column(String(20))

#     profile_url = Column(String(255))

#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     merchant = relationship("RestaurantMerchant", back_populates="restaurants")

#     menu_items = relationship("MenuItem", back_populates="restaurant")

#     orders = relationship("Order", back_populates="restaurant")






# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func
# from app.database import Base


# class Restaurant(Base):
#     __tablename__ = "restaurants"

#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)

#     merchant_id = Column(
#         String(36),
#         ForeignKey("restaurant_merchants.id", ondelete="CASCADE"),
#         nullable=False,
#         index=True
#     )

#     name = Column(String(150), nullable=False)
#     description = Column(String(255))
#     address = Column(String(255))
#     phone = Column(String(20))
#     image_url = Column(String(255))

#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     # Correct Relationships
#     merchant = relationship("RestaurantMerchant", backref="restaurants")
#     menu_items = relationship(
#         "MenuItem",
#         back_populates="restaurant",
#         cascade="all, delete-orphan"
#     )







# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func
# from app.database import Base


# class Restaurant(Base):
#     __tablename__ = "restaurants"

#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)

#     merchant_id = Column(
#     String(36),
#     ForeignKey("restaurant_merchants.id", ondelete="CASCADE"),
#     nullable=False,
#     index=True
#     )

#     name = Column(String(150), nullable=False)
#     description = Column(String(255))
#     address = Column(String(255))
#     phone = Column(String(20))

#     image_url = Column(String(255))

#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     # Relationships
#     merchant = relationship("RestaurantMerchant", backref="restaurants")
#     menu_items = relationship(
#         "MenuItem",
#         back_populates="restaurant",
#         cascade="all, delete-orphan"
#     )
#     # user = relationship("User", back_populates="orders")