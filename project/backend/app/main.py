# FastAPI Backend Example
# This is a reference implementation - requires proper Python environment

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Optional
import jwt
import os
from datetime import datetime, timedelta
from passlib.context import CryptContext
from pydantic import BaseModel

app = FastAPI(title="E-commerce API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/ecommerce")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.get_database()

# JWT settings
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
security = HTTPBearer()

# Models
class Mart:
    def __init__(self, name: str, address: str, distance: str, rating: float):
        self.name = name
        self.address = address
        self.distance = distance
        self.rating = rating
        self.created_at = datetime.utcnow()

class Product:
    def __init__(self, name: str, price: float, image: str, category: str, mart_id: str):
        self.name = name
        self.price = price
        self.image = image
        self.category = category
        self.mart_id = mart_id
        self.created_at = datetime.utcnow()

class Order:
    def __init__(self, user_id: str, items: List[dict], total: float, payment_method: str):
        self.user_id = user_id
        self.items = items
        self.total = total
        self.payment_method = payment_method
        self.status = "pending"
        self.created_at = datetime.utcnow()

class CustomerRegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: str

class CustomerLoginRequest(BaseModel):
    email: str
    password: str

# Routes
@app.get("/")
async def root():
    return {"message": "E-commerce API"}

@app.get("/api/marts")
async def get_marts():
    """Get all marts"""
    marts = await db.marts.find().to_list(length=None)
    return [
        {
            "id": str(mart["_id"]),
            "name": mart["name"],
            "address": mart["address"],
            "distance": mart["distance"],
            "rating": mart["rating"]
        }
        for mart in marts
    ]

@app.get("/api/products/{mart_id}")
async def get_products(mart_id: str):
    """Get products for a specific mart"""
    products = await db.products.find({"mart_id": mart_id}).to_list(length=None)
    return [
        {
            "id": str(product["_id"]),
            "name": product["name"],
            "price": product["price"],
            "image": product["image"],
            "category": product["category"]
        }
        for product in products
    ]

@app.post("/api/orders")
async def create_order(order_data: dict):
    """Create a new order"""
    order = Order(
        user_id=order_data.get("user_id", "anonymous"),
        items=order_data["items"],
        total=order_data["total"],
        payment_method=order_data["payment_method"]
    )
    
    result = await db.orders.insert_one(order.__dict__)
    
    return {
        "id": str(result.inserted_id),
        "status": "created",
        "message": "Order created successfully"
    }

@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    """Get order details"""
    try:
        order = await db.orders.find_one({"_id": ObjectId(order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {
            "id": str(order["_id"]),
            "items": order["items"],
            "total": order["total"],
            "payment_method": order["payment_method"],
            "status": order["status"],
            "created_at": order["created_at"]
        }
    except:
        raise HTTPException(status_code=404, detail="Order not found")

@app.post("/api/customers/register")
async def customer_register(data: CustomerRegisterRequest):
    existing = await db.customers.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(data.password)
    customer = {
        "name": data.name,
        "email": data.email,
        "password": hashed_password,
        "phone": data.phone,
        "created_at": datetime.utcnow()
    }
    result = await db.customers.insert_one(customer)
    return {"id": str(result.inserted_id), "message": "Customer registered successfully"}

@app.post("/api/customers/login")
async def customer_login(data: CustomerLoginRequest):
    customer = await db.customers.find_one({"email": data.email})
    if not customer or not pwd_context.verify(data.password, customer["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = jwt.encode({"sub": str(customer["_id"]), "exp": datetime.utcnow() + timedelta(days=1)}, JWT_SECRET, algorithm="HS256")
    return {"token": token, "user": {"id": str(customer["_id"]), "email": customer["email"], "name": customer["name"]}}

# Initialize sample data
@app.on_event("startup")
async def startup_event():
    # Create sample marts
    sample_marts = [
        {
            "name": "FreshMart Downtown",
            "address": "123 Main St, Downtown",
            "distance": "0.5 km",
            "rating": 4.5
        },
        {
            "name": "QuickStop Express",
            "address": "456 Oak Ave, Midtown",
            "distance": "1.2 km",
            "rating": 4.2
        }
    ]
    
    # Insert sample data if not exists
    for mart in sample_marts:
        existing = await db.marts.find_one({"name": mart["name"]})
        if not existing:
            await db.marts.insert_one(mart)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)