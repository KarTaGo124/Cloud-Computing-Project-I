import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Login() {
	const { setUser } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();

		const userId = "1";
		const userEmail = "user@example.com";

		setUser({ id: userId, email: userEmail });

		navigate("/home");
	};

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-3xl font-medium mb-6 text-center">Login</h1>
				<form className="space-y-6" onSubmit={handleLogin}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-2"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
						>
							Log in
						</button>
					</div>
				</form>
				<div className="mt-4 text-center">
					<Link
						to="/register"
						className="text-blue-400 hover:underline"
					>
						Don't have an account? Register here
					</Link>
				</div>
			</div>
		</div>
	);
}
