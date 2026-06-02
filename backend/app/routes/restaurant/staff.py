from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.staff import Staff
from app.schemas.staff import StaffCreate, StaffResponse, StaffUpdate
from app.core.dependencies import get_current_merchant  # your auth function

router = APIRouter(prefix="/restaurant/staff", tags=["Restaurant Staff"])


@router.post("/", response_model=StaffResponse)
def create_staff(
    payload: StaffCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_merchant)
):
    new_staff = Staff(
        merchant_id=current_user.id,  # 🔥 from token
        name=payload.name,
        phone=payload.phone,
        role=payload.role
    )

    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)

    return new_staff

@router.get("/", response_model=list[StaffResponse])
def get_staff(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_merchant)
):
    staff_list = db.query(Staff).filter(
        Staff.merchant_id == current_user.id
    ).all()

    return staff_list


@router.put("/{staff_id}", response_model=StaffResponse)
def update_staff(
    staff_id: int,
    payload: StaffUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_merchant)
):
    staff = db.query(Staff).filter(
        Staff.id == staff_id,
        Staff.merchant_id == current_user.id
    ).first()

    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    # update fields
    staff.name = payload.name or staff.name
    staff.phone = payload.phone or staff.phone
    staff.role = payload.role or staff.role

    db.commit()
    db.refresh(staff)

    return staff


@router.delete("/{staff_id}")
def delete_staff(
    staff_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_merchant)
):
    staff = db.query(Staff).filter(
        Staff.id == staff_id,
        Staff.merchant_id == current_user.id
    ).first()

    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    db.delete(staff)
    db.commit()

    return {"message": "Staff deleted successfully"}


@router.patch("/{staff_id}/toggle", response_model=StaffResponse)
def toggle_staff(
    staff_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_merchant)
):
    staff = db.query(Staff).filter(
        Staff.id == staff_id,
        Staff.merchant_id == current_user.id
    ).first()

    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    staff.is_active = not staff.is_active

    db.commit()
    db.refresh(staff)

    return staff