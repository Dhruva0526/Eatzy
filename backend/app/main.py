from fastapi import FastAPI
from app.database import Base, engine
from app import models  # IMPORTANT: loads all models

from app.routes import auth, menu, order, user, restaurant

app = FastAPI(
    title="Eatzy API",
    version="1.0.0",
    description="Backend API for Eatzy food ordering platform"
)


# Create tables automatically (ONLY for non-Alembic setup)
Base.metadata.create_all(bind=engine)


# Root endpoint
@app.get("/")
def root():
    return {"message": "Eatzy API is running 🚀"}


# Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(menu.router, prefix="/menu", tags=["Menu"])
app.include_router(order.router, prefix="/order", tags=["Order"])
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(restaurant.router, prefix="/restaurants", tags=["Restaurants"])