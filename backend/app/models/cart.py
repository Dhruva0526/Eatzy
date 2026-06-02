# from sqlalchemy import Column, Integer, ForeignKey, String
# from sqlalchemy.dialects.mysql import CHAR
# from app.database import Base


# class Cart(Base):
#     __tablename__ = "cart"

#     id = Column(Integer, primary_key=True, index=True)

#     user_id = Column(CHAR(36), ForeignKey("users.id"))

#     menu_item_id = Column(Integer, ForeignKey("menu_items.id"))

#     quantity = Column(Integer, nullable=False)


from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        CHAR(36),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    menu_item_id = Column(
        Integer,
        ForeignKey("menu_items.id", ondelete="CASCADE"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False, default=1)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # relationships
    user = relationship("User")

    menu_item = relationship("MenuItem")