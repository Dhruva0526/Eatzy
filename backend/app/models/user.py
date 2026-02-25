import uuid
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(15), unique=True, nullable=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(String(20), default="user")  # user / restaurant

    orders = relationship("Order", back_populates="user")