import { ShoppingCart, User, LogOut, Package, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { CartItem } from "../interfaces/order";

export const Header: React.FC = () => {
	const navigate = useNavigate();
	const { id, setUser } = useUser();
	const { cartItems, addCart } = useContext(CartContext);
	const cartItemCount = cartItems.reduce(
		(total: number, item: CartItem) => total + item.quantity,
		0
	);

	const handleLogout = () => {
		setUser({ id: 0, email: "" });
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<header className="bg-gray-800 shadow-md">
			<div className="container mx-auto px-4 py-2 flex justify-between items-center">
				<h1
					className="text-2xl font-medium text-gray-100 cursor-pointer"
					onClick={() => navigate("/home")}
				>
					My Store
				</h1>
				<nav className="flex items-center space-x-4">
					{!id || id === 0 ? (
						<>
							<button
								onClick={() => navigate("/login")}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								Inicia Sesión
							</button>
							<button
								onClick={() => navigate("/register")}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								Registrate
							</button>
						</>
					) : (
						<>
							<button className="p-2 rounded-full hover:bg-gray-700 transition-colors relative">
								<ShoppingCart className="h-6 w-6" />
								<span className="sr-only">Cart</span>

								{cartItemCount > 0 && (
									<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
										{cartItemCount}
									</span>
								)}
							</button>
							<div
								onClick={() => navigate(`/profile/${id}`)}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								<User className="h-6 w-6" />
								<span className="sr-only">Profile</span>
							</div>
							<button
								onClick={() => navigate("/order/history")}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								<Package className="h-6 w-6" />
								<span className="sr-only">Order History</span>
							</button>
							<button
								onClick={() => navigate("/fav/products")}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								<Heart className="h-6 w-6" />
								<span className="sr-only">
									Favorite Products
								</span>
							</button>
							<button
								onClick={handleLogout}
								className="p-2 rounded-full hover:bg-gray-700 transition-colors"
							>
								<LogOut className="h-6 w-6" />
								<span className="sr-only">Logout</span>
							</button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
