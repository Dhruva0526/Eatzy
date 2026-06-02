from pydantic import BaseModel
from typing import Optional

class SettingsUpdate(BaseModel):
    acceptingOrders: Optional[bool] = None
    busyMode: Optional[bool] = None
    prepTime: Optional[int] = None
    openTime: Optional[str] = None
    closeTime: Optional[str] = None
    orderAlert: Optional[bool] = None
    ringtone: Optional[str] = None
    notificationInterval: Optional[str] = None
    autoAccept: Optional[bool] = None