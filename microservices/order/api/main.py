from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import List, Annotated,Tuple
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class OrderBase(BaseModel):
    id: int
    customer_id: int
    products: List[Tuple[int,int]]
    status: int
    order_date: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/orders/")
async def create_order(order: OrderBase, db: db_dependency):
    db_order = models.Order(id=order.id, customer_id=order.customer_id, status=order.status, order_date=order.order_date)
    db.add(db_order)
    db.commit() 
    db.refresh(db_order)
    for(product_id, quantity) in order.products:
        db_product_order = models.OrderProduct(order_id=db_order.id, product_id=product_id, quantity=quantity)
        db.add(db_product_order)
    db.commit()


# async  def read_root():
#     return {"Hello": "World"}

# @app.get("/orders/{customer_id}")


# @app.post("/orders/")

# @app.put("/orders/{order_id}")

# @app.delete("/orders/{order_id}")

# @app.get("/orders/{order_id}/status")

# @app.get("/orders/{order_id}/products")
