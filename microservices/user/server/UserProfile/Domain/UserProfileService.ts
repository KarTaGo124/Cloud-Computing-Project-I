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
}

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
}

const updateUserName = async (id: string, name: string, lastname: string): Promise<void> => {
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }
    if (!name || !lastname) {
        throw new Error("Name and lastname are required");
    }
    const res = await UserProfileRepository.updateUserName(userId, name, lastname);

    if(!res) {
        throw new Error("Error updating username");
    }
}

const updateUserAddress = async (id: string, address: string): Promise<void> => {
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }
    if (!address) {
        throw new Error("Address is required");
    }
    const res = await UserProfileRepository.updateUserAddress(userId, address);

    if (!res) {
        throw new Error("Error updating address");
    }
}

const updateUserPhone = async (id: string, phone: string): Promise<void> => {
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }
    if (!phone) {
        throw new Error("Phone number is required");
    }

    const res = await UserProfileRepository.updateUserPhone(userId, phone);

    if (!res) {
        throw new Error("Error updating phone number");
    }
}

const updateAllUserProfile = async (id: string, first_name: string, last_name: string, phone_number: number, address: string, bio: string, date_of_birth: Date): Promise<void> => {
    const userId = parseInt(id);
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }
    if (!first_name || !last_name || !address || !bio || !date_of_birth) {
        throw new Error("All fields are required");
    }
    if (isNaN(phone_number)) {
        throw new Error("Invalid phone number");
    }
    const res = await UserProfileRepository.updateAllUserProfile(userId, first_name, last_name, phone_number, address, bio, date_of_birth);

    if (!res) {
        throw new Error("Error updating user profile");
    }
}

//service for User
const createUserProfile = async (user_id: number) => {
    return await UserProfileRepository.createUserProfile(user_id);
}

const deleteUserProfile = async (id: string) => {
    return await UserProfileRepository.deleteUserProfile(parseInt(id));
}
    

export default {
    getProfileById,
    getUserAddressById,
    updateUserName,
    updateUserAddress,
    updateUserPhone,
    createUserProfile,
    deleteUserProfile,
    updateAllUserProfile
}

