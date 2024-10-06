import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUser } from "../contexts/UserContext";
import { getUserFavoriteProducts } from "../services/orchestrator";
import { useNavigate } from "react-router-dom";
import {
	UserFavoriteProducts,
	FavoriteProduct,
} from "../interfaces/orchestrator";

export default function FavoriteProducts() {
	const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
		[]
	);
	const { id } = useUser();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFavorites() {
			try {
				const data: UserFavoriteProducts =
					await getUserFavoriteProducts(id);
				setFavoriteProducts(data.favoriteProducts);
			} catch (error) {
				console.error("Error fetching favorite products:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchFavorites();
	}, [id]);

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<h2 className="text-3xl font-medium mb-8">
					My Favorite Products
				</h2>

				{loading ? (
					<p>Loading favorite products...</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{favoriteProducts.length > 0 ? (
							favoriteProducts.map((product) => (
								<div
									key={product.product_id}
									className="block cursor-pointer"
								>
									<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
										<img
											onClick={() =>
												navigate(
													`/products/${product.product_id}`
												)
											}
											src={product.imageUrl}
											alt={product.name}
											className="w-full h-48 object-cover"
										/>
										<div className="p-4">
											<h3 className="text-xl font-medium mb-2">
												{product.name}
											</h3>
											<p className="text-gray-400 mb-4">
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={() =>
													navigate(
														`/products/${product.product_id}`
													)
												}
												className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
											>
												View Details
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<p>No favorite products found</p>
						)}
					</div>
				)}
			</main>
		</div>
	);
}
