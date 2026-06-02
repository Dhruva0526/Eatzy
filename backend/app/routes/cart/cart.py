from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.cart import Cart
from app.models.menu_item import MenuItem

from app.schemas.cart import (
    CartCreate,
    CartResponse
)

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)

# -----------------------------
# ADD TO CART
# -----------------------------
@router.post("/")
def add_to_cart(
    data: CartCreate,
    db: Session = Depends(get_db)
):

    # check existing item
    existing_item = db.query(Cart).filter(
        Cart.user_id == data.user_id,
        Cart.menu_item_id == data.menu_item_id
    ).first()

    # if exists increase quantity
    if existing_item:

        existing_item.quantity += data.quantity

        db.commit()
        db.refresh(existing_item)

        return {
            "message": "Cart quantity updated",
            "cart": existing_item
        }

    # check menu item exists
    menu_item = db.query(MenuItem).filter(
        MenuItem.id == data.menu_item_id
    ).first()

    if not menu_item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )

    # create cart item
    new_cart = Cart(
        user_id=data.user_id,
        menu_item_id=data.menu_item_id,
        quantity=data.quantity
    )

    db.add(new_cart)

    db.commit()

    db.refresh(new_cart)

    return {
        "message": "Item added to cart",
        "cart": new_cart
    }


# -----------------------------
# GET USER CART
# -----------------------------
@router.get("/{user_id}")
def get_user_cart(
    user_id: str,
    db: Session = Depends(get_db)
):

    cart_items = db.query(Cart).filter(
        Cart.user_id == user_id
    ).all()

    response = []

    for item in cart_items:

        response.append({
            "cart_id": item.id,

            "quantity": item.quantity,

            "menu_item": {
                "id": item.menu_item.id,
                "restaurant_id": item.menu_item.restaurant_id,
                "name": item.menu_item.name,
                "description": item.menu_item.description,
                "price": float(item.menu_item.price),
                "image_url": item.menu_item.image_url,
                "is_available": item.menu_item.is_available,
            }
        })

    return response


# -----------------------------
# UPDATE QUANTITY
# -----------------------------
@router.put("/{cart_id}")
def update_cart_quantity(
    cart_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    cart_item.quantity = quantity

    db.commit()

    db.refresh(cart_item)

    return {
        "message": "Cart updated",
        "cart": cart_item
    }


# -----------------------------
# DELETE CART ITEM
# -----------------------------
@router.delete("/{cart_id}")
def delete_cart_item(
    cart_id: int,
    db: Session = Depends(get_db)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)

    db.commit()

    return {
        "message": "Item removed from cart"
    }