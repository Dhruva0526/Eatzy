from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.menu_item import MenuItem
from app.schemas.menu import MenuItemCreate, MenuItemUpdate
from app.models.restaurant_merchant import RestaurantMerchant
from app.models.restaurant import Restaurant
from sqlalchemy import or_

router = APIRouter(prefix="/menu", tags=["Menu"])


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 Helper function (format response for frontend)
def format_menu_item(item):
    return {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": float(item.price),
        "is_available": item.is_available
    }


def get_restaurant_from_identifier(identifier: str, db: Session):
    merchant = db.query(RestaurantMerchant).filter(
        or_(
            RestaurantMerchant.email == identifier,
            RestaurantMerchant.phone == identifier
        )
    ).first()

    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")

    if not merchant.restaurants or len(merchant.restaurants) == 0:
        raise HTTPException(status_code=404, detail="No restaurant found")

    return merchant.restaurants[0]  # first restaurant

# ✅ 1. Get Menu by Restaurant
# @router.get("/restaurant/{restaurant_id}")
# def get_menu(restaurant_id: int, db: Session = Depends(get_db)):
#     items = db.query(MenuItem).filter(
#         MenuItem.restaurant_id == restaurant_id,
#         MenuItem.is_deleted == False
#     ).order_by(MenuItem.created_at.desc()).all()

#     return [format_menu_item(item) for item in items]

# ✅ Public Menu API (Customer App)
@router.get("/restaurant/{restaurant_id}")
def get_restaurant_menu(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    items = db.query(MenuItem).filter(
        MenuItem.restaurant_id == restaurant_id,
        MenuItem.is_deleted == False,
        MenuItem.is_available == True
    ).all()

    return [format_menu_item(item) for item in items]

@router.get("/my-menu")
def get_my_menu(identifier: str, db: Session = Depends(get_db)):
    restaurant = get_restaurant_from_identifier(identifier, db)

    items = db.query(MenuItem).filter(
        MenuItem.restaurant_id == restaurant.id,
        MenuItem.is_deleted == False
    ).all()

    return [format_menu_item(item) for item in items]


# ✅ 2. Add New Menu Item
@router.post("/my-menu")
def add_my_menu_item(data: MenuItemCreate, identifier: str, db: Session = Depends(get_db)):
    restaurant = get_restaurant_from_identifier(identifier, db)

    item = MenuItem(
        name=data.name,
        description=data.description,
        price=data.price,
        restaurant_id=restaurant.id
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return {"msg": "Item added", "item": format_menu_item(item)}


# ✅ 3. Update Menu Item (Edit)
@router.put("/my-menu/{id}")
def update_my_menu_item(id: int, data: MenuItemUpdate, identifier: str, db: Session = Depends(get_db)):
    restaurant = get_restaurant_from_identifier(identifier, db)

    item = db.query(MenuItem).filter(
        MenuItem.id == id,
        MenuItem.restaurant_id == restaurant.id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    return {"msg": "Updated", "item": format_menu_item(item)}


# ✅ 4. Toggle Active / Pause (matches your UI button)
@router.put("/my-menu/{id}/toggle")
def toggle_my_menu_item(id: int, identifier: str, db: Session = Depends(get_db)):
    restaurant = get_restaurant_from_identifier(identifier, db)

    item = db.query(MenuItem).filter(
        MenuItem.id == id,
        MenuItem.restaurant_id == restaurant.id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    item.is_available = not item.is_available
    db.commit()

    return {"msg": "Status updated"}
    

@router.delete("/my-menu/{id}")
def delete_my_menu_item(id: int, identifier: str, db: Session = Depends(get_db)):
    restaurant = get_restaurant_from_identifier(identifier, db)

    item = db.query(MenuItem).filter(
        MenuItem.id == id,
        MenuItem.restaurant_id == restaurant.id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()

    return {"msg": "Deleted"}