import { Request, Response } from "express";
import FavoriteProductService from "../Domain/FavoriteProductService";

/**
 * @swagger
 * tags:
 *   name: FavoriteProduct
 *   description: FavoriteProduct management
 */

/**
 * @swagger
 * /favProducts/{userIdid}:
 *  get:
 *   summary: Get favorite products by User ID
 *  tags: [FavoriteProduct]
 * parameters:
 *  - in: path
 *   name: userId
 *  required: true
 * schema:
 * type: string
 * description: User ID
 * responses:
 * 200:
 * description: Favorite products found
 * 404:
 * description: Favorite products not found
 * 500:
 * description: Error getting favorite products
 *
 */
const getFavoriteProductsByUserId = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const favoriteProducts =
			await FavoriteProductService.getFavoriteProductsByUserId(userId);
		res.json(favoriteProducts);
	} catch (error) {
		res.status(404).json({ error: "Favorite product not found" });
	}
};

/**
 * @swagger
 * /favProducts/add/{userId}/{productId}:
 *   post:
 *     summary: Add a new favorite product
 *     tags: [FavoriteProduct]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       201:
 *         description: Favorite product added
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Error adding favorite product
 */
const addFavoriteProduct = async (req: Request, res: Response) => {
	try {
		const { userId, productId } = req.params;
		const favoriteProduct = await FavoriteProductService.addFavoriteProduct(
			userId,
			productId
		);
		res.json(favoriteProduct);
	} catch (error) {
		res.status(500).json({ error: "Error adding favorite product" });
	}
};

/**
 * @swagger
 * /favProducts/remove/{userId}/{productId}:
 *   delete:
 *     summary: Remove favorite product by ID
 *     tags: [FavoriteProduct]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Favorite product removed
 *       404:
 *         description: Favorite product not found
 */
const removeFavoriteProduct = async (req: Request, res: Response) => {
	try {
		const { userId, productId } = req.params;
		await FavoriteProductService.removeFavoriteProduct(userId, productId);
		res.json({ message: "Favorite product removed" });
	} catch (error) {
		res.status(404).json({ error: "Favorite product not found" });
	}
};

export default {
	getFavoriteProductsByUserId,
	addFavoriteProduct,
	removeFavoriteProduct,
};
