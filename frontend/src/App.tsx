import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./components/Product";
import Profile from "./pages/Profile";
import { UserProvider } from "./contexts/UserContext";
import OrderHistory from "./pages/OrderHistory";

function App() {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/home" element={<Homepage />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/order/history" element={<OrderHistory />} />
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
