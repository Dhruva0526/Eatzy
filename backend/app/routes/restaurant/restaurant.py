from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.restaurant import Restaurant
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])

# -------------------------
# Pydantic Schemas
# -------------------------

class RestaurantCreate(BaseModel):
    merchant_id: str

    name: str

    address: Optional[str] = None

    state: Optional[str] = None

    city: Optional[str] = None

    pincode: Optional[str] = None

    phone: Optional[str] = None

    gst: Optional[str] = None

    cuisine: Optional[str] = None

    category: Optional[str] = None

    rating: Optional[str] = "4.0"

    time: Optional[str] = "20-30 min"

    table_available: Optional[str] = "yes"


class RestaurantResponse(BaseModel):
    id: int

    merchant_id: str

    name: str

    address: Optional[str]

    state: Optional[str]

    city: Optional[str]

    pincode: Optional[str]

    phone: Optional[str]

    gst: Optional[str]

    cuisine: Optional[str]

    category: Optional[str]

    rating: Optional[str]

    time: Optional[str]

    table_available: Optional[str]

    class Config:
        from_attributes = True


class RestaurantUpdate(BaseModel):

    name: Optional[str] = None

    address: Optional[str] = None

    state: Optional[str] = None

    city: Optional[str] = None

    pincode: Optional[str] = None

    phone: Optional[str] = None

    gst: Optional[str] = None

    cuisine: Optional[str] = None

    category: Optional[str] = None

    rating: Optional[str] = None

    time: Optional[str] = None

    table_available: Optional[str] = None


# -------------------------
# Create Restaurant
# -------------------------

@router.post("/", response_model=RestaurantResponse)
def create_restaurant(data: RestaurantCreate, db: Session = Depends(get_db)):
    new_restaurant = Restaurant(
        merchant_id=data.merchant_id,

        name=data.name,

        address=data.address,

        state=data.state,

        city=data.city,

        pincode=data.pincode,

        phone=data.phone,

        gst=data.gst,

        cuisine=data.cuisine,

        category=data.category,

        rating=data.rating,

        time=data.time,

        table_available=data.table_available,
    )

    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)

    return new_restaurant


# -------------------------
# Get All Restaurants
# -------------------------

@router.get("/", response_model=List[RestaurantResponse])
def get_restaurants(
    city: str = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(Restaurant)

    if city:
        query = query.filter(
            Restaurant.city.ilike(city)
        )

    return query.all()

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

    if data.address is not None:
        restaurant.address = data.address

    if data.state is not None:
        restaurant.state = data.state

    if data.city is not None:
        restaurant.city = data.city

    if data.pincode is not None:
        restaurant.pincode = data.pincode

    if data.phone is not None:
        restaurant.phone = data.phone

    if data.gst is not None:
        restaurant.gst = data.gst
    
    if data.cuisine is not None:
        restaurant.cuisine = data.cuisine

    if data.category is not None:
        restaurant.category = data.category

    if data.rating is not None:
        restaurant.rating = data.rating

    if data.time is not None:
        restaurant.time = data.time

    if data.table_available is not None:
        restaurant.table_available = data.table_available

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