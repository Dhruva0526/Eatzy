from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

# ✅ import routers
from app.routes.auth.auth import router as auth_router
from app.routes.user.user import router as user_router
from app.routes.user.address import router as address_router
from app.routes.restaurant.restaurant import router as restaurant_router
from app.routes.order.order import router as order_router
from app.routes.auth.merchant_auth import router as merchant_router
from app.routes.restaurant import profile
from app.routes.restaurant import menu
from app.routes.restaurant import settings
from app.routes.restaurant import staff
from app.routes.cart.cart import router as cart_router
from app.routes.order import history
from app.routes.restaurant import orders
from app.routes.booking import table_booking


from app import models   # 🔥 IMPORTANT (ye models load karega)

app = FastAPI()

# ✅ CORS (IMPORTANT for mobile)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ include routers
app.include_router(auth_router)
app.include_router(merchant_router)
app.include_router(user_router)
app.include_router(address_router)
app.include_router(restaurant_router)
app.include_router(profile.router)
app.include_router(menu.router)
app.include_router(settings.router)
app.include_router(order_router)
app.include_router(staff.router)
app.include_router(cart_router)
app.include_router(history.router)
app.include_router(orders.router)
app.include_router(table_booking.router)



# optional test route
@app.get("/")
def root():
    return {"message": "Eatzy API running 🚀"}

os.makedirs("media/profile_images", exist_ok=True)

app.mount("/media", StaticFiles(directory="media"), name="media")