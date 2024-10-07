import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  Heart,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { CartItem } from "../interfaces/order";
import { getMonthlyUser } from "../services/order";
import { MonthlyUser } from "../interfaces/user";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { id, setUser } = useUser();
  const cardContext = useContext(CartContext);
  const cartItems = cardContext?.cartItems || [];
  const cartItemCount = cartItems.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );
  const [monthlyUser, setMonthlyUser] = useState<MonthlyUser | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setUser({ id: 0, email: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchMonthlyUser = async () => {
      try {
        const user = await getMonthlyUser();
        setMonthlyUser(user);
      } catch (error) {
        console.error("Error fetching monthly user:", error);
      }
    };

    fetchMonthlyUser();
  }, [showModal]);

  const closeModal = () => setShowModal(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1
            className="text-2xl font-medium text-gray-100 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Mure 2.0
          </h1>
          <nav className="flex items-center space-x-4">
            {!id || id === 0 ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleModal}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Crown className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="sr-only">Cart</span>

                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => navigate(`/profile/${id}`)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="sr-only">Profile</span>
                </button>
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
                  <span className="sr-only">Favorite Products</span>
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

      {/* Modal for Monthly User */}
      {showModal && monthlyUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-500 ease-in-out scale-110 opacity-100">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                🏆 User of the Month! 🏆
              </h2>
              <img
                src={"https://cataas.com/cat"}
                alt="User Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-gray-700">
                <strong>{monthlyUser.username}</strong> has placed{" "}
                <strong>{monthlyUser.orders}</strong> orders this month!
              </p>
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
