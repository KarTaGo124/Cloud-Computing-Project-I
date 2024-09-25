import pool from "../../config/db";
import UserDTO from "../Dtos/UserDTO";
import LoginResDto from "../Dtos/LoginResponseDTO";

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result;
};

const findByEmail = async (email: string): Promise<LoginResDto | null> => {
  const [rows] = await pool.query(
    "SELECT email, password FROM users WHERE email = ?",
    [email]
  );
  const users = rows as LoginResDto[];
  return users.length ? users[0] : null;
};

const findById = async (id: string): Promise<UserDTO | null> => {
  const [rows] = await pool.query(
    "SELECT email, username, created_at FROM users WHERE id = ?",
    [id]
  );
  const users = rows as UserDTO[];
  return users.length ? users[0] : null;
};

const updateUsername = async (id: string, username: string) => {
  const [result] = await pool.query(
    "UPDATE users SET username = ? WHERE id = ?",
    [username, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};

export default {
  createUser,
  findByEmail,
  findById,
  updateUsername,
  deleteUser,
};
