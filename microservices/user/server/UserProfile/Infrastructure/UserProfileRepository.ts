import pool from "../../config/db";
import UserProfileResDTO from "../Dtos/UserProfileResDTO";

const findProfileById = async (
	id: number
): Promise<UserProfileResDTO | null> => {
	const [result]: any = await pool.query(
		"SELECT id, first_name, last_name, phone_number, address, bio, date_of_birth, country FROM userProfile WHERE user_id = ?",
		[id]
	);
	if (result.length === 0) {
		return null;
	}
	return result[0];
};
const updateUserName = async (id: number, name: string, lastname: string) => {
	await pool.query(
		"UPDATE userProfile SET first_name = ?, last_name = ? WHERE user_id = ?",
		[name, lastname, id]
	);
};

const updateUserAddress = async (id: number, address: string) => {
	await pool.query("UPDATE userProfile SET address = ? WHERE user_id = ?", [
		address,
		id,
	]);
};

const updateUserPhone = async (id: number, phone: string) => {
	await pool.query(
		"UPDATE userProfile SET phone_number = ? WHERE user_id = ?",
		[phone, id]
	);
};

const updateAllUserProfile = async (
	id: number,
	first_name: string,
	last_name: string,
	phone_number: number,
	address: string,
	bio: string,
	date_of_birth: Date,
	country: string
) => {
	await pool.query(
		"UPDATE userProfile SET first_name = ?, last_name = ?, phone_number = ?, address = ?, bio = ?, date_of_birth = ?, country = ? WHERE user_id = ?",
		[
			first_name,
			last_name,
			phone_number,
			address,
			bio,
			date_of_birth,
			country,
			id,
		]
	);
};

//service for User
const createUserProfile = async (user_id: number): Promise<void> => {
	await pool.query("INSERT INTO userProfile (user_id) VALUES (?)", [user_id]);
};

const deleteUserProfile = async (id: number): Promise<void> => {
	await pool.query("DELETE FROM userProfile WHERE user_id = ?", [id]);
};

export default {
	findProfileById,
	updateUserName,
	updateUserAddress,
	updateUserPhone,
	createUserProfile,
	deleteUserProfile,
	updateAllUserProfile,
};
