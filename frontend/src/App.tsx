import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfilePage from "./pages/EditProfile";
import { UserProvider } from "./contexts/UserContext";
import OrderHistory from "./pages/OrderHistory";
import { CartProvider } from "./contexts/CartContext";
import FavoriteProducts from "./pages/FavoriteProducts";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit/:id" element={<EditProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/order/history" element={<OrderHistory />} />
            <Route path="/fav/products" element={<FavoriteProducts />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
