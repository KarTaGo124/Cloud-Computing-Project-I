import UserProfileRepository from "../Infrastructure/UserProfileRepository";

const getProfileById = async (id: string) => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}
	const userProfile = await UserProfileRepository.findProfileById(userId);
	if (!userProfile) {
		throw new Error("User profile not found");
	}
	return userProfile;
};

const getUserAddressById = async (id: string) => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}
	const userProfile = await UserProfileRepository.findProfileById(userId);
	if (!userProfile) {
		throw new Error("User profile not found");
	}
	return userProfile.address;
};

const updateUserName = async (
	id: string,
	name: string,
	lastname: string
): Promise<void> => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}
	if (!name || !lastname) {
		throw new Error("Name and lastname are required");
	}
	await UserProfileRepository.updateUserName(userId, name, lastname);
};

const updateUserAddress = async (
	id: string,
	address: string
): Promise<void> => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}
	if (!address) {
		throw new Error("Address is required");
	}
	await UserProfileRepository.updateUserAddress(userId, address);
};

const updateUserPhone = async (id: string, phone: string): Promise<void> => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}
	if (!phone) {
		throw new Error("Phone number is required");
	}
	await UserProfileRepository.updateUserPhone(userId, phone);
};

const updateAllUserProfile = async (
	id: string,
	first_name?: string,
	last_name?: string,
	phone_number?: string,
	address?: string,
	bio?: string,
	date_of_birth?: Date,
	country?: string
): Promise<void> => {
	const userId = parseInt(id);
	if (isNaN(userId)) {
		throw new Error("Invalid user ID");
	}

	const existingProfile = await UserProfileRepository.findProfileById(userId);
	if (!existingProfile) {
		throw new Error("User profile not found");
	}

	const updatedProfile = {
		first_name: first_name || existingProfile.first_name,
		last_name: last_name || existingProfile.last_name,
		phone_number: phone_number || existingProfile.phone_number,
		address: address || existingProfile.address,
		bio: bio || existingProfile.bio,
		date_of_birth: date_of_birth || existingProfile.date_of_birth,
		country: country || existingProfile.country,
	};

	await UserProfileRepository.updateAllUserProfile(
		userId,
		updatedProfile.first_name,
		updatedProfile.last_name,
		updatedProfile.phone_number,
		updatedProfile.address,
		updatedProfile.bio,
		updatedProfile.date_of_birth,
		updatedProfile.country
	);
};

const createUserProfile = async (user_id: number) => {
	return await UserProfileRepository.createUserProfile(user_id);
};

const deleteUserProfile = async (id: string) => {
	return await UserProfileRepository.deleteUserProfile(parseInt(id));
};

export default {
	getProfileById,
	getUserAddressById,
	updateUserName,
	updateUserAddress,
	updateUserPhone,
	createUserProfile,
	deleteUserProfile,
	updateAllUserProfile,
};
