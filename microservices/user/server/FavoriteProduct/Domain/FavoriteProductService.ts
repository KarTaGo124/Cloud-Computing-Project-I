import { parse } from "path";
import FavoriteProductRepository from "../Infraestructure/FavoriteProductRepository";

const getFavoriteProductsByUserId = async (userId: string) => {
	const favoriteProducts =
		await FavoriteProductRepository.findFavoriteProductsByUserId(userId);
	return favoriteProducts;
};

const addFavoriteProduct = async (userId: string, productId: string) => {
	await FavoriteProductRepository.createFavoriteProduct(
		parseInt(userId),
		productId
	);
};

const removeFavoriteProduct = async (userId: string, productId: string) => {
	await FavoriteProductRepository.deleteFavoriteProduct(userId, productId);
};

export default {
	getFavoriteProductsByUserId,
	addFavoriteProduct,
	removeFavoriteProduct,
};
