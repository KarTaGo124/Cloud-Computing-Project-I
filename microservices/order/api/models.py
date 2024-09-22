from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from database import Base

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer) # ForeignKey("customers.id")
    status = Column(Integer, default=0)
    order_date = Column(DateTime)
    creation_date = Column(DateTime)


class OrderProduct(Base):
    __tablename__ = "order_products"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer) # ForeignKey("products.id")
    quantity = Column(Integer)

