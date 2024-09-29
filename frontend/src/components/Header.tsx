// Header.tsx
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useNavigate } from "react-router";

interface HeaderProps {
	id: string;
}

export const Header: React.FC<HeaderProps> = ({ id }) => {
	console.log(id);
	const navigate = useNavigate();
	return (
		<header className="bg-gray-800 shadow-md">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<Link
					href="/home"
					className="text-2xl font-medium text-gray-100"
				>
					<h1 className="text-2xl font-medium">My Store</h1>
				</Link>
				<nav className="flex items-center space-x-4">
					<button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
						<ShoppingCart className="h-6 w-6" />
						<span className="sr-only">Cart</span>
					</button>
					<div
						onClick={() => navigate(`/profile/${id}`)}
						className="p-2 rounded-full hover:bg-gray-700 transition-colors"
					>
						<User className="h-6 w-6" />
						<span className="sr-only">Profile</span>
					</div>
				</nav>
			</div>
		</header>
	);
};
