from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
import uuid

from app.database import Base


class Address(Base):
    __tablename__ = "addresses"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    user_id = Column(
        String(36),
        ForeignKey("users.id", ondelete="CASCADE")
    )

    label = Column(String(100), nullable=False)

    address = Column(String(255), nullable=False)

    city = Column(String(100), nullable=True)

    pincode = Column(String(20), nullable=True)

    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")