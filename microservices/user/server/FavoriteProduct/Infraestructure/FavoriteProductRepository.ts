import pool from "../../config/db";

const findFavoriteProductsByUserId = async (userId: string) => {
	const [res] = await pool.query(
		"SELECT * FROM favProduct WHERE user_id = ?",
		[userId]
	);
	return res;
};

const createFavoriteProduct = async (userId: number, productId: string) => {
	const [res] = await pool.query(
		"INSERT INTO favProduct (user_id, product_id) VALUES (?, ?)",
		[userId, productId]
	);
};

const deleteFavoriteProduct = async (userId: string, productId: string) => {
	await pool.query(
		"DELETE FROM favProduct WHERE user_id = ? AND product_id = ?",
		[userId, productId]
	);
};

export default {
	findFavoriteProductsByUserId,
	createFavoriteProduct,
	deleteFavoriteProduct,
};
