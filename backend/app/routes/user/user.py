from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user
from app.schemas.user import UserResponse, UserUpdate
from app.database import get_db
from app.models.user import User
from pydantic import BaseModel
from typing import List
import uuid

router = APIRouter(prefix="/users", tags=["Users"])

# -------------------------
# Pydantic Schemas
# -------------------------

# class UserResponse(BaseModel):
#     id: str
#     name: str
#     email: str
#     phone: str

#     class Config:
#         from_attributes = True


# class UserUpdate(BaseModel):
#     name: str | None = None
#     phone: str | None = None


# -------------------------
# Get All Users
# -------------------------




# -------------------------
# Get Single User
# -------------------------

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user 


# -------------------------
# Update User
# -------------------------

@router.put("/me", response_model=UserResponse)
def update_user(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_data.name is not None:
        current_user.name = user_data.name

    if user_data.email is not None:
        current_user.email = user_data.email

    db.commit()
    db.refresh(current_user)

    return current_user


# -------------------------
# Delete User
# -------------------------

@router.delete("/me")
def delete_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db.delete(current_user)
    db.commit()

    return {"message": "User deleted successfully"}