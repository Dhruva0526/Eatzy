from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.order import Order
import uuid

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
def create_order(user_id: str, restaurant_id: str, total_amount: float, db: Session = Depends(get_db)):

    order = Order(
        id=str(uuid.uuid4()),
        user_id=user_id,
        restaurant_id=restaurant_id,
        total_amount=total_amount,
        status="pending"
    )

    db.add(order)
    db.commit()

    return {"message": "Order placed successfully"}