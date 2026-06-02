from fastapi import APIRouter, Depends, HTTPException, Query, File, UploadFile
import shutil
import os
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.restaurant import Restaurant
from app.models.restaurant_merchant import RestaurantMerchant
from app.schemas.profile import ProfileResponse, ProfileUpdate

router = APIRouter(prefix="/profile", tags=["Profile"])


# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ GET PROFILE DATA
@router.get("/", response_model=ProfileResponse)
def get_profile(
    identifier: str = Query(...),  # phone ya email dono
    db: Session = Depends(get_db)
):
    
    # 🔥 check email hai ya phone
    if "@" in identifier:
        merchant = db.query(RestaurantMerchant).filter(
            RestaurantMerchant.email == identifier
        ).first()
    else:
        merchant = db.query(RestaurantMerchant).filter(
            RestaurantMerchant.phone == identifier
        ).first()

    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")

    restaurant = db.query(Restaurant).filter(
        Restaurant.merchant_id == merchant.id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    print("FETCHED RESTAURANT ID:", restaurant.id)
    print("FETCHED PROFILE:", restaurant.profile_url)

    return {
        "ownerName": merchant.name,
        "phone": merchant.phone,
        "email": merchant.email,
        "shopName": restaurant.name,
        "address": restaurant.address,
        "state": restaurant.state,
        "city": restaurant.city,
        "pincode": restaurant.pincode,
        "gst": restaurant.gst,
        "profile_url": restaurant.profile_url
    }


@router.put("/", tags=["Profile"])
def update_profile(
    identifier: str,
    data: ProfileUpdate,
    db: Session = Depends(get_db)
):

    # 🔍 find merchant
    if "@" in identifier:
        merchant = db.query(RestaurantMerchant).filter(
            RestaurantMerchant.email == identifier
        ).first()
    else:
        merchant = db.query(RestaurantMerchant).filter(
            RestaurantMerchant.phone == identifier
        ).first()

    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")

    # 🔍 find restaurant
    restaurant = db.query(Restaurant).filter(
        Restaurant.merchant_id == merchant.id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # ✅ UPDATE DATA
    merchant.name = data.ownerName
    merchant.email = data.email

    restaurant.name = data.shopName
    restaurant.address = data.address
    restaurant.state = data.state
    restaurant.city = data.city
    restaurant.pincode = data.pincode
    restaurant.gst = data.gst

    db.commit()

    return {"message": "Profile updated successfully"}


UPLOAD_DIR = "media/profile_images"

@router.put("/upload-image")
def upload_profile_image(
    identifier: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 🔍 user find karo
    merchant = db.query(RestaurantMerchant).filter(
        (RestaurantMerchant.email == identifier) |
        (RestaurantMerchant.phone == identifier)
    ).first()

    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")

    restaurant = db.query(Restaurant).filter(
        Restaurant.merchant_id == merchant.id
    ).first()

    # 📁 folder create if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # 🖼 unique filename
    filename = f"{merchant.id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # 💾 save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🗄 DB update
    restaurant.profile_url = filename
    db.commit()

    print("UPDATED RESTAURANT ID:", restaurant.id)
    print("SAVED PROFILE:", restaurant.profile_url)

    return {"msg": "Image uploaded", "profile_url": filename}