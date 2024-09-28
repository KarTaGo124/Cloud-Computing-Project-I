import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Header } from '../components/Header';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  { id: 1, name: "Product 1", price: 19.99, image: "/placeholder.svg?height=400&width=400", description: "This is a detailed description of Product 1. It's an amazing product that you'll love!" },
  { id: 2, name: "Product 2", price: 29.99, image: "/placeholder.svg?height=400&width=400", description: "Product 2 is one of our best sellers. It's durable, efficient, and looks great!" },
  { id: 3, name: "Product 3", price: 39.99, image: "/placeholder.svg?height=400&width=400", description: "You won't believe the quality of Product 3. It's perfect for any occasion!" },
  { id: 4, name: "Product 4", price: 49.99, image: "/placeholder.svg?height=400&width=400", description: "Product 4 is the latest addition to our catalog. It's innovative and stylish!" },
  { id: 5, name: "Product 5", price: 59.99, image: "/placeholder.svg?height=400&width=400", description: "If you're looking for the best, look no further than Product 5. It's simply the best!" },
  { id: 6, name: "Product 6", price: 69.99, image: "/placeholder.svg?height=400&width=400", description: "Product 6 is our premium offering. It's for those who demand nothing but the finest." },
];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header id={id || ''} />
      <main className="container mx-auto px-4 py-8">
        <Link to="/home" className="inline-flex items-center text-blue-400 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
            <p className="text-2xl text-blue-400 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-300 mb-6">{product.description}</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}