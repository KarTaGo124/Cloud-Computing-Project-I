import { parse } from "path";
import FavoriteProductRepository from "../Infraestructure/FavoriteProductRepository";

const getFavoriteProductWithId = async (id: string) => {
  const favoriteProduct =
    await FavoriteProductRepository.findFavoriteProductById(id);

  if (!favoriteProduct) {
    throw new Error("Favorite product not found");
  }
  return favoriteProduct;
};

const addFavoriteProduct = async (userId: string, productId: string) => {
  await FavoriteProductRepository.createFavoriteProduct(
    parseInt(userId),
    parseInt(productId)
  );
};

const removeFavoriteProduct = async (userId: string, productId: string) => {
  await FavoriteProductRepository.deleteFavoriteProduct(userId, productId);
};

export default {
  getFavoriteProductWithId,
  addFavoriteProduct,
  removeFavoriteProduct,
};
