from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import decode_token, decode_access_token, require_role
from app.database import get_db

from app.models.user import User
from app.models.restaurant_merchant import RestaurantMerchant

security = HTTPBearer()

# =========================
# CUSTOMER AUTH
# =========================
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = decode_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


# =========================
# MERCHANT AUTH (NEW 🔥)
# =========================
def get_current_merchant(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    print("DEPENDENCY HIT")
    token = credentials.credentials

    payload = decode_access_token(token)

    print("PAYLOAD:", payload)

    # 🔥 role check (important)
    require_role(payload, "merchant")

    merchant_id = payload.get("sub")

    merchant = db.query(RestaurantMerchant).filter(
        RestaurantMerchant.id == merchant_id
    ).first()

    if not merchant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Merchant not found"
        )

    return merchant