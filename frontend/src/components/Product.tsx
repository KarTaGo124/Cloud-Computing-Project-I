import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
import { Header } from "./Header";
import { Product } from "../interfaces/product";

export default function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		async function fetchProduct() {
			if (id) {
				try {
					const data = await getProductById(id);
					setProduct(data);
				} catch (error) {
					console.error(
						`Error fetching product with id ${id}:`,
						error
					);
				}
			}
		}

		fetchProduct();
	}, [id]);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
			<Header id={id || ""} />
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-medium mb-4">{product.name}</h1>
				<p className="text-gray-300 mb-6">{product.description}</p>
				<p className="text-2xl text-blue-400 mb-4">
					${product.price.toFixed(2)}
				</p>
				<p className="text-gray-300 mb-6">Stock: {product.stock}</p>
				<p className="text-gray-300 mb-6">
					Category:{" "}
					{product.category.name +
						" - " +
						product.category.description}
				</p>
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full rounded-lg shadow-lg"
				/>
			</main>
		</div>
	);
}
