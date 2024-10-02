import { Header } from "../components/Header";
import { getProducts } from "../services/product";
import { Product as ProductInterface } from "../interfaces/product";
import { useUser } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import { addFavoriteProduct, removeFavoriteProduct } from "../services/user";
import { getUserFavoriteProducts } from "../services/orchestrator";
import Product from "../components/Product";

export default function HomePage() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const cartContext = useContext(CartContext);
  const addToCart = (product: ProductInterface) => {
    const cartItem = { ...product, quantity: 0 };
    cartContext?.addToCart(cartItem);
  };

  const { id } = useUser();
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favorites = await getUserFavoriteProducts(id.toString());
        const favoriteIds = favorites.favoriteProducts.map((p) => p.product_id);
        setFavoriteProducts(favoriteIds);

        localStorage.setItem(
          `favoriteProducts_${id}`,
          JSON.stringify(favoriteIds)
        );
      } catch (error) {
        console.error("Error fetching favorite products", error);

        const storedFavorites = localStorage.getItem(`favoriteProducts_${id}`);
        if (storedFavorites) {
          setFavoriteProducts(JSON.parse(storedFavorites));
        }
      }
    }
    fetchFavorites();
  }, [id]);

  const handleAddFavorite = async (productId: string) => {
    try {
      await addFavoriteProduct(id, productId);
      setFavoriteProducts((prev) => [...prev, productId]);

      localStorage.setItem(
        `favoriteProducts_${id}`,
        JSON.stringify([...favoriteProducts, productId])
      );
    } catch (error) {
      console.error("Error adding product to favorites", error);
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    try {
      await removeFavoriteProduct(id, productId);
      const updatedFavorites = favoriteProducts.filter(
        (favId) => favId !== productId
      );
      setFavoriteProducts(updatedFavorites);

      localStorage.setItem(
        `favoriteProducts_${id}`,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Error removing product from favorites", error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-medium mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
                isFavorite={favoriteProducts.includes(product.id)}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </main>
    </div>
  );
}
