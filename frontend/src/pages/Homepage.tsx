import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { getProducts } from "../services/product";
import { Product } from "../interfaces/product";

export default function Homepage() {
	const [products, setProducts] = useState<Product[]>([]);

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

	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
				<Header id="" />
				<main className="container mx-auto px-4 py-8">
					<h2 className="text-3xl font-medium mb-8">
						Featured Products
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.length > 0 ? (
							products.map((product) => (
								<Link
									href={`/product/${product.id}`}
									key={product.id}
									className="block"
								>
									<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
										<img
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
											<button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
												View Details
											</button>
										</div>
									</div>
								</Link>
							))
						) : (
							<p>No products available</p>
						)}
					</div>
				</main>
			</div>
		</>
	);
}
