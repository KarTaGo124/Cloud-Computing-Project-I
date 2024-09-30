import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./components/Product";
import Profile from "./pages/Profile";
import EditProfilePage from "./pages/EditProfile";
import { UserProvider } from "./contexts/UserContext";
import OrderHistory from "./pages/OrderHistory";

function App() {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/home" element={<Homepage />} />
					<Route path="/products/:id" element={<Product />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route
						path="/profile/edit/:id"
						element={<EditProfilePage />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<Navigate to="/home" replace />} />
					<Route path="/order/history" element={<OrderHistory />} />
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
