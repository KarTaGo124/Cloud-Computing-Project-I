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
  first_name: string,
  last_name: string,
  phone_number: number,
  address: string,
  bio: string,
  date_of_birth: Date,
  country: string
): Promise<void> => {
  const userId = parseInt(id);
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }
  if (
    !first_name ||
    !last_name ||
    !address ||
    !bio ||
    !date_of_birth ||
    !country
  ) {
    throw new Error("All fields are required");
  }
  if (isNaN(phone_number)) {
    throw new Error("Invalid phone number");
  }
  await UserProfileRepository.updateAllUserProfile(
    userId,
    first_name,
    last_name,
    phone_number,
    address,
    bio,
    date_of_birth,
    country
  );
};

//service for User
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
