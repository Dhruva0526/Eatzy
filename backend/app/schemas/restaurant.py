from pydantic import BaseModel
from typing import Optional

class RestaurantCreateRequest(BaseModel):
    shop_name: str
    shop_address: str
    state: str
    city: str
    pincode: str
    gst: Optional[str]
    id_type: str