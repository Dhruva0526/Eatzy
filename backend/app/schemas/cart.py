from pydantic import BaseModel


class CartCreate(BaseModel):
    user_id: str
    menu_item_id: int
    quantity: int = 1


class CartResponse(BaseModel):
    id: int
    user_id: str
    menu_item_id: int
    quantity: int

    class Config:
        from_attributes = True