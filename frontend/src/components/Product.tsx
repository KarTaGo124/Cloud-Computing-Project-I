import { Product as ProductInterface } from "../interfaces/product";
import { useNavigate } from "react-router-dom";

interface ProductProps {
	product: ProductInterface;
	isFavorite: boolean;
	handleAddFavorite: (productId: string) => void;
	handleRemoveFavorite: (productId: string) => void;
	addToCart: (product: ProductInterface) => void;
}

export default function Product({
	product,
	isFavorite,
	handleAddFavorite,
	handleRemoveFavorite,
	addToCart,
}: ProductProps) {
	const navigate = useNavigate();

	return (
		<div className="block cursor-pointer">
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
						{isFavorite ? (
							<button
								className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
								onClick={() => handleRemoveFavorite(product.id)}
							>
								Remove from Favorites
							</button>
						) : (
							<button
								className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
								onClick={() => handleAddFavorite(product.id)}
							>
								Add to Favorites
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
