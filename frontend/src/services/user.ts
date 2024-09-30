import axios from "axios";
import { User, UserProfile, UserProfileUpdateDto } from "../interfaces/user";

const baseUrl = "http://localhost:8081";

export const login = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${baseUrl}/users/login`, {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
};

export const register = async (
	username: string,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${baseUrl}/users/register`, {
			username,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error registering:", error);
		throw error;
	}
};

export const getUserById = async (id: number): Promise<User> => {
	try {
		const response = await axios.get(`${baseUrl}/users/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching user with id ${id}:`, error);
		throw error;
	}
};

export const getUserProfileById = async (id: number): Promise<UserProfile> => {
	try {
		const response = await axios.get(`${baseUrl}/profile/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching user profile with id ${id}:`, error);
		throw error;
	}
};

export const updateUserProfile = async (
	id: number,
	updateData: UserProfileUpdateDto
): Promise<void> => {
	try {
		const response = await axios.patch(
			`${baseUrl}/profile/${id}`,
			updateData
		);
		return response.data;
	} catch (error) {
		console.error(`Error updating user profile with id ${id}:`, error);
		throw error;
	}
};

export const deleteUser = async (id: number): Promise<void> => {
	try {
		const response = await axios.delete(`${baseUrl}/users/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting user with id ${id}:`, error);
		throw error;
	}
};