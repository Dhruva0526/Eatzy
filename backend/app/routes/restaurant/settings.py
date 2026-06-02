from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.restaurant_settings import RestaurantSettings
from app.models.restaurant import Restaurant
from app.models.restaurant_merchant import RestaurantMerchant
from app.schemas.settings import SettingsUpdate

router = APIRouter(prefix="/settings", tags=["Settings"])


# ---------------- DB DEPENDENCY ---------------- #
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- HELPER FUNCTION ---------------- #
def format_settings(settings: RestaurantSettings):
    return {
        "id": settings.id,
        "restaurantId": settings.restaurantId,
        "acceptingOrders": settings.acceptingOrders,
        "busyMode": settings.busyMode,
        "prepTime": settings.prepTime,
        "openTime": settings.openTime,
        "closeTime": settings.closeTime,
        "orderAlert": settings.orderAlert,
        "ringtone": settings.ringtone,
        "notificationInterval": settings.notificationInterval,
        "autoAccept": settings.autoAccept,
    }


# ---------------- GET SETTINGS ---------------- #
@router.get("/{identifier}")
def get_settings(identifier: str, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(
        (Restaurant.phone == identifier) |
        (RestaurantMerchant.email == identifier)
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    settings = db.query(RestaurantSettings).filter(
        RestaurantSettings.restaurantId == restaurant.id
    ).first()

    if not settings:
        settings = RestaurantSettings(
            restaurantId=restaurant.id,
            acceptingOrders=True,
            busyMode=False,
            prepTime=20,
            openTime="10:00 AM",
            closeTime="10:00 PM",
            orderAlert=True,
            ringtone="Default Bell",
            notificationInterval="60 seconds",
            autoAccept=False
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return format_settings(settings)


# ---------------- UPDATE SETTINGS ---------------- #


@router.put("/{identifier}")
async def update_settings(
    identifier: str,
    data: SettingsUpdate,
    db: Session = Depends(get_db)
):
    print("REQUEST DATA:", data.dict(exclude_unset=True))

    # 1️⃣ Try by phone
    restaurant = db.query(Restaurant).filter(
        Restaurant.phone == identifier
    ).first()

    # 2️⃣ Try by email
    if not restaurant:
        merchant = db.query(RestaurantMerchant).filter(
            RestaurantMerchant.email == identifier
        ).first()
        print("MERCHANT RESTAURANTS:", merchant.restaurants)
        if merchant and merchant.restaurants:
            restaurant = merchant.restaurants[0]

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    settings = db.query(RestaurantSettings).filter(
        RestaurantSettings.restaurantId == restaurant.id
    ).first()

    if not settings:
        settings = RestaurantSettings(restaurantId=restaurant.id)
        db.add(settings)
        db.commit()
        db.refresh(settings)

    # ✅ update fields
    for key, value in data.dict(exclude_unset=True).items():
        setattr(settings, key, value)

    db.commit()
    db.refresh(settings)

    return {
        "msg": "Settings updated successfully",
        "settings": format_settings(settings)
    }

# ---------------- GET PROFILE ---------------- #
@router.get("/profile/{restaurantId}")
def get_profile(restaurantId: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(
        Restaurant.id == restaurantId
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "email": restaurant.email,
        "phone": restaurant.phone,
        "address": restaurant.address,
        "image": restaurant.image_url
    }