import axios from "axios";
import { OrderReceipt, UserFavoriteProducts } from "../interfaces/orchestrator"; // Importamos las interfaces

const baseUrl = "http://orchestrator:3000"; // Cambiamos la URL base

export const getOrderReceipt = async (
  orderId: string
): Promise<OrderReceipt> => {
  try {
    const response = await axios.get<OrderReceipt>(
      `${baseUrl}/orders/${orderId}/receipt`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching order receipt with id ${orderId}:`, error);
    throw error;
  }
};

export const getUserFavoriteProducts = async (
  userId: string
): Promise<UserFavoriteProducts> => {
  try {
    const response = await axios.get<UserFavoriteProducts>(
      `${baseUrl}/users/${userId}/favorites`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching favorite products for user with id ${userId}:`,
      error
    );
    throw error;
  }
};
