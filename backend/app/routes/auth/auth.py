from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, SendOTPRequest, VerifyOTPRequest, CompleteProfileRequest
from app.schemas.user import UserResponse
from app.core.security import hash_password, verify_password, create_access_token
import random
from datetime import datetime, timedelta
from app.models.otp import OTP
import uuid

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @router.post("/register", response_model=UserResponse, status_code=201)
# def register(request: RegisterRequest, db: Session = Depends(get_db)):

#     if db.query(User).filter(User.email == request.email).first():
#         raise HTTPException(status_code=400, detail="Email already registered")

#     user = User(
#         id=str(uuid.uuid4()),
#         name=request.name,
#         email=request.email,
#         phone=request.phone,
#         password_hash=hash_password(request.password)
#     )

#     db.add(user)
#     db.commit()
#     db.refresh(user)

#     return user


# @router.post("/login")
# def login(request: LoginRequest, db: Session = Depends(get_db)):

#     user = db.query(User).filter(User.email == request.email).first()

#     if not user or not verify_password(request.password, user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     token = create_access_token({"sub": user.id})

#     return {
#         "access_token": token,
#         "token_type": "bearer",
#         "user": {
#             "id": user.id,
#             "name": user.name,
#             "email": user.email
#         }
#     }

@router.post("/customer/send-otp")
def send_otp(data: SendOTPRequest, db: Session = Depends(get_db)):

    phone = data.phone

    otp_code = str(random.randint(1000, 9999))

    new_otp = OTP(
        phone=phone,
        otp=otp_code
    )

    db.add(new_otp)
    db.commit()

    print("OTP:", otp_code)

    return {"message": "OTP sent successfully"}


@router.post("/customer/verify-otp")
def verify_otp(data: VerifyOTPRequest, db: Session = Depends(get_db)):

    phone = data.phone
    otp = data.otp

    print("PHONE:", phone)

    # 🔹 get latest OTP
    record = db.query(OTP)\
    .filter(OTP.phone == phone, OTP.otp == otp)\
    .first()

    if not record:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # 🔹 check OTP match
    if record.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # 🔹 expiry check (5 min)
    if datetime.utcnow() - record.created_at > timedelta(minutes=5):
        raise HTTPException(status_code=400, detail="OTP expired")

    # 🔹 check user exists
    user = db.query(User).filter(User.phone == phone).first()

    print("USER FOUND:", user)

    is_new_user = user is None

    # 🔹 delete OTP after verification
    db.delete(record)
    db.commit()

    # 🔹 token only for existing user
    token = None
    if not is_new_user:
        token = create_access_token({
            "sub": user.id,
            "role": "customer"
        })

    return {
        "access_token": token,          # ❗ new user ke liye null
        "is_new_user": is_new_user,
        "user": {
            "id": user.id if user else None,
            "phone": phone
        }
    }

@router.post("/customer/complete-profile")
def complete_profile(data: CompleteProfileRequest, db: Session = Depends(get_db)):

    # ❗ check if already exists (safety)
    existing = db.query(User).filter(User.phone == data.phone).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        id=str(uuid.uuid4()),
        name=data.name,
        phone=data.phone
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({
        "sub": user.id,
        "role": "customer"
    })

    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "phone": user.phone
        }
    }