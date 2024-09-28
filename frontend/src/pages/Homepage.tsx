import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../contexts/UserContext";
import { Header } from "../components/Header";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Product 4",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Product 5",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Product 6",
    price: 69.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function Homepage() {
  const { id, email } = useUser();
  console.log(id, email);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
        <Header id={id} />
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-medium mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="block"
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
