from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.order import Order

router = APIRouter(
    prefix="/restaurant/orders",
    tags=["Restaurant Orders"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ GET RESTAURANT ORDERS
@router.get("/{restaurant_id}")
def get_restaurant_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id
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

# ✅ UPDATE ORDER STATUS
@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        return {
            "message": "Order not found"
        }

    order.status = status

    db.commit()

    return {
        "message": "Status updated"
    }