from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.user import User
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.menu_item import MenuItem

from app.schemas.order import OrderCreate

from app.models.restaurant import Restaurant
from app.models.cart import Cart

from sqlalchemy import func
from datetime import datetime, timedelta

TOTAL_CHEFS = 1

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ AUTO ASSIGN ORDERS TO AVAILABLE CHEFS
def assign_orders_to_chefs(db: Session, restaurant_id: int):

    # Count preparing orders
    preparing_count = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "preparing"
    ).count()

    available_chefs = TOTAL_CHEFS - preparing_count

    if available_chefs <= 0:
        return

    # FIFO queue orders
    queue_orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "accepted"
    ).order_by(Order.created_at.asc()).limit(available_chefs).all()

    for order in queue_orders:
        order.status = "preparing"

    db.commit()

# ✅ PLACE ORDER
@router.post("/create")
def create_order(
    data: OrderCreate,
    db: Session = Depends(get_db)
):
    
    user = db.query(User).filter(
        User.id == data.user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    restaurant = db.query(Restaurant).filter(
        Restaurant.id == data.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    total = 0

    if len(data.items) == 0:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    # calculate total
    for item in data.items:

        menu_item = db.query(MenuItem).filter(
            MenuItem.id == item.menu_item_id
        ).first()

        if not menu_item:
            raise HTTPException(
                status_code=404,
                detail=f"Menu item {item.menu_item_id} not found"
            )
        
        if menu_item.restaurant_id != data.restaurant_id:
            raise HTTPException(
                status_code=400,
                detail="Menu item does not belong to this restaurant"
            )

        total += float(menu_item.price) * item.quantity

    # create main order
    order = Order(
        user_id=data.user_id,
        restaurant_id=data.restaurant_id,
        total_amount=total,
        status="pending"
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    # create order items
    for item in data.items:

        menu_item = db.query(MenuItem).filter(
            MenuItem.id == item.menu_item_id
        ).first()

        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity,
            price=float(menu_item.price)
        )

        db.add(order_item)

    db.commit()
    db.refresh(order)

    # ✅ CLEAR USER CART
    db.query(Cart).filter(
        Cart.user_id == data.user_id
    ).delete()

    db.commit()

    return {
        "message": "Order placed successfully",
        "order_id": order.id,
        "total_amount": total
    }




# ✅ UPDATE ORDER STATUS
@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    valid_statuses = [
        "pending",
        "accepted",
        "preparing",
        "completed",
        "rejected"
    ]

    if status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # update current order
    order.status = status

    db.commit()
    db.refresh(order)

    # ✅ AUTO ASSIGN ORDERS TO CHEFS
    assign_orders_to_chefs(
        db,
        order.restaurant_id
    )

    return {
        "message": "Order status updated",
        "status": status
    }


# ✅ GET ALL RESTAURANT ORDERS
@router.get("/restaurant/{restaurant_id}")
def get_restaurant_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id
    ).order_by(Order.created_at.desc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity
                }
                for item in order.items
            ]
        }
        for order in orders
    ]

# ✅ GET QUEUE ORDERS
@router.get("/restaurant/{restaurant_id}/queue")
def get_queue_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "accepted"
    ).order_by(Order.created_at.asc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity
                }
                for item in order.items
            ]
        }
        for order in orders
    ]


# ✅ GET ACTIVE KITCHEN ORDERS
@router.get("/restaurant/{restaurant_id}/active")
def get_active_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    # ✅ AUTO ASSIGN BEFORE FETCHING
    assign_orders_to_chefs(
        db,
        restaurant_id
    )

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "preparing"
    ).order_by(Order.created_at.desc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity
                }
                for item in order.items
            ]
        }
        for order in orders
    ]


# ✅ GET PENDING ORDERS
@router.get("/restaurant/{restaurant_id}/pending")
def get_pending_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "pending"
    ).order_by(Order.created_at.desc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity
                }
                for item in order.items
            ]
        }
        for order in orders
    ]


# ✅ GET CHEF STATUS
@router.get("/restaurant/{restaurant_id}/chef-status")
def get_chef_status(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    preparing_orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "preparing"
    ).count()

    available_chefs = TOTAL_CHEFS - preparing_orders

    return {
        "total_chefs": TOTAL_CHEFS,
        "busy_chefs": preparing_orders,
        "available_chefs": max(available_chefs, 0)
    }

# ✅ GET USER ORDERS
@router.get("/user/{user_id}")
def get_user_orders(
    user_id: str,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.user_id == user_id
    ).order_by(Order.created_at.desc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity,
                    "price": item.price
                }
                for item in order.items
            ]
        }
        for order in orders
    ]

# ✅ GET SINGLE ORDER
@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
    "order_id": order.id,
    "status": order.status,
    "total": order.total_amount,
    "created_at": order.created_at,
    "items": [
        {
            "name": item.menu_item.name,
            "qty": item.quantity,
            "price": item.price
        }
        for item in order.items
    ]
}

# ✅ GET COMPLETED ORDERS
@router.get("/restaurant/{restaurant_id}/completed")
def get_completed_orders(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id,
        Order.status == "completed"
    ).order_by(Order.created_at.desc()).all()

    return [
        {
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "created_at": order.created_at,
            "items": [
                {
                    "name": item.menu_item.name,
                    "qty": item.quantity
                }
                for item in order.items
            ]
        }
        for order in orders
    ]

# ✅ RESTAURANT ANALYTICS
@router.get("/restaurant/{restaurant_id}/analytics")
def get_restaurant_analytics(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    today = datetime.utcnow().date()

    orders = db.query(Order).filter(
        Order.restaurant_id == restaurant_id
    ).all()

    today_orders = [
        order for order in orders
        if order.created_at.date() == today
    ]

    total_orders = len(today_orders)

    completed_orders = [
        order for order in today_orders
        if order.status == "completed"
    ]

    active_orders = [
        order for order in today_orders
        if order.status == "preparing"
    ]

    queue_orders = [
        order for order in today_orders
        if order.status == "accepted"
    ]

    total_sales = sum(
        float(order.total_amount)
        for order in completed_orders
    )

    # TOP ITEMS
    item_stats = {}

    for order in completed_orders:

        for item in order.items:

            item_name = item.menu_item.name

            if item_name not in item_stats:
                item_stats[item_name] = 0

            item_stats[item_name] += item.quantity

    top_items = []

    for name, qty in item_stats.items():

        top_items.append({
            "name": name,
            "qty": qty
        })

    top_items = sorted(
        top_items,
        key=lambda x: x["qty"],
        reverse=True
    )

    return {
        "total_orders": total_orders,
        "completed_orders": len(completed_orders),
        "active_orders": len(active_orders),
        "queue_orders": len(queue_orders),
        "today_sales": total_sales,
        "top_items": top_items[:5]
    }