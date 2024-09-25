import UserProfileRepository from "../Infrastructure/UserProfileRepository";

const getUserById = async (id: string) => {
    return await UserProfileRepository.findProfileById(parseInt(id));
}

const getUserAddressById = async (id : string) => {
    return await UserProfileRepository.findProfileById(parseInt(id));
}

const updateUserName = async (id: string, name: string, lastname: string) => {
    return await UserProfileRepository.updateUserName(parseInt(id), name, lastname);
}

const updateUserAddress = async (id: string, address: string) => {
    return await UserProfileRepository.updateUserAddress(parseInt(id), address);
}

const updateUserPhone = async (id: string, phone: string) => {
    return await UserProfileRepository.updateUserPhone(parseInt(id), phone);
}

const updateAllUserProfile = async (id: string, first_name:string, last_name:string, phone_number:number, address: string, bio:string, date_of_birth:Date) => {
    return await UserProfileRepository.updateAllUserProfile(parseInt(id), first_name, last_name, phone_number, address, bio, date_of_birth);
}

//service for User
const createUserProfile = async (user_id: number) => {
    return await UserProfileRepository.createUserProfile(user_id);
}

const deleteUserProfile = async (id: string) => {
    return await UserProfileRepository.deleteUserProfile(parseInt(id));
}
    

export default {
    getUserById,
    getUserAddressById,
    updateUserName,
    updateUserAddress,
    updateUserPhone,
    createUserProfile,
    deleteUserProfile,
    updateAllUserProfile
}

