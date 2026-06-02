from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.order import Order
from app.models.order_item import OrderItem

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ GET USER ORDERS
@router.get("/user/{user_id}")
def get_user_orders(
    user_id: str,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.user_id == user_id
    ).order_by(Order.created_at.desc()).all()

    data = []

    for order in orders:

        items = []

        for item in order.items:

            items.append({
                "name": item.menu_item.name,
                "qty": item.quantity,
                "price": item.price
            })

        data.append({
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": items
        })

    return data


# ✅ GET SINGLE ORDER
@router.get("/{order_id}")
def get_single_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        return {
            "message": "Order not found"
        }

    items = []

    for item in order.items:

        items.append({
            "name": item.menu_item.name,
            "qty": item.quantity,
            "price": item.price
        })

    return {
        "order_id": order.id,
        "status": order.status,
        "total": order.total_amount,
        "created_at": order.created_at,
        "items": items
    }