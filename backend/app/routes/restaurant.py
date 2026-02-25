from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.restaurant import Restaurant
from pydantic import BaseModel
from typing import List, Optional
import uuid

router = APIRouter()

# -------------------------
# Pydantic Schemas
# -------------------------

class RestaurantCreate(BaseModel):
    name: str
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None


class RestaurantResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    address: Optional[str]
    phone: Optional[str]

    class Config:
        from_attributes = True


class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None


# -------------------------
# Create Restaurant
# -------------------------

@router.post("/", response_model=RestaurantResponse)
def create_restaurant(data: RestaurantCreate, db: Session = Depends(get_db)):
    new_restaurant = Restaurant(
        id=str(uuid.uuid4()),
        name=data.name,
        description=data.description,
        address=data.address,
        phone=data.phone
    )

    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)

    return new_restaurant


# -------------------------
# Get All Restaurants
# -------------------------

@router.get("/", response_model=List[RestaurantResponse])
def get_restaurants(db: Session = Depends(get_db)):
    return db.query(Restaurant).all()


# -------------------------
# Get Single Restaurant
# -------------------------

@router.get("/{restaurant_id}", response_model=RestaurantResponse)
def get_restaurant(restaurant_id: str, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    return restaurant


# -------------------------
# Update Restaurant
# -------------------------

@router.put("/{restaurant_id}", response_model=RestaurantResponse)
def update_restaurant(
    restaurant_id: str,
    data: RestaurantUpdate,
    db: Session = Depends(get_db)
):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    if data.name is not None:
        restaurant.name = data.name
    if data.description is not None:
        restaurant.description = data.description
    if data.address is not None:
        restaurant.address = data.address
    if data.phone is not None:
        restaurant.phone = data.phone

    db.commit()
    db.refresh(restaurant)

    return restaurant


# -------------------------
# Delete Restaurant
# -------------------------

@router.delete("/{restaurant_id}")
def delete_restaurant(restaurant_id: str, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    db.delete(restaurant)
    db.commit()

    return {"message": "Restaurant deleted successfully"}