from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Order(Base):
    __tablename__ = "orders"

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

    total_amount = Column(Float, default=0.0)

    # pending / accepted / preparing / delivered / cancelled
    status = Column(String(50), default="pending")

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship(
        "User",
        back_populates="orders"
    )

    restaurant = relationship(
        "Restaurant",
        back_populates="orders"
    )

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete"
    )



# from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
# from sqlalchemy.dialects.mysql import CHAR
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from app.database import Base


# class Order(Base):
#     __tablename__ = "orders"

#     id = Column(Integer, primary_key=True, index=True)

#     user_id = Column(CHAR(36), ForeignKey("users.id"), nullable=False)

#     restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)

#     total_amount = Column(Float, default=0.0)

#     status = Column(String(50), default="pending")

#     created_at = Column(DateTime, default=datetime.utcnow)

#     user = relationship("User", back_populates="orders")

#     restaurant = relationship("Restaurant", back_populates="orders")

#     items = relationship("OrderItem", back_populates="order")





# from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime, String
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from app.database import Base


# class Order(Base):
#     __tablename__ = "orders"

#     id = Column(Integer, primary_key=True, index=True)

#     user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
#     restaurant_id = Column(Integer, ForeignKey("restaurants.id"), nullable=False)

#     total_amount = Column(Float, default=0.0)
#     status = Column(String(50), default="pending")

#     created_at = Column(DateTime, default=datetime.utcnow)

#     # Relationships
#     user = relationship("User", back_populates="orders")
#     restaurant = relationship("Restaurant", back_populates="orders")
#     items = relationship("OrderItem", back_populates="order", cascade="all, delete")