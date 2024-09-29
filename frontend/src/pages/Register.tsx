import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/user";
import { useUser } from "../contexts/UserContext";

export default function Register() {
	const navigate = useNavigate();
	const { setUser } = useUser();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}

		try {
			const userData = await register(
				formData.username,
				formData.email,
				formData.password
			);
			setUser({ id: userData.id, email: userData.email });
			navigate("/home");
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<>
			<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto flex items-center justify-center">
				<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
					<h1 className="text-3xl font-medium mb-6 text-center">
						Register
					</h1>
					{errorMessage && (
						<p className="text-red-500 text-center mb-4">
							{errorMessage}
						</p>
					)}
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium mb-2"
							>
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								value={formData.username}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium mb-2"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
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
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium mb-2"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<button
								type="submit"
								className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Register
							</button>
						</div>
					</form>
					<div className="mt-4 text-center">
						<Link
							to="/login"
							className="text-blue-400 hover:underline"
						>
							Already have an account? Log in here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
