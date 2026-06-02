from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy import UniqueConstraint
from app.database import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(CHAR(36), ForeignKey("users.id"))

    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))

    __table_args__ = (
        UniqueConstraint('user_id', 'restaurant_id', name='unique_user_favorite'),
    )