import axios from "axios";
import { Product } from "../interfaces/product";

const baseUrl = "http://54.242.26.176:8080/products";

export const getProducts = async (): Promise<Product[]> => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

export const getProductById = async (id: string): Promise<Product> => {
	try {
		const response = await axios.get(`${baseUrl}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching product with id ${id}:`, error);
		throw error;
	}
};
