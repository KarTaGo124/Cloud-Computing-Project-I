import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { getUserProfileById, updateUserProfile } from "../services/user";
import { UserProfileUpdateDto } from "../interfaces/user";

export default function EditProfilePage() {
	const [profile, setProfile] = useState<UserProfileUpdateDto | null>(null);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchProfileData = async () => {
			if (id) {
				try {
					const userProfile = await getUserProfileById(parseInt(id));

					setProfile({
						first_name: userProfile.first_name,
						last_name: userProfile.last_name,
						phone_number: userProfile.phone_number,
						address: userProfile.address,
						bio: userProfile.bio,
						date_of_birth: userProfile.date_of_birth,
						country: userProfile.country,
					});
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};
		fetchProfileData();
	}, [id]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (profile && id) {
			try {
				await updateUserProfile(parseInt(id), profile);
				console.log("Updated profile:", profile);
				navigate(`/profile/${id}`);
			} catch (error) {
				console.error("Error updating profile:", error);
			}
		}
	};

	if (!profile) {
		return (
			<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
					<h1 className="text-3xl font-medium mb-6">Edit Profile</h1>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm font-medium mb-1"
								>
									First Name
								</label>
								<input
									type="text"
									id="first_name"
									name="first_name"
									value={profile.first_name}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="last_name"
									className="block text-sm font-medium mb-1"
								>
									Last Name
								</label>
								<input
									type="text"
									id="last_name"
									name="last_name"
									value={profile.last_name}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="phone_number"
									className="block text-sm font-medium mb-1"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="phone_number"
									name="phone_number"
									value={profile.phone_number}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="date_of_birth"
									className="block text-sm font-medium mb-1"
								>
									Date of Birth
								</label>
								<input
									type="date"
									id="date_of_birth"
									name="date_of_birth"
									value={profile.date_of_birth}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="md:col-span-2">
								<label
									htmlFor="address"
									className="block text-sm font-medium mb-1"
								>
									Address
								</label>
								<input
									type="text"
									id="address"
									name="address"
									value={profile.address}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="country"
									className="block text-sm font-medium mb-1"
								>
									Country
								</label>
								<input
									type="text"
									id="country"
									name="country"
									value={profile.country}
									onChange={handleInputChange}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="md:col-span-2">
								<label
									htmlFor="bio"
									className="block text-sm font-medium mb-1"
								>
									Bio
								</label>
								<textarea
									id="bio"
									name="bio"
									value={profile.bio}
									onChange={handleInputChange}
									rows={4}
									className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								></textarea>
							</div>
						</div>
						<div className="flex justify-end space-x-4">
							<button
								type="button"
								onClick={() => navigate(`/profile/${id}`)}
								className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}
