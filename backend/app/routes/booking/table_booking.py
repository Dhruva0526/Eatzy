from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database import get_db

from app.core.security import decode_access_token

from app.models.restaurant import Restaurant

from app.models.table_booking import TableBooking
from typing import List

from app.models.table_booking_settings import (
    TableBookingSettings
)

from app.models.blackout_date import (
    BlackoutDate
)

from app.schemas.table_booking import (
    TableBookingSettingsUpdate,
    TableBookingSettingsResponse,
    BlackoutDateCreate,
    BlackoutDateResponse,
    TableBookingCreate,
    TableBookingResponse
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

router = APIRouter(
    prefix="/table-booking",
    tags=["Table Booking"]
)


def get_current_restaurant(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = decode_access_token(token)

    merchant_id = payload.get("sub")

    restaurant = db.query(Restaurant).filter(
        Restaurant.merchant_id == merchant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    return restaurant


# GET SETTINGS

@router.get(
    "/settings",
    response_model=TableBookingSettingsResponse
)
def get_booking_settings(
    db: Session = Depends(get_db),
    restaurant: Restaurant = Depends(
        get_current_restaurant
    )
):

    settings = db.query(
        TableBookingSettings
    ).filter(
        TableBookingSettings.restaurant_id
        == restaurant.id
    ).first()

    if not settings:

        settings = TableBookingSettings(
            restaurant_id=restaurant.id
        )

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return settings


# UPDATE SETTINGS

@router.put(
    "/settings",
    response_model=TableBookingSettingsResponse
)
def update_booking_settings(
    payload: TableBookingSettingsUpdate,
    db: Session = Depends(get_db),
    restaurant: Restaurant = Depends(
        get_current_restaurant
    )
):

    settings = db.query(
        TableBookingSettings
    ).filter(
        TableBookingSettings.restaurant_id
        == restaurant.id
    ).first()

    if not settings:

        settings = TableBookingSettings(
            restaurant_id=restaurant.id
        )

        db.add(settings)

    for key, value in payload.dict().items():
        setattr(settings, key, value)

    db.commit()

    db.refresh(settings)

    return settings


# GET BLACKOUT DATES

@router.get(
    "/blackout-dates",
    response_model=list[BlackoutDateResponse]
)
def get_blackout_dates(
    db: Session = Depends(get_db),
    restaurant: Restaurant = Depends(
        get_current_restaurant
    )
):

    return db.query(BlackoutDate).filter(
        BlackoutDate.restaurant_id
        == restaurant.id
    ).all()


# CREATE BLACKOUT DATE

@router.post(
    "/blackout-dates",
    response_model=BlackoutDateResponse
)
def create_blackout_date(
    payload: BlackoutDateCreate,
    db: Session = Depends(get_db),
    restaurant: Restaurant = Depends(
        get_current_restaurant
    )
):

    blackout = BlackoutDate(
        restaurant_id=restaurant.id,
        date=payload.date,
        reason=payload.reason
    )

    db.add(blackout)

    db.commit()

    db.refresh(blackout)

    return blackout


# DELETE BLACKOUT DATE

@router.delete(
    "/blackout-dates/{blackout_id}"
)
def delete_blackout_date(
    blackout_id: int,
    db: Session = Depends(get_db),
    restaurant: Restaurant = Depends(
        get_current_restaurant
    )
):

    blackout = db.query(BlackoutDate).filter(
        BlackoutDate.id == blackout_id,
        BlackoutDate.restaurant_id
        == restaurant.id
    ).first()

    if not blackout:
        raise HTTPException(
            status_code=404,
            detail="Blackout date not found"
        )

    db.delete(blackout)

    db.commit()

    return {
        "message": "Blackout date deleted"
    }


# ANALYTICS

@router.get("/analytics")
def get_booking_analytics():

    return {
        "today_bookings": 48,
        "weekly_bookings": 312,
        "occupancy_rate": 82,
        "peak_hours": "7 PM - 9 PM",
        "cancellation_rate": "8%"
    }

# GET BOOKINGS FOR RESTAURANT

@router.get("/restaurant/{restaurant_id}")
def get_restaurant_bookings(
    restaurant_id: int,
    db: Session = Depends(get_db)
):
    bookings = db.query(TableBooking).filter(
        TableBooking.restaurant_id == restaurant_id
    ).all()

    return bookings


@router.post(
    "/create",
    response_model=TableBookingResponse
)
def create_booking(
    payload: TableBookingCreate,
    db: Session = Depends(get_db)
):

    booking = TableBooking(
        user_id=payload.user_id,
        restaurant_id=payload.restaurant_id,
        booking_date=payload.booking_date,
        booking_time=payload.booking_time,
        people_count=payload.people_count
    )

    db.add(booking)

    db.commit()

    db.refresh(booking)

    return booking

@router.get(
    "/user/{user_id}",
    response_model=List[TableBookingResponse]
)
def get_user_bookings(
    user_id: str,
    db: Session = Depends(get_db)
):

    return db.query(
        TableBooking
    ).filter(
        TableBooking.user_id == user_id
    ).all()

@router.put(
    "/{booking_id}/status"
)
def update_booking_status(
    booking_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    booking = db.query(
        TableBooking
    ).filter(
        TableBooking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    booking.status = status

    db.commit()

    db.refresh(booking)

    return booking