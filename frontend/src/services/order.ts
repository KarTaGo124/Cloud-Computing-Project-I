import axios from "axios";
import { CartItem, Order, OrderItem, OrderProduct } from "../interfaces/order";

const baseUrl =
  "http://lb-parcial-1639907826.us-east-1.elb.amazonaws.com:8000/api-order";

export const postOrder = async (customer_id: number, products: CartItem[]) => {
  try {
    const order: OrderItem = {
      customer_id: customer_id,
      products: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
      order_date: new Date(),
    };
    const res = await axios.post(`${baseUrl}/orders`, order);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteOrder = async (order_id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/orders/${order_id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const getAllOrders = async (user_id: number): Promise<Order[]> => {
  try {
    const res = await axios.get(`${baseUrl}/orders/customer/${user_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getAllOrdersProducts = async (
  order_id: number
): Promise<OrderProduct[]> => {
  try {
    const res = await axios.get(`${baseUrl}/orders/${order_id}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching order products:", error);
    throw error;
  }
};
