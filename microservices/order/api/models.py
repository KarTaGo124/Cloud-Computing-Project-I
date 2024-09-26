from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.schema import Identity
from database import Base

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)  # Auto-increment ID starting from 1
    customer_id = Column(Integer)  # ForeignKey("customers.id")
    status = Column(Integer, default=0)
    order_date = Column(DateTime)
    creation_date = Column(DateTime, default=func.now())  # Automatically set to current timestamp


class OrderProduct(Base):
    __tablename__ = "order_products"
    id = Column(Integer,primary_key=True, index=True)  # Auto-increment ID starting from 1
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer)  # ForeignKey("products.id")
    quantity = Column(Integer)
    creation_date = Column(DateTime, default=func.now())  # Automatically set to current timestamp
