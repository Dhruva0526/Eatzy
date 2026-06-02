from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime

class OTP(Base):
    __tablename__ = "otp"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    phone = Column(String(20), primary_key=True, index=True)   # ✅ length diya
    otp = Column(String(4), nullable=False)                    # ✅ length diya
    created_at = Column(DateTime, default=datetime.utcnow)