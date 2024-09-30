import axios from "axios";
import { Order, OrderProduct } from "../interfaces/order";

const baseUrl = "http://localhost:8000";

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
