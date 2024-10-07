from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import func
import requests


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

class OrderProductBase(BaseModel):
    product_id: str
    quantity: int

class OrderBase(BaseModel):
    customer_id: int
    products: List[OrderProductBase]
    order_date: datetime

class OrderUpdate(BaseModel):
    status: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
    

@app.post("/orders/", tags=["Orders"])
async def create_order(order: OrderBase, db: db_dependency):
    db_order = models.Order(
        customer_id=order.customer_id,
        order_date=order.order_date
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    for product in order.products:
        db_product_order = models.OrderProduct(
            order_id=db_order.id,
            product_id=product.product_id,
            quantity=product.quantity
        )
        db.add(db_product_order)
    db.commit()
    return {"message": "Order created successfully", "order_id": db_order.id}

@app.get("/orders/{order_id}", tags=["Orders"])
async def get_order(order_id: int, db: db_dependency):
    result = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    return result

@app.get("/orders/customer/{customer_id}", tags=["Orders"])
async def get_customer_orders(customer_id: int, db: db_dependency):
    result = db.query(models.Order).filter(models.Order.customer_id == customer_id).all()
    if not result:
        raise HTTPException(status_code=404, detail="No orders found for this customer")
    return result

@app.put("/orders/{order_id}", tags=["Orders"])
async def update_order(order_id: int, order_update: OrderUpdate, db: db_dependency):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db_order.status = order_update.status
    db.commit()
    return {"message": "Order updated successfully"}

@app.delete("/orders/{order_id}", tags=["Orders"])
async def delete_order(order_id: int, db: db_dependency):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.query(models.OrderProduct).filter(models.OrderProduct.order_id == order_id).delete()
    
    db.delete(db_order)
    db.commit()
    return {"message": "Order and associated products deleted successfully"}


@app.get("/orders/{order_id}/status", tags=["Orders"])
async def get_order_status(order_id: int, db: db_dependency):
    result = db.query(models.Order.status).filter(models.Order.id == order_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"order_id": order_id, "status": result.status}

@app.get("/orders/{order_id}/products", tags=["Orders"])
async def get_order_products(order_id: int, db: db_dependency):
    result = db.query(models.OrderProduct).filter(models.OrderProduct.order_id == order_id).all()
    if not result:
        raise HTTPException(status_code=404, detail="No products found for this order")
    return result

@app.get("/orders/", tags=["Orders"])
async def get_all_orders(db: db_dependency):
    result = db.query(models.Order).all()
    return result

@app.get("/orders/status/{status}", tags=["Orders"])
async def get_orders_by_status(status: int, db: db_dependency):
    result = db.query(models.Order).filter(models.Order.status == status).all()
    if not result:
        raise HTTPException(status_code=404, detail="No orders found with this status")
    return result

@app.get("/orders/date/{date}", tags=["Orders"])
async def get_orders_by_date(date: str, db: db_dependency):
    try:
        parsed_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    result = db.query(models.Order).filter(func.date(models.Order.order_date) == parsed_date).all()
    if not result:
        raise HTTPException(status_code=404, detail="No orders found for this date")
    return result

@app.get("/orders/monthly/user", tags=["Customers"])
async def get_customer_with_most_orders(db: db_dependency):
    result = db.query(
        models.Order.customer_id,
        func.count(models.Order.id).label('order_count')
    ).group_by(
        models.Order.customer_id
    ).order_by(
        func.count(models.Order.id).desc()
    ).first()
    
    if not result:
        raise HTTPException(status_code=404, detail="No orders found")
    
    try:
        response = requests.get(f"http://user-backend:8081/users/{result.data.customer_id}")
        user_info = response.json()
        return {
            "username": user_info.username,
            "orders": result.order_count,
        }
    except ValueError:
            raise HTTPException(status_code=500, detail="Error fetching user info")