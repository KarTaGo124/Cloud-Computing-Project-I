import userProfileRepository from '../Infrastructure/UserRepository';

const getAllProfiles = async () => {
  return await userProfileRepository.findAllProfiles();
};

const createProfile = async (user_id: number, first_name: string, last_name: string, phone_number: string) => {
  return await userProfileRepository.createProfile(user_id, first_name, last_name, phone_number);
};

const getProfilesLimit = async (limit: number) => {
  return await userProfileRepository.findProfilesLimit(limit);
}

const getProfileById = async (id: number) => {
  return await userProfileRepository.findProfileById(id);
}


export default {
  getAllProfiles,
  createProfile,
  getProfilesLimit,
  getProfileById
};
