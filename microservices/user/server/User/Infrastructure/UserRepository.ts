import pool from "../../config/db";
import UserDTO from "../Dtos/UserDTO";
import LoginResDto from "../Dtos/LoginResponseDTO";

const createUser = async (
	username: string,
	email: string,
	password: string
): Promise<UserDTO> => {
	const [result] = await pool.query(
		"INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
		[username, email, password]
	);

	const insertId = (result as any).insertId;

	const [rows] = await pool.query(
		"SELECT id, email, username, created_at FROM user WHERE id = ?",
		[insertId]
	);

	const users = rows as UserDTO[];
	return users[0];
};

const findByEmail = async (email: string): Promise<LoginResDto | null> => {
	const [rows] = await pool.query(
		"SELECT id, email, password FROM user WHERE email = ?",
		[email]
	);
	const users = rows as LoginResDto[];
	return users.length ? users[0] : null;
};

const findById = async (id: string): Promise<UserDTO | null> => {
	const [rows] = await pool.query(
		"SELECT id, email, username, created_at FROM user WHERE id = ?",
		[id]
	);
	const users = rows as UserDTO[];
	return users.length ? users[0] : null;
};

const updateUsername = async (id: string, username: string): Promise<void> => {
	await pool.query("UPDATE user SET username = ? WHERE id = ?", [
		username,
		id,
	]);
};

const deleteUser = async (id: string): Promise<void> => {
	await pool.query("DELETE FROM user WHERE id = ?", [id]);
};

export default {
	createUser,
	findByEmail,
	findById,
	updateUsername,
	deleteUser,
};
