from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import SessionLocal

from app.models.restaurant_merchant import RestaurantMerchant
from app.models.restaurant import Restaurant

from app.schemas.merchant import MerchantRegisterRequest, MerchantLoginRequest, MerchantRestaurantRegisterRequest

from app.core.security import hash_password, verify_password, create_access_token

from app.core.dependencies import get_current_merchant

import uuid

router = APIRouter(prefix="/auth/merchant", tags=["Merchant Auth"])


# =========================
# DB Dependency
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# REGISTER (Merchant + Restaurant)
# =========================
@router.post("/register")
def register_merchant(data: MerchantRestaurantRegisterRequest, db: Session = Depends(get_db)):

    # 🔹 check email already exists
    existing = db.query(RestaurantMerchant).filter(RestaurantMerchant.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 🔹 create merchant
    merchant = RestaurantMerchant(
        id=str(uuid.uuid4()),
        name=data.owner_name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password)
    )

    db.add(merchant)
    db.flush()   # 👈 important (id generate karne ke liye)

    # 🔹 create restaurant linked to merchant
    restaurant = Restaurant(
        name=data.shop_name,
        address=data.shop_address,
        city=data.city,
        state=data.state,
        pincode=data.pincode,
        phone=data.phone,
        id_type=data.id_type,
        gst=data.gst,
        merchant_id=merchant.id
    )

    db.add(restaurant)

    db.commit()
    db.refresh(merchant)
    db.refresh(restaurant)

    return {
        "message": "Merchant & Restaurant registered successfully",
        "merchant": {
            "id": merchant.id,
            "name": merchant.name,
            "email": merchant.email
        },
        "restaurant": {
            "id": restaurant.id,
            "name": restaurant.name
        }
    }


# =========================
# LOGIN
# =========================
@router.post("/login")
def login_merchant(data: MerchantLoginRequest, db: Session = Depends(get_db)):

    merchant = db.query(RestaurantMerchant).filter(
        or_(
            RestaurantMerchant.email == data.email_or_phone,
            RestaurantMerchant.phone == data.email_or_phone
        )
    ).first()

    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")

    if not verify_password(data.password, merchant.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": merchant.id,
        "role": "merchant"
    })
    restaurant = db.query(Restaurant).filter(
        Restaurant.merchant_id == merchant.id
    ).first()

    return {
        "access_token": token,
        "token_type": "bearer",
        "merchant": {
            "id": merchant.id,
            "name": merchant.name,
            "email": merchant.email,
            "restaurant_id": restaurant.id if restaurant else None
        }
    }


@router.get("/me")
def get_my_profile(current_merchant = Depends(get_current_merchant)):
    return {
        "id": current_merchant.id,
        "name": current_merchant.name,
        "email": current_merchant.email
    }