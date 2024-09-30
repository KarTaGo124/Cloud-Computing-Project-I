import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { getProducts } from "../services/product";
import { Product } from "../interfaces/product";
import { useUser } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext, useEffect, useState } from "react";

export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const { id, email } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Contexto de usuario actualizado: ", { id, email });
  }, [id, email]);
  console.log("Carrito de compras actualizado: ", cartItems);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-medium mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="block cursor-pointer">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <img
                    onClick={() => navigate(`/products/${product.id}`)}
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex gap-x-2">
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </main>
    </div>
  );
}
