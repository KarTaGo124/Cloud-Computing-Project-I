import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { getUserProfileById, getUserById, deleteUser } from "../services/user";
import { UserProfile, User } from "../interfaces/user";

export default function Profile() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (id) {
			const fetchProfileAndUser = async () => {
				try {
					const userProfile = await getUserProfileById(Number(id));
					const userData = await getUserById(Number(id));
					setProfile(userProfile);
					setUser(userData);
				} catch (error) {
					console.error(
						"Error fetching profile and user data:",
						error
					);
				}
			};

			fetchProfileAndUser();
		}
	}, [id]);

	if (!profile || !user) {
		return (
			<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto flex items-center justify-center">
				<p>Loading profile...</p>
			</div>
		);
	}

	const handleDeleteProfile = async () => {
		try {
			await deleteUser(Number(id));
			navigate("/login");
		} catch (error) {
			console.error("Error deleting profile:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
					<div className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h1 className="text-3xl font-medium">
								User Profile
							</h1>
							<div className="flex space-x-4">
								<button
									onClick={() =>
										navigate(`/profile/edit/${id}`)
									}
									className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
								>
									<Edit className="h-4 w-4 mr-2" />
									Edit Profile
								</button>
								<button
									onClick={handleDeleteProfile}
									className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
								>
									<Delete className="h-4 w-4 mr-2" />
									Delete Profile
								</button>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h2 className="text-xl font-medium mb-2">
									Personal Information
								</h2>
								<p>
									<span className="font-medium">Name:</span>{" "}
									{profile.first_name} {profile.last_name}
								</p>
								<p>
									<span className="font-medium">
										Date of Birth:
									</span>{" "}
									{profile.date_of_birth
										? new Date(profile.date_of_birth)
												.toISOString()
												.split("T")[0]
										: ""}
								</p>
								<p>
									<span className="font-medium">
										Country:
									</span>{" "}
									{profile.country}
								</p>
								<p>
									<span className="font-medium">
										Username:
									</span>{" "}
									{user.username}
								</p>
								<p>
									<span className="font-medium">Email:</span>{" "}
									{user.email}
								</p>
								<p>
									<span className="font-medium">
										Member Since:
									</span>{" "}
									{new Date(
										user.created_at
									).toLocaleDateString()}
								</p>
							</div>
							<div>
								<h2 className="text-xl font-medium mb-2">
									Contact Information
								</h2>
								<p>
									<span className="font-medium">Phone:</span>{" "}
									{profile.phone_number}
								</p>
								<p>
									<span className="font-medium">
										Address:
									</span>{" "}
									{profile.address}
								</p>
							</div>
							<div className="md:col-span-2">
								<h2 className="text-xl font-medium mb-2">
									Bio
								</h2>
								<p className="bg-gray-700 p-4 rounded-md">
									{profile.bio}
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
