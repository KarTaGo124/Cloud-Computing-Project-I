import { ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

interface HeaderProps {
	id: string;
}

export const Header: React.FC<HeaderProps> = ({ id }) => {
	const navigate = useNavigate();
	const { setUser } = useUser();

	const handleLogout = () => {
		setUser({ id: "", email: "" });

		navigate("/login");
	};

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
					<button
						onClick={handleLogout}
						className="p-2 rounded-full hover:bg-gray-700 transition-colors"
					>
						<LogOut className="h-6 w-6" />
						<span className="sr-only">Logout</span>
					</button>
				</nav>
			</div>
		</header>
	);
};
