from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.address import Address
from app.models.user import User
from app.schemas.address import (
    AddressCreate,
    AddressUpdate,
    AddressResponse
)
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/addresses", tags=["Addresses"])


# GET ALL
@router.get("/", response_model=list[AddressResponse])
def get_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Address).filter(
        Address.user_id == current_user.id
    ).all()


# CREATE
@router.post("/", response_model=AddressResponse)
def create_address(
    data: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    old_default = db.query(Address).filter(
        Address.user_id == current_user.id,
        Address.is_default == True
    ).first()

    address = Address(
        user_id=current_user.id,
        label=data.label,
        address=data.address,
        city=data.city,
        pincode=data.pincode,
        is_default=old_default is None
    )

    db.add(address)
    db.commit()
    db.refresh(address)

    return address


# UPDATE
@router.put("/{address_id}", response_model=AddressResponse)
def update_address(
    address_id: str,
    data: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    address = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == current_user.id
    ).first()

    if not address:
        raise HTTPException(404, "Address not found")

    if data.label is not None:
        address.label = data.label

    if data.address is not None:
        address.address = data.address

    if data.city is not None:
        address.city = data.city

    if data.pincode is not None:
        address.pincode = data.pincode

    if data.is_default:
        db.query(Address).filter(
            Address.user_id == current_user.id
        ).update({"is_default": False})

        address.is_default = True

    db.commit()
    db.refresh(address)

    return address


# DELETE
@router.delete("/{address_id}")
def delete_address(
    address_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    address = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == current_user.id
    ).first()

    if not address:
        raise HTTPException(404, "Address not found")

    db.delete(address)
    db.commit()

    return {"message": "Deleted"}