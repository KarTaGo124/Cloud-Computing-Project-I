import userRepository from "../Infrastructure/UserRepository";
import LoginResDto from "../Dtos/LoginResponseDTO";


const createUser = async (
  username: string,
  email: string,
  password: string
) => {
 const user = await userRepository.findByEmail(email);
  if (user) {
    throw new Error("Email already exists"); 
  }
  const createdUser = await userRepository.createUser(username, email, password);

  return createdUser;
};

const login = async (email: string, password: string) => {
  const user: LoginResDto | null = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Email does not exist");
  }

  if (user.password !== password) {
    throw new Error("Password is incorrect");
  }

  return user;
};

const getUserWithId = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUsername = async (id: string, username: string) => {
  return await userRepository.updateUsername(id, username);
};

const deleteUser = async (id: string) => {
  console.log("deleteUser", id);
  const user = await userRepository.deleteUser(id);
  console.log("deleteUser", user);
};

export default {
  createUser,
  login,
  getUserWithId,
  updateUsername,
  deleteUser,
};
