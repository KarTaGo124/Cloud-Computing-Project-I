import pool from "../../config/db";

const findFavoriteProductById = async (id: string) => {
  const [result]: any = await pool.query(
    "SELECT * FROM favProduct WHERE user_id = ?",
    [id]
  );
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const createFavoriteProduct = async (userId: number, productId: number) => {
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
  findFavoriteProductById,
  createFavoriteProduct,
  deleteFavoriteProduct,
};
